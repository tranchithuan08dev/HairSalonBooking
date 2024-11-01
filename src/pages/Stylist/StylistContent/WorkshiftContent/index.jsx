import { useEffect, useState } from "react";
import "../../../../assets/css/stylist/workshift.css";
import { useDispatch, useSelector } from "react-redux";
import { getAll, setError, setShowAlert } from "../../../../store/stylistSlice/WorkShiftSlice";
import { useNavigate } from "react-router-dom";

function Content() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.AUTH);
  const { data, loading, showAlert } = useSelector((state) => state.STYLIST?.workshift);
  const stylistID = currentUser.actorByRole.stylistID;

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAll(stylistID)).unwrap();
      } catch (e) {
        console.error("Error fetching data:", e);
      }
    };
    fetchData();
  }, [stylistID, dispatch]);

  const handleClick = (shift) => {
    if (shift) {
      console.log("Shift data:", shift);
      console.log("Booking ID:", shift.bookingID);

      if (shift.bookingID && shift.bookingID.trim() !== "") {
        navigate(`bookingDetail?id=${shift.bookingID}`);
      } else {
        dispatch(setError("This slot haven't booked yet"));
        dispatch(setShowAlert(true));
      }
    } else {
      console.error("Shift is undefined or null");
    }
  };

  const timeSlots = [
    "08:00 - 09:00",
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 13:00",
    "13:00 - 14:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00",
    "17:00 - 18:00",
    "18:00 - 19:00",
  ];

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes}`;
  };

  const getWorkshiftData = (day, slot) => {
    const startTime = slot.split(" - ")[0]; 
    if (Array.isArray(data)) {
      const foundShift = data.find(
        (shift) =>
          shift.shiftDay === day &&
          formatTime(shift.startTime) === startTime &&
          !shift.deleted
      );
      return foundShift;
    }
  };

  const getCurrentDay = () => {
    const today = new Date();
    return today.getDay();
  };

  const disableSlots = (currentDay) => {
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    const disableCount = currentDay === 0 ? 6 : currentDay - 1; 
    return days.slice(0, disableCount);
  };

  const currentDay = getCurrentDay();
  const disabledDays = disableSlots(currentDay);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
        setError(null)
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
    {showAlert && (
        <div
          className={`alert ${error} "alert-danger"} mt-3`}
          role="alert"
        >
          {error}
        </div>
      )}
      <h2 className="header-cus">WorkShift</h2>
      <div className="container customContainer">
        <div className="calendar-view">
          <table className="table table-bordered customTable">
            <thead>
              <tr className="calendar-month-row dayWeek">
                <td className="calendar-prior-months-date dayWeek-date-not">
                  Time
                </td>
                {daysOfWeek.map((day, index) => (
                  <td
                    key={index}
                    className="calendar-prior-months-date dayWeek-date"
                  >
                    {day}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((slot, rowIndex) => (
                <tr key={rowIndex} className="calendar-month-row slotDetail">
                  <td className="slotTime">{slot}</td>
                  {daysOfWeek.map((day, colIndex) => {
                    const shift = getWorkshiftData(day, slot);
                    const isDisabled = disabledDays.includes(day);

                    return (
                      <td
                        onClick={() => !isDisabled && handleClick(shift)}
                        key={colIndex}
                        className={`slotCell ${
                          isDisabled ? "disabled-slot" : ""
                        } ${
                          shift
                            ? shift?.bookingID
                              ? "booked"
                              : "schedule-slot"
                            : ""
                        }`}
                      >
                        {shift ? (
                          <div className="detail">see detail →</div>
                        ) : null}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <h4 style={{ marginLeft: "30px" }}>Sign</h4>
      <table className="slot-legend-table" style={{ marginLeft: "30px" }}>
        <tbody className="table-sign-body">
          <tr className="sign-1">
            <td className="booked-slot sign"></td>
            <td className="contentSpan">Slot has a booking</td>
            <td className="schedule-slot sign"></td>
            <td className="contentSpan">Slot not booked yet</td>
          </tr>
          <tr>
            <td className="notInSchedule-slot sign"></td>
            <td className="contentSpan">Out of schedule</td>
            <td className="disabled-slot sign"></td>
            <td className="contentSpan">Slot is disabled</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default Content;
