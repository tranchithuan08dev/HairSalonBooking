import React, { useState } from "react";
import "./bookingButton.css";
import { Drawer } from "antd";
import { Link } from "react-router-dom";

function Booking() {
  const token = localStorage.getItem("ACCESS_TOKEN");
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="position-relative">
        <img
          src="/assets/image/logo_booking.jpg" // Ensure this path is correct
          alt="Logo-Booking"
          className="img-fluid-logo w-100 vh-100 blurred-image"
        />
        <div className="position-absolute top-50 start-50 translate-middle">
          {token ? (
            <Link to="/booking" className="btn-booking text-white">
              Booking
            </Link>
          ) : (
            <>
              <button className="btn-booking text-white" onClick={showDrawer}>
                Booking
              </button>
              <Drawer title="Booking Details" onClose={onClose} open={open}>
                <h4>Submit form to booking</h4>
                <p>Your upcoming appointment details will be shown here.</p>
                <p>To view or manage your bookings, please use this panel.</p>
                {/* You can add more booking-related content here */}
              </Drawer>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Booking;
