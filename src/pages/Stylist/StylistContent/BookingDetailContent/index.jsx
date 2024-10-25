import "../../../../assets/css/stylist/bookingDetail.css";
import { useEffect } from "react";
import { fetchBookingDetail, updateStatus, setShowAlert } from "../../../../store/stylistSlice/BookingDetailSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
function Content() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.AUTH);
  const stylistID = currentUser?.actorByRole.stylistID;

  const { data, loading, error, showAlert, message } = useSelector(
    (state) => state.STYLIST.bookingDetail
  );

  useEffect(() => {
    const fetch = async () => {
      await dispatch(fetchBookingDetail(id));
    };
    fetch();
    changeDate();
    console.log(data);
  }, [dispatch, stylistID, updateStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serviceIDs = data.detail?.map(detail => detail.serviceID);
    const form = {
      bookingID: data.data?.bookingID,
      stylistID: data.data?.stylistID,
      serviceID: serviceIDs,
      totalPrice: data.data?.totalPrice,
      stylistWorkShiftID: data.data?.stylistWorkShiftID,
      status: "Completed"
    }
    const result = await dispatch(updateStatus(form));
    if (result.payload) {
      dispatch(fetchBookingDetail(id)); 
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

  if (error) {
    return <p>Error: {error}</p>;
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
                  <div className="form-group">
                    <strong>Booking ID:</strong>
                    <input
                      type="text"
                      name="bookingID"
                      value={data.data?.bookingID || ""}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <strong>Created At:</strong>
                    <input
                      type="text"
                      name="createdAt"
                      value={changeDate(data.data?.createdAt) || ""}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <strong>Appoinment At:</strong>
                    <input
                      type="text"
                      name="appointmentAt"
                      value={changeDate(data.data?.appointmentAt) || ""}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
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
                  <div className="form-group">
                    <strong>FullName:</strong>
                    <input
                      type="text"
                      name="fullName"
                      value={data.data?.fullName || ""}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <strong>Phone Number:</strong>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={data.data?.phoneNumber || ""}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <strong>Stylist Name:</strong>
                    <input
                      type="text"
                      name="stylistName"
                      value={data.stylistName || ""}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <strong>Total Price:</strong>
                    <input
                      type="number"
                      name="totalPrice"
                      value={data.data?.totalPrice || ""}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <strong>Status:</strong>
                    <input
                      type="text"
                      name="status"
                      value={data.data?.status}
                      readOnly
                    />
                  </div>
                </div>
                <button type="submit" onClick={handleSubmit} className="buttonSubmit">
                  Done
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Content;
