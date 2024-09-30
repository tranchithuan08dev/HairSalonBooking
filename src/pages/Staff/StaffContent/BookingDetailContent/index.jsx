import { useState } from "react";
import { useParams } from "react-router-dom";

function Content() {
  const [image, setImage] = useState(null);
  const { id } = useParams();

  const handleImageUpload = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const bookingDetails = [
    {
      bookingID: "G001",
      bookingDate: "24/09/2024",
      serviceDate: "28/09/2024",
      serviceTime: "10:00 AM",
      serviceID: "S123456",
      serviceName: "Haircut",
      duration: "2-3 hours",
      stylistName: "Ho Van A",
      totalPrice: "99$",
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
      stylistName: "Ho Van B",
      totalPrice: "89$",
      status: "Completed",
      method: "Credit Card",
    },
    {
      bookingID: "C003",
      bookingDate: "25/09/2024",
      serviceDate: "29/09/2024",
      serviceTime: "2:00 PM",
      serviceID: "S123458",
      serviceName: "Facial",
      duration: "1.5 hours",
      stylistName: "Ho Van C",
      totalPrice: "79$",
      status: "Pending",
      method: "Cash",
    },
  ];

  const booking = bookingDetails.find(app => app.bookingID === id);

  // Check if the booking is found
  if (!booking) {
    return <div>BookingID not found</div>;
  }

  return (
    <>
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-9">
            <div className="card">
              <div className="card-header text-center">
                <h5>Booking Detail</h5>
              </div>
              <div className="card-body row">
                <div className="col-md-6" key={booking.bookingID}>
                  <p>
                    <strong>Booking ID:</strong>{" "}
                    {booking.bookingID}
                  </p>
                  <p>
                    <strong>Booking Date:</strong> {booking.bookingDate}
                  </p>
                  <p>
                    <strong>Service Date:</strong> {booking.serviceDate}
                  </p>
                  <p>
                    <strong>Service Time:</strong> {booking.serviceTime}
                  </p>
                  <p>
                    <strong>Service ID:</strong> {booking.serviceID}
                  </p>
                  <p>
                    <strong>Service Name:</strong> {booking.serviceName}
                  </p>
                  <p>
                    <strong>Duration:</strong> {booking.duration}
                  </p>
                  <p>
                    <strong>Stylist Name:</strong> {booking.stylistName}
                  </p>
                  <p>
                    <strong>Total Price:</strong> {booking.totalPrice}
                  </p>
                  <p>
                    <strong>Status:</strong> {booking.status}
                  </p>
                  <p>
                    <strong>Method:</strong> {booking.method}
                  </p>
                </div>
                {booking.method.toLowerCase() === "cash" ? (
                  ""
                ) : (
                  <div className="col-md-6">
                    <div className="Image justify-content align-items">
                      <h3>QR Upload</h3>
                      <div className="imageContainer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                        {image ? (
                          <img
                            src={image}
                            className="image"
                            alt="preview"
                            style={{ width: "450px", height: "350px" }}
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <div className="card-header text-center">
                <h5>Customer Detail</h5>
              </div>
              <div className="card-body">
                <p>
                  <strong>Id: </strong> 123456
                </p>
                <p>
                  <strong>Phone:</strong> 0912313123123
                </p>
                <p>
                  <strong>Role:</strong> Guest
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Content;
