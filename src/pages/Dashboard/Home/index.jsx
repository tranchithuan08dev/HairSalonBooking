import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetAllBooking } from "../../../store/dashbroadSlice";
import ChartComponent from "./Canvans";

function Home() {
  const data = useSelector((state) => state.DASHBOARD.getAllBooking);
  const dataBooking = data?.filter((booking) => booking.status === "Completed");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGetAllBooking());
  }, []);
  return (
    <>
      <h2
        style={{
          color: "#333",
          textAlign: "center",
          marginBottom: "16px",
        }}
      >
        Welcome to HairHarmony – Your Premier Salon Booking Platform!
      </h2>
      <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#555" }}>
        At HairHarmony, we believe that booking your next hair appointment
        should be a breeze. Whether you're looking for a fresh cut, a vibrant
        new color, or a rejuvenating hair treatment, our easy-to-use platform
        ensures you can schedule your favorite services in just a few clicks.
      </p>
      <ChartComponent bookingData={dataBooking} />
    </>
  );
}

export default Home;
