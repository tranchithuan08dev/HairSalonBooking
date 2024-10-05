import React from "react";

function Home() {
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
      <div style={{ width: "800px" }}>
        <p
          style={{
            fontSize: "16px",
            lineHeight: "1.6",
            color: "#555",
            marginTop: "12px",
          }}
        >
          Our team of skilled stylists is committed to providing personalized
          care tailored to your unique style. Explore our diverse range of
          services, view available stylists, and secure your spot at a time that
          fits your busy schedule. Experience the convenience of online booking
          and step into a salon experience designed just for you.
        </p>
      </div>
    </>
  );
}

export default Home;
