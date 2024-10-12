import { useLocation } from "react-router-dom";
import "../../../../assets/css/staff/bookingDetail.css";
import { useEffect, useState } from "react";
import axios from "axios"; 

function Content() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const bookingId = queryParams.get('bookingID');
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);

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
      paymentstatus: "unpaid",
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
      paymentstatus: "paid",
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
      paymentstatus: "unpaid",
    },
  ];

  const booking = bookingDetails.find((app) => app.bookingID === id);

  const [formData, setFormData] = useState({
    bookingID: booking?.bookingID,
    bookingDate: booking?.bookingDate,
    serviceDate: booking?.serviceDate,
    serviceID: booking?.serviceID,
    serviceName: booking?.serviceName,
    duration: booking?.duration,
    stylistID: booking?.stylistID,
    staffID: booking?.staffID,
    username: booking?.username,
    bookingphone: booking?.bookingphone,
    role: booking?.role,
    totalPrice: booking?.totalPrice,
    status: booking?.status,
    method: booking?.method,
    paymentstatus: booking?.paymentstatus,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted form data:", formData);

    try {
      const response = await axios.patch(`/api/bookings/${formData.bookingID}`,
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

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  if (!formData) {
    return <div>BookingID not found</div>;
  }

  return (
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
                    value={formData.bookingID}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <strong>Booking Date:</strong>
                  <input
                    type="text"
                    name="bookingDate"
                    value={formData.bookingDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <strong>Service ID:</strong>
                  <input
                    type="text"
                    name="serviceID"
                    value={formData.serviceID}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <strong>Stylist ID:</strong>
                  <input
                    type="text"
                    name="stylistID"
                    value={formData.stylistID}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <strong>Staff ID:</strong>
                  <input
                    type="text"
                    name="staffID"
                    value={formData.staffID}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <strong>Username:</strong>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <strong>Booking Phone:</strong>
                  <input
                    type="text"
                    name="bookingphone"
                    value={formData.bookingphone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <strong>User Role:</strong>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <strong>Total Price:</strong>
                  <input
                    type="number"
                    name="totalPrice"
                    value={formData.totalPrice}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <strong>Status:</strong>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirm">Confirm</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="In-progress">In-progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div className="form-group">
                  <strong>Payment Status:</strong>
                  <select
                    name="paymentstatus"
                    value={formData.paymentstatus}
                    onChange={handleChange}
                  >
                    <option value="unpaid">Unpaid</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>
                <div className="form-group">
                  <strong>Method:</strong>
                  <select
                    name="method"
                    value={formData.method}
                    onChange={handleChange}
                  >
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Cash">Cash</option>
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

            {formData.method === "Bank Transfer" && (
              <div className="col-md-6 QR">
                <div className="Image justify-content align-items">
                  <h3>QR</h3>
                  <div className="imageContainer">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
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
