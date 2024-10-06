import React from "react";
import "./bookingButton.css";
function Booking() {
  return (
    <>
      <div className="position-relative">
        <img
          src="public/assets/image/logo_booking.jpg"
          alt="Logo-Booking"
          className="img-fluid-logo w-100 vh-100 blurred-image"
        />
        <div className="position-absolute top-50 start-50 translate-middle">
          <a href="/booking" className="btn-booking text-white">
            Booking
          </a>
        </div>
      </div>
    </>
  );
}

export default Booking;
