import "../../../../assets/css/stylist/bookingDetail.css";
import { useEffect, useState } from "react";
import {
  fetchBookingDetail,
  updateStatus,
  setShowAlert,
} from "../../../../store/stylistSlice/BookingDetailSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
function Content() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.AUTH);
  const stylistID = currentUser?.actorByRole.stylistID;

  const { data, loading, error, showAlert, message } = useSelector(
    (state) => state.STYLIST.bookingDetail
  );

  const formatSalary = (salary) => {
    if(salary === null) return "";
    const salaryString = salary.toString();
    let formattedSalary = '';
    const length = salaryString.length;
    for (let i = 0; i < length; i++) {
      formattedSalary = salaryString[length - 1 - i] + formattedSalary;
      if ((i + 1) % 3 === 0 && (i + 1) < length) {
        formattedSalary = ',' + formattedSalary;
      }
    }
    return formattedSalary;
  };

  const fetch = async () => {
    await dispatch(fetchBookingDetail(id));
  };

  useEffect(() => {
    fetch();
    changeDate();
  }, [dispatch, stylistID, updateStatus]);

  const handleUpdate = () => {
    setShowModal(true);
  };
  const confirmUpdate = async () => {
    const form = {
      bookingID: data.data?.bookingID,
      status: "Done",
    };
    const result = await dispatch(updateStatus(form));
    if (result.payload.ok) {
      fetch();
      setShowModal(false);
      setIsDone(true);
    }
  };

  const cancelUpdate = () => {
    console.log("Cancelled");
    setShowModal(false);
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        dispatch(setShowAlert(false));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert, dispatch]);

  const changeDate = (date) => {
    if (!date) return "";
    let year = date.slice(0, 4);
    let month = date.slice(5, 7);
    let day = date.slice(8, 10);
    return `${day}-${month}-${year}`;
  };

  if (loading) {
    return <div>Loading...</div>;
  }
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
      <div className="container cus-container">
        <div className="justify-content-center cus-mt5test">
          <div className="card card-mycustom">
            <div className="card-header text-center">
              <h5>Booking Detail</h5>
            </div>
            <div className="card-body row">
              <form className="col-md-6">
                <div className="formBody">
                  <div className="form-group form-groupTest">
                    <strong>Booking ID:</strong>
                    <input
                      type="text"
                      name="bookingID"
                      value={data.data?.bookingID || ""}
                      readOnly
                    />
                  </div>
                  <div className="form-group form-groupTest">
                    <strong>Created At:</strong>
                    <input
                      type="text"
                      name="createdAt"
                      value={changeDate(data.data?.createdAt) || ""}
                      readOnly
                    />
                  </div>
                  <div className="form-group form-groupTest">
                    <strong>Appoinment At:</strong>
                    <input
                      type="text"
                      name="appointmentAt"
                      value={changeDate(data.data?.appointmentAt) || ""}
                      readOnly
                    />
                  </div>
                  <div className="form-group form-groupTest">
                    <strong>Services:</strong>
                    <textarea
                      name="servicesName"
                      defaultValue={
                        Array.isArray(data.servicesName) &&
                        data.servicesName.length > 0
                          ? data.servicesName.join(", ")
                          : "No services available"
                      }
                      readOnly
                      rows={4}
                      className="form-control text"
                    />
                  </div>
                  <div className="form-group form-groupTest">
                    <strong>FullName:</strong>
                    <input
                      type="text"
                      name="fullName"
                      value={data.data?.fullName || ""}
                      readOnly
                    />
                  </div>
                  <div className="form-group form-groupTest">
                    <strong>Phone Number:</strong>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={data.data?.phoneNumber || ""}
                      readOnly
                    />
                  </div>
                  <div className="form-group form-groupTest">
                    <strong>Stylist Name:</strong>
                    <input
                      type="text"
                      name="stylistName"
                      value={data.stylistName || ""}
                      readOnly
                    />
                  </div>
                  <div className="form-group form-groupTest">
                    <strong>Total Price:</strong>
                    <input
                      type="text"
                      name="originalPrice"
                      value={formatSalary(data.data?.originalPrice) || 0}
                      VND
                      readOnly
                    />
                  </div>
                  <div className="form-group form-groupTest">
                    <strong>Note:</strong>
                    <textarea
                      name="note"
                      defaultValue={data.data?.note || ""}
                      readOnly
                      rows={4}
                      className="form-control text"
                    />
                  </div>
                  <div className="form-group form-groupTest">
                    <strong>Status:</strong>
                    <input
                      type="text"
                      name="status"
                      value={data.data?.status || ""}
                      readOnly
                    />
                  </div>
                </div>
                {data.data?.status === "In-progress" && (
                  <button
                    type="button"
                    onClick={handleUpdate}
                    className="buttonSubmit"
                  >
                    Done
                  </button>
                )}
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
                        <button
                          type="button"
                          className="close"
                          onClick={cancelUpdate}
                        >
                          <span>&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <p>Do you really want to update this booking?</p>
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Content;
