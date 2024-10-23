import { useLocation } from "react-router-dom";
import "../../../../assets/css/staff/bookingDetail.css";
import { useEffect, useState } from "react";
import {
  createPayment,
  fetchBookingDetail,
  generateQR,
  setDetail,
  setShowAlert,
  updateBooking,
  updatePayment,
} from "../../../../store/staffSlice/bookingSlice";
import { useDispatch, useSelector } from "react-redux";

function Content() {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const bookingID = queryParams.get("bookingID");
  const [status, setStatus] = useState();
  const [showForm, setShowForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [qr, setQr] = useState(null);
  const { detail, loading, message, error, showAlert, paymentID } = useSelector(
    (state) => state.STAFF.booking
  );
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchBookingDetail(bookingID));
    };
    fetchData();
    const dataCreate = {
      bookingID: detail.data?.bookingID || "",
      method: "Cash",
      status: "unpaid"
    }
    if(detail.data?.status === "Completed"){
      const create = async () => {
        await dispatch(createPayment(dataCreate))
      }
      create();
    }
  }, [dispatch, bookingID]);

  useEffect(() => {
    setStatus(detail.data?.status || "");
  }, [detail]); 

  const handleChange = (e) => {
    const { value } = e.target;
    setStatus(value);
    dispatch(
      setDetail({
        ...detail,
        data: {
          ...detail.data,
          status: value,
        },
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const serviceIDs = detail.detail?.map(detail => detail.serviceID);

    const form = {
      bookingID: detail.data?.bookingID,
      stylistID: detail.data?.stylistID,
      serviceID: serviceIDs,
      totalPrice: detail.data?.totalPrice,
      stylistWorkShiftID: detail.data?.stylistWorkShiftID,
      status: detail.data?.status
    }
    await dispatch(updateBooking(form));
  };

  const handleGenerate = async () => {
    console.log("pushed");
    const value = {
      Amount: detail.data?.totalPrice || "0",
      Description: "Chuyen Khoan",
    };

    const result = await dispatch(generateQR(value));
    if (result.payload) {
      setQr(result.payload.data.qrCode); 
    }
  };

  const changeDate = (date) => {
    if (!date) return "";
    let year = date.slice(0, 4);
    let month = date.slice(5, 7);
    let day = date.slice(8, 10);
    return `${day}-${month}-${year}`;
  };


  const handleClickCreate = () => {
    setShowForm(true); 
};

const handlePaymentSubmit = (e) => {
    e.preventDefault(); 
    let data = {
      bookingID: detail.data?.bookingID || "",
      method: paymentMethod,
      status: "paid"
    }
    dispatch(updatePayment({id: paymentID, data}));
    setShowForm(false);
};
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        dispatch(setShowAlert(false));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
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
                    value={detail.data?.bookingID || ""}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <strong>Created At:</strong>
                  <input
                    type="text"
                    name="createdAt"
                    value={changeDate(detail.data?.createdAt) || ""}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <strong>Appoinment At:</strong>
                  <input
                    type="text"
                    name="appointmentAt"
                    value={changeDate(detail.data?.appointmentAt) || ""}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <strong>Services:</strong>
                  <textarea
                    name="servicesName"
                    defaultValue={Array.isArray(detail.servicesName) && detail.servicesName.length > 0
                      ? detail.servicesName.join(", ")
                      : "No services available"}
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
                    value={detail.data?.fullName || ""}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <strong>Phone Number:</strong>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={detail.data?.phoneNumber || ""}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <strong>Stylist Name:</strong>
                  <input
                    type="text"
                    name="stylistName"
                    value={detail.stylistName || ""}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <strong>Total Price:</strong>
                  <input
                    type="number"
                    name="totalPrice"
                    value={detail.data?.totalPrice || ""}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <strong>Status:</strong>
                  <select
                    name="status"
                    value={status}
                    onChange={handleChange}
                  >
                    <option value="Cancelled">Cancelled</option>
                    <option value="In-progress">In-progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
              <button
                type="button"
                onClick={handleGenerate}
                className="generateQR"
              >
                Generate QR
              </button>

              {showAlert && (
                <div
                  className={`alert ${
                    message ? "alert-success" : "alert-danger"
                  } mt-3`}
                  role="alert"
                >
                  {message || error}
                </div>
              )}
              <button
                type="submit"
                onClick={handleSubmit}
                className="buttonSubmit"
              >
                Update
              </button>
              
              <button
                type="button"
                onClick={handleClickCreate}
                className="buttonCreatePayment"
            >
                Pay
            </button>
            </form>
            {showForm && (
                <div className="payment-form" style={{width: "492px"}}>
                    <form onSubmit={handlePaymentSubmit}>
                        <label htmlFor="payment-method">Select Payment Method:</label>
                        <select
                            id="payment-method"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                            <option value="Cash">Cash</option>
                            <option value="Banking">Banking</option>
                        </select>
                        <button type="submit" style={{margin: "5px"}}>Submit Payment</button>
                        <button type="button" style={{margin: "5px"}} onClick={() => setShowForm(false)}>Cancel</button>
                    </form>
                </div>
            )}
            

            {qr && (
              <div className="col-md-6 QR">
                <div className="Image justify-content align-items">
                  <div className="imageContainer">
                    <img
                      style={{ width: "400px", height: "400px" }}
                      src={qr}
                      alt="QR Code"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;
