import { useLocation, useNavigate } from "react-router-dom";
import "../../../../assets/css/staff/bookingDetail.css";
import { useEffect, useState } from "react";
import {
  createPayment,
  fetchBookingDetail,
  generateQR,
  setShowAlert,
  updateBooking,
  fetchServices,
  updateCustomer,
  updateStatus,
  setMessage,
  setError,
} from "../../../../store/staffSlice/bookingSlice";
import { useDispatch, useSelector } from "react-redux";
import CheckboxLoyaltyPoints from "../../../../components/Staff/CheckboxLoyaltyPoint";
import ListServices from "../../../../components/Staff/ListServices";
import Payment from "../../../../components/Staff/Payment";
import ConfirmModal from "../../../../components/Staff/ConfirmModal";

function Content() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const bookingID = queryParams.get("bookingID");
  const [status, setStatus] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [price, setPrice] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [getListServices, setListServices] = useState([]);
  const [checked, setChecked] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [qr, setQr] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const { detail, loading, message, error, showAlert, services } = useSelector(
    (state) => state.STAFF.booking
  );
  const { currentUser } = useSelector((state) => state.AUTH);
  const userID = currentUser?.record.userID;

  const handleFeedbackClick = () => {
    navigate(`/staff/sendFeedback?bookingID=${bookingID}`);
  };

  const fetchData = async () => {
    await Promise.all([
      dispatch(fetchBookingDetail(bookingID)),
      dispatch(fetchServices()),
    ]);
  };

  useEffect(() => {
    if (loading) return;
    if (detail.data) {
      const serviceIDs = detail.detail
        .filter((item) => !item.deleted)
        .map((item) => item.serviceID);
      setListServices(serviceIDs);
    }
  }, [detail, loading]);

  useEffect(() => {
    dispatch(setShowAlert(false));
    fetchData();
  }, [dispatch, bookingID]);

  useEffect(() => {
    if (detail.data) {
      setStatus(detail.data?.status || "");
      setOriginalPrice(detail.data?.originalPrice || 0);
      setPrice(detail.data?.discountPrice || 0);
    }
  }, [detail]);

  useEffect(() => {
    console.log(detail.data?.status);
    if (detail.data?.status === "Completed") {
      setIsPaid(true);
    }
  }, [detail?.data]);

  const addService = (newService) => {
    const serviceIDs = newService.slice(0, -1);
    setListServices(serviceIDs);

    const totalPrice = newService[newService.length - 1];
    setOriginalPrice(totalPrice);

    console.log("Updated List Services:", getListServices);
    console.log("Original Price:", totalPrice);
  };

  useEffect(() => {
    if (Array.isArray(detail.detail) && detail.detail.length > 0) {
      const serviceIDs = detail.detail
        .filter((item) => !item.deleted)
        .map((item) => item.serviceID);
      setListServices(serviceIDs);
    } else {
      setListServices([]);
    }
  }, [detail.detail]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = {
      bookingID: detail.data?.bookingID,
      stylistID: detail.data?.stylistID,
      serviceID: getListServices,
      originalPrice: originalPrice || 0,
      discountPrice: price || 0,
      stylistWorkShiftID: detail.data?.stylistWorkShiftID,
    };
    console.log(form);
    const resultUpdate = await dispatch(updateBooking(form));
    if (resultUpdate.payload.ok) {
      fetchData();
      await dispatch(setMessage("Update status successfully!"));
      await dispatch(setShowAlert(true));
    }
  };
  const handleSubmit = async () => {
    const form = {
      bookingID: detail.data?.bookingID,
      stylistID: detail.data?.stylistID,
      serviceID: getListServices,
      originalPrice: originalPrice || 0,
      discountPrice: price || 0,
      stylistWorkShiftID: detail.data?.stylistWorkShiftID,
    };
    console.log(form);
    const resultUpdate = await dispatch(updateBooking(form));
    if (resultUpdate.payload.ok) {
      const statusUpdate = await dispatch(
        updateStatus({
          bookingID: detail.data?.bookingID,
          status: "Completed",
        })
      );
      if (statusUpdate.payload.ok) {
        await dispatch(updateCustomer(userID, { loyaltyPoints: 0 }));
        setQr("");
        await dispatch(setMessage("Transaction Complete!"));
        await dispatch(setShowAlert(true));
        const serviceIDs = detail.detail
          .filter((item) => !item.deleted)
          .map((item) => item.serviceID);
        setListServices(serviceIDs);
        fetchData();
      }
    }
  };

  const handleGenerate = async () => {
    console.log("pushed");
    const value = {
      Amount: price || 0,
      Description: "Checkout-Service-HairHairmony",
    };

    const result = await dispatch(generateQR(value));
    if (result.payload.ok) {
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

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setShowConfirm(true);
  };
  const handleConfirmPayment = async () => {
    setShowConfirm(false);
    const dataCreate = {
      bookingID: detail.data?.bookingID || "",
      method: paymentMethod,
      status: "paid",
    };

    const resultCreate = await dispatch(createPayment(dataCreate));
    if (resultCreate.payload.ok) {
      handleSubmit();
      fetchData();
      setShowForm(false);
    }
  };
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        dispatch(setShowAlert(false));
        dispatch(setMessage(null));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert, dispatch]);

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
                <ListServices
                  detail={detail}
                  isPaid={isPaid}
                  services={services}
                  addService={addService}
                  setListServices={setListServices}
                />
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
                {detail.data?.customerID && (
                  <div className="form-group">
                    <strong>Customer point:</strong>
                    <input
                      type="text"
                      name="customerID"
                      value={detail.data?.loyaltyPoints || "0"}
                      readOnly
                    />
                  </div>
                )}
                {checked ? (
                  <>
                    <div className="form-group">
                      <strong>Original price:</strong>
                      <input
                        type="number"
                        name="originalPrice"
                        value={originalPrice || 0}
                        readOnly
                      />
                    </div>
                    <div className="form-group">
                      <strong>Discount price:</strong>
                      <input
                        type="number"
                        name="discountPrice"
                        value={price || 0}
                        VND
                        readOnly
                      />
                    </div>
                  </>
                ) : (
                  <div className="form-group">
                    <strong>Total price:</strong>
                    <input
                      type="number"
                      name="originalPrice"
                      value={originalPrice || 0}
                      readOnly
                    />
                  </div>
                )}

                <div className="form-group">
                  <strong>Status:</strong>
                  <input name="status" value={status} readOnly />
                </div>
              </div>
              {status === "Cancelled" || status === "Completed" ? (
                <></>
              ) : status === "In-progress" ? (
                <button
                  type="submit"
                  onClick={handleUpdate}
                  className="buttonSubmit button-cus"
                >
                  Update
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleGenerate}
                    className="generateQR button-cus"
                  >
                    Generate QR
                  </button>
                  {status === "Done" && (
                    <button
                      type="button"
                      onClick={handleClickCreate}
                      className="buttonCreatePayment button-cus"
                    >
                      Confirm Payment
                    </button>
                  )}
                </>
              )}

              {showAlert && (message || error) && (
                <div
                  className={`alert ${
                    message ? "alert-success" : "alert-danger"
                  } mt-3`}
                  role="alert"
                >
                  {message || error}
                </div>
              )}
            </form>
            <Payment
              showForm={showForm}
              setShowForm={setShowForm}
              handlePaymentSubmit={handlePaymentSubmit}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />

            <ConfirmModal
              show={showConfirm}
              onConfirm={handleConfirmPayment}
              onCancel={() => setShowConfirm(false)}
              message="Are you sure you want to proceed with the payment?"
            />

            <div className="col-md-6 QR">
              {status === "Completed" && (
                <button
                  onClick={handleFeedbackClick}
                  className="feedback-button"
                >
                  Feedback
                </button>
              )}

              <div className="row">
                {qr && (
                  <div className="Image justify-content align-items">
                    <div className="imageContainer">
                      <img
                        style={{ width: "400px", height: "400px" }}
                        src={qr}
                        alt="QR Code"
                      />
                    </div>
                  </div>
                )}

                {status !== "Completed" && detail.data?.customerID != null && (
                  <div className="checkbox-container">
                    <CheckboxLoyaltyPoints
                      loyaltyPoints={detail.data?.loyaltyPoints || 0}
                      originalPrice={originalPrice}
                      setDiscountPrice={setPrice}
                      setChecked={setChecked}
                      checked={checked}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;
