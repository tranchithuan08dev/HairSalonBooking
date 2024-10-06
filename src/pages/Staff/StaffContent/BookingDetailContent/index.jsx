import { useParams } from "react-router-dom";
import "./style.css";
import { useEffect, useState } from "react";

function Content() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const { id } = useParams();

  const bookingDetails = [
    {
      bookingID: "G001",
      bookingDate: "24/09/2024",
      serviceDate: "28/09/2024",
      serviceTime: "10:00 AM",
      serviceID: "S123456",
      serviceName: "Haircut",
      duration: "2-3 hours",
      stylistID: "SL23423",
      staffID: "ST23423",
      username: "Ho Van A",
      bookingphone: "09123123123",
      role: "Customer",
      totalPrice: 99,
      status: "Pending",
      method: "Bank Transfer",
    },
    {
      bookingID: "C002",
      bookingDate: "24/09/2024",
      serviceDate: "27/09/2024",
      serviceTime: "11:00 AM",
      serviceID: "S123457",
      serviceName: "Shaving",
      duration: "1 hour",
      stylistID: "SL23423",
      staffID: "ST23423",
      username: "Ho Van A",
      bookingphone: "09123123123",
      role: "Customer",
      totalPrice: 89,
      status: "Completed",
      method: "Cash",
    },
    {
      bookingID: "C003",
      bookingDate: "25/09/2024",
      serviceDate: "29/09/2024",
      serviceTime: "2:00 PM",
      serviceID: "S123458",
      serviceName: "Facial",
      duration: "1.5 hours",
      stylistID: "SL23423",
      staffID: "ST23423",
      username: "Ho Van A",
      bookingphone: "09123123123",
      role: "Customer",
      totalPrice: 79,
      status: "Pending",
      method: "Bank Transfer",
    },
  ];
  const booking = bookingDetails.find((app) => app.bookingID === id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      bookingID: booking.bookingID,
      bookingDate: e.target.bookingDate.value,
      serviceDate: e.target.serviceDate.value,
      serviceID: e.target.serviceID.value,
      serviceName: e.target.serviceName.value,
      duration: e.target.duration.value,
      stylistID: e.target.stylistID.value,
      staffID: e.target.staffID.value,
      username: e.target.userBooking.value,
      bookingphone: e.target.userPhone.value,
      role: e.target.role.value,
      totalPrice: e.target.totalPrice.value,
      status: e.target.status.value,
      method: e.target.method.value,
    };

    try {
      const response = await axios.post(
        "http://your-backend-api.com/api/bookings",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setMessage("Update successfully!");
        setError("");
        setShowAlert(true);
      }
      } catch (error) {
      setError("Cannot update!");
      setMessage("");
      setShowAlert(true);
      }
  };

  const handleChangeMethod = (e) => {
    console.log(e.target.value);
  };

  const handleChangeStatus = (e) => {
    console.log(e.target.value);
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  if (!booking) {
    return <div>BookingID not found</div>;
  }

  return (
    <>
      <div className="container cus-container">
        <div className="justify-content-center cus-mt5test">
          <div className="card card-mycustom">
            <div className="card-header text-center">
              <h5>Booking Detail</h5>
            </div>
            <div className="card-body row">
              <form onSubmit={handleSubmit} className="col-md-6">
                <div className="formBody">
                  <div className="form-group">
                    <strong>Booking ID:</strong>
                    <input
                      type="text"
                      name="bookingID"
                      defaultValue={booking.bookingID}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <strong>Booking Date:</strong>
                    <input
                      type="text"
                      name="bookingDate"
                      defaultValue={booking.bookingDate}
                    />
                  </div>
                  <div className="form-group">
                    <strong>Service Date:</strong>
                    <input
                      type="text"
                      name="serviceDate"
                      defaultValue={booking.serviceDate}
                    />
                  </div>
                  <div className="form-group">
                    <strong>Service ID:</strong>
                    <input
                      type="text"
                      name="serviceID"
                      defaultValue={booking.serviceID}
                    />
                  </div>
                  <div className="form-group">
                    <strong>Service Name:</strong>
                    <input
                      type="text"
                      name="serviceName"
                      defaultValue={booking.serviceName}
                    />
                  </div>
                  <div className="form-group">
                    <strong>Duration:</strong>
                    <input
                      type="text"
                      name="duration"
                      defaultValue={booking.duration}
                    />
                  </div>
                  <div className="form-group">
                    <strong>Stylist ID:</strong>
                    <input
                      type="text"
                      name="stylistID"
                      defaultValue={booking.stylistID}
                    />
                  </div>
                  <div className="form-group">
                    <strong>Staff ID:</strong>
                    <input
                      type="text"
                      name="staffID"
                      defaultValue={booking.staffID}
                    />
                  </div>
                  <div className="form-group">
                    <strong>Booking's username:</strong>
                    <input
                      type="text"
                      name="userBooking"
                      defaultValue={booking.username}
                    />
                  </div>
                  <div className="form-group">
                    <strong>Booking Phone:</strong>
                    <input
                      type="text"
                      name="userPhone"
                      defaultValue={booking.bookingphone}
                    />
                  </div>
                  <div className="form-group">
                    <strong>User Role:</strong>
                    <input
                      type="text"
                      name="role"
                      defaultValue={booking.role}
                    />
                  </div>
                  <div className="form-group">
                    <strong>Total Price:</strong>
                    <input
                      type="number"
                      name="totalPrice"
                      defaultValue={booking.totalPrice}
                    />
                  </div>
                  <div className="form-group">
                    <strong>Status:</strong>
                    <select
                      name="status"
                      defaultValue={booking.status}
                      onChange={handleChangeStatus}
                    >
                      <option defaultValue="pending">Pending</option>
                      <option defaultValue="confirm">Confirm</option>
                      <option defaultValue="rejected">Rejected</option>
                      <option defaultValue="Cancelled">Confirm</option>
                      <option defaultValue="In-progress">In-progress</option>
                      <option defaultValue="Completed">Completed</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <strong>Method:</strong>
                    <select
                      name="method"
                      defaultValue={booking.method}
                      onChange={handleChangeMethod}
                    >
                      <option defaultValue="bank transfer">
                        Bank Transfer
                      </option>
                      <option defaultValue="cash">Cash</option>
                    </select>
                  </div>
                </div>
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
                <button type="submit" className="buttonSubmit">
                  Update
                </button>
              </form>

              {booking.method === "Bank Transfer" && (
                <div className="col-md-6 QR">
                  <div className="Image justify-content align-items">
                    <h3>QR</h3>
                    <div className="imageContainer">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"></img>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Content;
