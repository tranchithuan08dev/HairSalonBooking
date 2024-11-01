import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCancleBooking } from "../store/bookingSlice";
import { message } from "antd";

function BookingSuccessPage() {
  const dispatch = useDispatch();
  const booking = useSelector((state) => state.BOOKING.booking);
  const nagative = useNavigate();
  const cancelBooking = () => {
    alert("Do you want cancle booking???");
    const cancleBooking = {
      bookingID: booking?.newBooking?.bookingID,
      status: "Cancelled",
    };
    dispatch(fetchCancleBooking(cancleBooking))
      .then(() => {
        message.success("Booking has been successfully canceled.");
        nagative("/");
      })
      .catch((error) => {
        message.error("Failed to cancel the booking. Please try again.");
        console.error("Error canceling booking:", error);
      });
  };
  return (
    <>
      <Header />
      <div className="container text-center bg-white p-5 rounded-3 shadow">
        <img
          src="https://images.unsplash.com/photo-1729731321992-5fdb6568816a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8"
          alt="Booking Success Image"
          className="mb-4"
          style={{
            width: "100%",
            maxWidth: "400px",
            height: "auto",
            borderRadius: "15px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
        <h1 className="text-success mb-3">Booking Successful!</h1>
        <p className="text-secondary fs-5 mb-4">
          Your appointment has been booked successfully.
        </p>
        <div className="d-flex justify-content-center gap-3">
          <Link to="/updateBooking" className="btn btn-primary">
            Update Booking
          </Link>

          <button className="btn btn-danger" onClick={cancelBooking}>
            Cancel Booking
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BookingSuccessPage;
