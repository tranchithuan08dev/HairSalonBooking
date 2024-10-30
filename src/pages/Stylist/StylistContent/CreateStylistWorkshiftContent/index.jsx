import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../../../assets/css/stylist/workshift.css";
import {
  createStylistWorkshift,
  fetchAllWorkshift,
} from "../../../../store/stylistSlice/WorkShiftSlice";

function Content() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.AUTH);
  const { data, loading, duplicated } = useSelector(
    (state) => state.STYLIST.workshift
  );
  const stylistID = currentUser.actorByRole.stylistID;
  const [showModal, setShowModal] = useState(false);

  const [duplicateWorkshiftIDs, setDuplicateWorkshiftIDs] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      await dispatch(fetchAllWorkshift(stylistID));
    };
    fetch();
  }, [dispatch, stylistID]);

  useEffect(() => {
    setDuplicateWorkshiftIDs(duplicated);
  }, [data]);

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

  const [bookedShifts, setBookedShifts] = useState([]);

  const formatTime = (time) => time.substring(0, 5);

  const getWorkshiftData = (day, slot) => {
    if (!data.data?.workshifts) return null;
    const [startTime] = slot.split(" - ");

    const shift = data.data.workshifts.find((shift) => {
      const formattedStartTime = formatTime(shift.startTime);
      const isMatchingShiftDay = shift.shiftDay === day;
      const isMatchingStartTime = formattedStartTime === startTime;
      const isNotDeleted = !shift.deleted;

      return isMatchingShiftDay && isMatchingStartTime && isNotDeleted;
    });

    return shift;
  };

  const confirmUpdate = async () => {
    setShowModal(false);
    const bookedWorkShiftIDs = bookedShifts.map((shift) => shift.workShiftID);
    console.log("Booked Workshifts IDs:", bookedWorkShiftIDs);
    let dataToCreate = {
      stylistID: stylistID,
      workShiftID: bookedWorkShiftIDs,
    };
    console.log(dataToCreate);
    const result = await dispatch(createStylistWorkshift(dataToCreate));
    if (result.payload) {
      await dispatch(fetchAllWorkshift(stylistID));
    }
  };

  const cancelUpdate = () => {
    console.log("Cancelled");
    setShowModal(false);
  };

  const handleClick = (shift) => {
    if (shift) {
      const isAlreadyBooked = bookedShifts.some(
        (s) => s.workShiftID === shift.workShiftID
      );

      if (isAlreadyBooked) {
        setBookedShifts((prev) =>
          prev.filter((s) => s.workShiftID !== shift.workShiftID)
        );
      } else {
        setBookedShifts((prev) => [...prev, shift]);
      }
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

    const disableCount = currentDay === 0 ? 7 : currentDay; 
    return days.slice(0, disableCount);
  };

  const currentDay = getCurrentDay();
  const disabledDays = disableSlots(currentDay);

  const handleChoose = () => {
    if (bookedShifts.length > 0) {
      setShowModal(true);
    } else {
      alert("Please choose at least 1 slot first!");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
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
                      shift &&
                      duplicateWorkshiftIDs.includes(shift.workShiftID);
                    const isDisabledSlotChoose = disabledDays.includes(day);


                    return (
                      <td
                        key={colIndex}
                        onClick={() => !isDisabled && handleClick(shift)}
                        className={`slotCell-choose ${
                          isBooked ? "booked" : ""
                        } ${isDisabled ? "disabled" : `${isDisabledSlotChoose ? "disabled-slot" : ""}`}`}
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
        <div className="container">
  <div className="row">
    <div className="col-md-6 d-flex align-items-start" style={{ marginTop: "20px" }}>
      <button onClick={handleChoose} className="btn btn-primary">
        Choose
      </button>
    </div>

    <div className="slot-legend col-md-6" style={{ marginTop: "20px" }}>
      <h4 style={{marginLeft: "30px"}}>Sign</h4>
      <table className="slot-legend-table">
        <tbody className="table-sign-body">
          <tr className="sign-1">
            <td className="booked-slot sign"></td>
            <td className="contentSpan">Choosing slot</td>
            <td className="disabled sign"></td>
            <td className="contentSpan">Registered slot</td>
          </tr>
          <tr>
            <td className="disabled-slot sign"></td>
            <td className="contentSpan">Slot is disabled</td>
            <td className="notInSchedule-slot sign"></td>
            <td className="contentSpan">Out of Schedule</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

        <div
          className={`modal fade ${showModal ? "show" : ""}`}
          style={{ display: showModal ? "block" : "none" }}
          tabIndex="-1"
          role="dialog"
          aria-hidden={!showModal}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Update</h5>
                <button type="button" className="close" onClick={cancelUpdate}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Do you really want to choose these workshift?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={cancelUpdate}
                >
                  Cancelled
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
      </div>
    </>
  );
}

export default Content;
