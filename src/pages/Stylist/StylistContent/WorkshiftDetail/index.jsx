import "../../../../assets/css/stylist/bookingDetail.css";
import { useEffect, useState } from "react";
function Content() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
    bookingID: "B001",
    bookingDate: "2024-10-20",
    serviceID: "S001",
    username: "Nguyen Van A",
    bookingphone: "0123456789",
    role: "Customer",
    totalPrice: 200000,
    status: "Pending",
    paymentstatus: "unpaid",
    method: "Bank Transfer",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
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
                    <strong>Services:</strong>
                    <input
                      type="text"
                      name="serviceID"
                      value={formData.serviceID}
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
    </>
  );
}
export default Content;
