import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAll,
  deleteWorkshift,
  setShowAlert,
} from "../../../../store/staffSlice/removeWorkshift";
import "../../../../assets/css/staff/removeWorkshift.css";

function Content() {
  const dispatch = useDispatch();
  const { data, showAlert, message, error } = useSelector(
    (state) => state.STAFF.removeWorkshift
  );

  const [stylistID, setStylistID] = useState("");
  const [workShifts, setWorkShifts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOptionData, setSelectedOptionData] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState([]);

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
        const groupedWorkShifts = data.reduce((acc, item) => {
            if (item.workShiftDeleted === false && item.stylistDeleted === false) {
                const timeRange = `${item.startTime} - ${item.endTime}`;
                if (acc[item.shiftDay]) {
                    acc[item.shiftDay].push(timeRange);
                } else {
                    acc[item.shiftDay] = [timeRange];
                }
            }
            return acc; // Đảm bảo luôn trả về acc
        }, {});

        const arrayWorkshift = Object.entries(groupedWorkShifts).map(
            ([day, times]) => ({ day, times })
        );

        setWorkShifts(arrayWorkshift);
    }
}, [data]);

  useEffect(() => {
    setWorkShifts([]);
  }, [!stylistID])

  const handleLoadData = async () => {
    await dispatch(getAll(stylistID));
  };

  const handleUpdate = () => {
    setShowModal(true);
  };

  const confirmUpdate = async () => {
    console.log(selectedTimes);
    const dataToUpdate = {
      stylistID: stylistID,
      workShiftID: selectedTimes
    }
    console.log(dataToUpdate);
    const result = await dispatch(deleteWorkshift(dataToUpdate));
    if(result.payload.ok){
      await dispatch(getAll(stylistID));
    }
    setShowModal(false);
  };

  const cancelUpdate = () => {
    console.log("Cancelled");
    setShowModal(false);
  };

  const handleOptionToggle = (stylistWorkShiftID) => {
    const newSelectedTimes = [...selectedTimes];
    const foundIndex = newSelectedTimes.indexOf(stylistWorkShiftID);

    console.log("selected", newSelectedTimes);

    if (foundIndex > -1) {
      newSelectedTimes.splice(foundIndex, 1);
    } else {
      newSelectedTimes.push(stylistWorkShiftID);
    }

    setSelectedTimes(newSelectedTimes);
    const selectedShifts = newSelectedTimes
      .map((selectedID) => {
        const foundShift = data.find(
          (item) => item.stylistWorkShiftID === selectedID
        );
        return foundShift
          ? {
              time: foundShift.startTime + " - " + foundShift.endTime,
              day: foundShift.shiftDay,
              stylistWorkShiftID: foundShift.stylistWorkShiftID,
              stylistID: stylistID,
              workShiftID: foundShift.workShiftID,
            }
          : null;
      })
      .filter((item) => item !== null);
    setSelectedOptionData(selectedShifts);
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        dispatch(setShowAlert());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert, dispatch]);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Remove Stylist Workshift</h2>
      {showAlert && (
        <div
          className={`alert ${message ? "alert-success" : "alert-danger"} mt-3`}
          role="alert"
        >
          {message || error}
        </div>
      )}
      <form>
        <div className="mb-3">
          <label htmlFor="stylistID" className="form-label">
            Stylist ID
          </label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="stylistID"
              value={stylistID}
              onChange={(e) => setStylistID(e.target.value)}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={handleLoadData}
              disabled={!stylistID}
            >
              Load Data
            </button>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="workShifts" className="form-label">
            Work Shifts
          </label>
          <div
            className="workshift-list"
            style={{ height: "350px", overflowY: "auto" }}
          >
            {workShifts.map((shift, index) => (
              <div key={index} className="shift-day">
                <strong>{shift.day}</strong> <br />
                {shift.times.map((time, idx) => {
                  const foundShift = data.find(
                    (item) =>
                      item.startTime === time.split(" - ")[0] &&
                      item.shiftDay === shift.day
                  );
                  const workShiftID = foundShift
                    ? foundShift.workShiftID
                    : null;
                  const isSelected = selectedTimes.includes(workShiftID);
                  return (
                    <span
                      key={idx}
                      className={`workshift-option ${
                        isSelected ? "selected" : ""
                      }`}
                      onClick={() =>
                        workShiftID &&
                        handleOptionToggle(workShiftID)
                      }
                    >
                      {time}
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleUpdate}
        >
          Delete
        </button>
      </form>
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
              <h5 className="modal-title">Confirm Delete</h5>
              <button type="button" className="close" onClick={cancelUpdate}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Do you really want to delete this stylist workshift?</p>
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
  );
}

export default Content;