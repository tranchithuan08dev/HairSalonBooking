import "../../../../assets/css/stylist/bookingDetail.css";
import { useEffect } from "react";
import { getBooking } from "../../../../store/stylistSlice/BookingDetailSlice";
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

  const services = ["S001", "S002", "S003", "S004"];

  useEffect(() => {
    const fetch = async () => {
      await dispatch(getBooking(id));
    };
    fetch();
    changeDate();
  }, [dispatch, stylistID]);

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

  const formattedDate = data.appointmentAt ? changeDate(data.appointmentAt) : '';

  function formatCreatedAt(dateString) {
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
  
    return `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`;
  }

  const createdAt = data.createdAt ? formatCreatedAt(data.createdAt) : "";

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <p>Lỗi: {error}</p>;
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
                      defaultValue={data.bookingID}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <strong>Appointment at</strong>
                    <input
                      type="text"
                      name="appointmentAt"
                      defaultValue={formattedDate}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <strong>Created at</strong>
                    <input
                      type="text"
                      name="createdAt"
                      defaultValue={createdAt}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <strong>Services:</strong>
                    <textarea
                      name="serviceID"
                      defaultValue={services.join(", ")}
                      readOnly
                      rows={4} 
                      className="form-control text"
                    />
                  </div>
                  <div className="form-group">
                    <strong>Booking Phone:</strong>
                    <input
                      type="text"
                      name="bookingphone"
                      defaultValue="091313123123"
                      readOnly
                    />
                  </div>
                  {data.customerID ? (
                    <div className="form-group">
                      <strong>Customer</strong>
                      <input
                        type="text"
                        name="customerID"
                        defaultValue={data.customerID}
                        readOnly
                      />
                    </div>
                  ) : (
                    <div className="form-group">
                      <strong>Guest</strong>
                      <input
                        type="text"
                        name="guestID"
                        defaultValue={data.guestID}
                        readOnly
                      />
                    </div>
                  )}
                  <div className="form-group">
                    <strong>Note:</strong>
                    <textarea
                      name="note"
                      defaultValue={data.note}
                      readOnly
                      rows={4} 
                      className="form-control text-2"
                    />
                  </div>

                  <div className="form-group">
                    <strong>Total Price:</strong>
                    <input
                      type="number"
                      name="totalPrice"
                      defaultValue={data.totalPrice}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <strong>Status:</strong>
                    <input
                      type="text"
                      name="status"
                      defaultValue={data.status}
                      readOnly
                    />
                  </div>
                </div>
                <button type="submit" className="buttonSubmit">
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
