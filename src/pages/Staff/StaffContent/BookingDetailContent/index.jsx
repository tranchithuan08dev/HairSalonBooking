import { useLocation } from "react-router-dom";
import "../../../../assets/css/staff/bookingDetail.css";
import { useEffect, useState } from "react";
import {
  updatePayment,
  fetchBookingDetail,
  createPaymentUrl,
  setShowAlert,
  updateBooking,
  fetchServices,
  updateCustomer,
  setError,
  setMessage,
} from "../../../../store/staffSlice/bookingSlice";
import { useDispatch, useSelector } from "react-redux";
import CheckboxLoyaltyPoints from "../../../../components/Staff/CheckboxLoyaltyPoint";
import ListServices from "../../../../components/Staff/ListServices";
import BankSelect from "../../../../components/Staff/BankSelect";
function Content() {
  const dispatch = useDispatch();
  const location = useLocation();
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
  const [bank, setBank] = useState("");

  const { detail, loading, message, error, showAlert, services } = useSelector(
    (state) => state.STAFF.booking
  );

  const {currentUser } = useSelector((state) => state.AUTH);
  const userID = currentUser?.record.userID;
  
  console.log(bookingID);

  const fetchData = async () => {
    await dispatch(fetchBookingDetail(bookingID));
    await dispatch(fetchServices());
    sessionStorage.setItem("currentUser", JSON.stringify(currentUser));

    const url = `${window.location.origin}/staff/bookingDetail?bookingID=${bookingID}`;
    const isRedirect = sessionStorage.getItem("isRedirect") === "true";
    if (isRedirect) {
        const vnp_ResponseCode = queryParams.get("vnp_ResponseCode");
        if (vnp_ResponseCode === "00") {
            await dispatch(setMessage("Transaction success!"));
            await dispatch(setShowAlert(true));
        } else {
            await dispatch(setError("Transaction failed!"));
            await dispatch(setShowAlert(true));
        }
        window.history.replaceState({}, document.title, url); 
        sessionStorage.setItem("isRedirect", "false"); 
    }
};

  useEffect(() => {
    fetchData();
  }, [dispatch, bookingID]);

  useEffect(() => {
    if (detail.data) {
      setStatus(detail.data?.status || "");
      setOriginalPrice(detail.data?.originalPrice || 0);
      setPrice(detail.data?.discountPrice || 0);
    }
    const isPaid = detail.payment?.status === "paid";
    setIsPaid(isPaid);
  }, [detail]);

  const addService = (newService) => {
    const serviceIDs = newService.slice(0, -1);
    setListServices(serviceIDs);

    const totalPrice = newService[newService.length - 1];
    setOriginalPrice(totalPrice);

    console.log("Updated List Services:", getListServices);
    console.log("Original Price:", totalPrice);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = {
      bookingID: detail.data?.bookingID,
      stylistID: detail.data?.stylistID,
      serviceID: getListServices,
      originalPrice: originalPrice || 0,
      discountPrice: price || 0,
      stylistWorkShiftID: detail.data?.stylistWorkShiftID,
      status: "Completed",
    };
    console.log(form);
    const resultUpdate = await dispatch(updateBooking(form));
    if (resultUpdate.payload.ok) {
      const formData = new FormData();
      const dataToUpdate = {
        userID: userID,
        loyaltyPoints: 0,
      };
      for (const key in dataToUpdate) {
        formData.append(key, dataToUpdate[key]);
      }
      await dispatch(updateCustomer(userID, form));
      fetchData();
    }
  };
  const handleGenerate = async () => {
    if(bank === ""){
      alert("Please choose bank!");
      return;
    }
    const object = {
        amount: price,
        bankCode: bank,
        language: "vn",
        orderDescription: "Paid services hair harmony",
        orderType: "other",
        returnURL: window.location.href
    };

    const result = await dispatch(createPaymentUrl(object));
    if(result.payload.ok){
      sessionStorage.setItem("isRedirect", true);
      const link = result.payload.link;
      window.location.href = link;
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
    const dataUpdate = {
      method: paymentMethod,
      status: "paid",
    };

    const result = await dispatch(
      updatePayment({ id: detail.payment?.paymentID, data: dataUpdate })
    );
    if (result.payload.ok) {
      fetchData();
      setShowForm(false);
    }
  };
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        dispatch(setShowAlert(false));
        setIsNotificationTriggered(false);
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
                <ListServices
                  detail={detail}
                  services={services}
                  addService={addService}
                  isPaid={isPaid}
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
                        value={originalPrice || 0}VND
                        readOnly
                      />
                    </div>
                    <div className="form-group">
                      <strong>Discount price:</strong>
                      <input
                        type="number"
                        name="discountPrice"
                        value={price || 0}VND
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
                      value={price || 0}
                      readOnly
                    />
                  </div>
                )}

                <div className="form-group">
                  <strong>Status:</strong>
                  <input name="status" value={status} readOnly/>
                </div>
                {detail.payment?.status && (
                  <div className="form-group">
                    <strong>Payment Status:</strong>
                    <input
                      type="text"
                      name="paymentStatus"
                      value={detail.payment?.status || ""}
                      readOnly
                    />
                  </div>
                )}
              </div>
              {isPaid || status === "Cancelled" ? (
                <></>
              ) : status === "In-progress" ? (
                <button
                  type="submit"
                  onClick={handleSubmit}
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
                    Pay by internet banking or bank
                  </button>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="buttonSubmit button-cus"
                  >
                    Update
                  </button>
                  {!isPaid && (
                    <button
                      type="button"
                      onClick={handleClickCreate}
                      className="buttonCreatePayment button-cus"
                    >
                      Update payment
                    </button>
                  )}
                </>
              )}

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
            </form>
            {showForm && (
              <div className="payment-form" style={{ width: "492px" }}>
                <form onSubmit={handlePaymentSubmit}>
                  <label htmlFor="payment-method">Select Payment Method:</label>
                  <select
                    id="payment-method"
                    value={paymentMethod || ""}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="Cash">Cash</option>
                    <option value="Banking">Banking</option>
                  </select>
                  <button type="submit" style={{ margin: "5px" }}>
                    Submit Payment
                  </button>
                  <button
                    type="button"
                    style={{ margin: "5px" }}
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            )}
            <div className="col-md-6 QR">
              <BankSelect isPaid={isPaid} setBank={setBank}/>
              <CheckboxLoyaltyPoints
                loyaltyPoints={detail.data?.loyaltyPoints || 0}
                originalPrice={originalPrice}
                setDiscountPrice={setPrice}
                setChecked={setChecked}
                isPaid={isPaid}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;