import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../../../assets/css/stylist/workshift.css";
import {
  createStylistWorkshift,
  fetchAllWorkshift,
  setError,
  setShowAlert,
} from "../../../../store/stylistSlice/WorkShiftSlice";

function Content() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.AUTH);
  const { data, loading, duplicated, error, showAlert } = useSelector(
    (state) => state.STYLIST.workshift
  );
  console.log("data work shift", data);

  const stylistID = currentUser?.actorByRole?.stylistID;
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState(false);
  const [bookedShifts, setBookedShifts] = useState([]);

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

  const formatTime = (time) => time.substring(0, 5);

  const getWorkshiftData = (day, slot) => {
    if (!data.data?.workshifts) return null;
    const [startTime] = slot.split(" - ");

    return data.data.workshifts.find((shift) => {
      const isMatchingShiftDay = shift.shiftDay === day;
      const isMatchingStartTime = formatTime(shift.startTime) === startTime;
      console.log("isMatchingShiftDay", isMatchingShiftDay);
      console.log("isMatchingStartTime", isMatchingStartTime);

      return (
        isMatchingShiftDay &&
        isMatchingStartTime &&
        !shift.StylistWorkShiftDeleted
      );
    });
  };

  const confirmUpdate = async () => {
    const bookedWorkShiftIDs = bookedShifts.map((shift) => shift.workShiftID);
    const result = await dispatch(
      createStylistWorkshift({
        stylistID,
        workShiftID: bookedWorkShiftIDs,
      })
    );
    console.log(bookedWorkShiftIDs);
    dispatch(setShowAlert(true));
    if (result.payload.ok) {
      await dispatch(fetchAllWorkshift(stylistID));
      setMessage("Chose workshift successfully!");
    } else {
      dispatch(setError("Failed to choose workshift!"));
    }
    setModal(false);
    setBookedShifts([]);
  };

  const handleClick = (shift) => {
    if (!shift) return;
    setBookedShifts((prev) =>
      prev.some((s) => s.workShiftID === shift.workShiftID)
        ? prev.filter((s) => s.workShiftID !== shift.workShiftID)
        : [...prev, shift]
    );
  };

  const handleChoose = () => {
    console.log(bookedShifts);
    if (bookedShifts.length > 0) {
      setModal(true);
    }
  };

  useEffect(() => {
    dispatch(fetchAllWorkshift(stylistID));
  }, [dispatch, stylistID]);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => dispatch(setShowAlert(false)), 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const disabledDays = (() => {
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    return days.slice(0, new Date().getDay() || 7);
  })();

  if (loading) return <p>Loading...</p>;

  return (
    <>
      {showAlert && (
        <div
          className={`alert ${message ? "alert-success" : "alert-danger"} mt-3`}
          role="alert"
        >
          {message || error}
        </div>
      )}
      <h2 className="header-cus">Create Workshift</h2>
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
                    const isBooked = bookedShifts.some(
                      (s) => s.workShiftID === shift?.workShiftID
                    );
                    const isDisabled =
                      shift && duplicated.includes(shift.workShiftID);
                    const isDisabledSlotChoose = disabledDays.includes(day);

                    return (
                      <td
                        key={colIndex}
                        onClick={() => !isDisabled && handleClick(shift)}
                        className={`slotCell-choose ${isBooked ? "booked" : ""}
                         ${
                           isDisabled
                             ? "disabled"
                             : `${isDisabledSlotChoose ? "disabled-slot" : ""}`
                         }`}
                        style={{
                          cursor: isDisabled ? "not-allowed" : "pointer",
                        }}
                      >
                        {isDisabled && (
                          <span className="disabled-overlay"></span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={handleChoose} className="btn btn-primary mt-3">
          Choose
        </button>
      </div>

      {modal && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Update</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setModal(true)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Do you really want to choose these workshifts?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={confirmUpdate}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <h4 style={{ marginLeft: "600px" }}>Sign</h4>
      <table className="slot-legend-table" style={{ marginLeft: "600px" }}>
        <tbody className="table-sign-body">
          <tr className="sign-1">
            <td className="booked-slot sign"></td>
            <td className="contentSpan">Currently selected slot</td>
            <td className="notInSchedule-slot sign"></td>
            <td className="contentSpan">Out of schedule</td>
          </tr>
          <tr>
            <td className="disabled-slot sign"></td>
            <td className="contentSpan">Slot is disabled</td>
            <td className="disabled sign"></td>
            <td className="contentSpan">Slot registered</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default Content;
