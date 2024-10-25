import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAll,
  updateStatus,
  setShowAlert,
} from "../../../../store/staffSlice/removeWorkshift";

function Content() {
  const dispatch = useDispatch();
  const { data, showAlert, message, error } = useSelector(
    (state) => state.STAFF.removeWorkshift
  );

  const [stylistID, setStylistID] = useState("");
  const [workShifts, setWorkShifts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOptionData, setSelectedOptionData] = useState(null);

  const handleLoadData = async () => {
    await dispatch(getAll(stylistID));

    if (Array.isArray(data) && data.length > 0) {
      const groupedWorkShifts = data.reduce((acc, item) => {
          const timeRange = `${item.startTime} - ${item.endTime}`;
          if (acc[item.shiftDay]) {
            acc[item.shiftDay].push(timeRange);
          } else {
            acc[item.shiftDay] = [timeRange];
          }
        return acc;
      }, {});

      const arrayWorkshift = Object.entries(groupedWorkShifts).map(
        ([day, times]) => ({ day, times })
      );

      setWorkShifts(arrayWorkshift);
    } else {
      console.log("error");
    }
  };

  const handleUpdate = () => {
    setShowModal(true);
  };
  const confirmUpdate = async () => {
    setShowModal(false);
    console.log(selectedOptionData);
    await dispatch(updateStatus(selectedOptionData));
  };

  const cancelUpdate = () => {
    console.log("Cancelled");
    setShowModal(false);
  };

  const handleOptionChange = (event) => {
    const selectedOption = event.target.value; 

    const selectedShift = workShifts
      .flatMap((shift) => {
        return shift.times.map((time) => {
          const index = shift.times.indexOf(time);
          if (time === selectedOption) {
            return {
              time,
              day: shift.day,
              stylistWorkShiftID: data[index]?.stylistWorkShiftID,
              stylistID: stylistID,
              workShiftID: data[index]?.workShiftID,
            };
          }
          return null; 
        });
      })
      .find((item) => item !== null); 

    console.log(selectedShift); 
    if (selectedShift) {
      const dataToUpdate = {
        stylistWorkShiftID: selectedShift.stylistWorkShiftID,
        stylistID: selectedShift.stylistID,
        workShiftID: selectedShift.workShiftID,
        deleted: true,
      };
      setSelectedOptionData(dataToUpdate);
    } else {
      console.log("No matching shift found for:", selectedOption);
    }
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
            {!stylistID ? (
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleLoadData}
                disabled
              >
                Load Data
              </button>
            ) : (
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleLoadData}
              >
                Load Data
              </button>
            )}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="workShifts" className="form-label">
            Work Shifts
          </label>
          <select
            id="workShifts"
            className="form-select"
            size="5"
            onChange={handleOptionChange}
          >
            {workShifts.map((shift, index) => (
              <optgroup key={index} label={shift.day}>
                {shift.times.map((time, idx) => (
                  <option
                    key={idx}
                    value={time}
                    data-stylist-work-shift-id={data[idx]?.stylistWorkShiftID}
                    data-stylist-id={stylistID}
                    data-work-shift-id={data[idx]?.workShiftID}
                  >
                    {time}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
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
