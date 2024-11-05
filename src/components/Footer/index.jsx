import React from "react";

function Footer() {
  return (
    <>
      <footer className="bg-black text-center text-lg-start text-white">
        {/* Grid container */}
        <div className="container p-4 mx-auto" style={{ marginTop: "-20px" }}>
          {/*Grid row*/}
          <div className="row">
            {/*Grid column*/}
            <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
              <h5 className="text-uppercase">Contact Us</h5>
              <p>
                - Phone: 0123-456-789 <br />
                - Email: harmonyhairsalon2024@gmail.com <br />- Address: Fpt
                University
              </p>
            </div>
            {/*Grid column*/}
            {/*Grid column*/}
            <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
              <h5 className="text-uppercase">Follow Us</h5>
              <p>
                - Github: https://github.com/tranchithuan08dev/HairSalonBooking <br />
              </p>
            </div>
            {/*Grid column*/}
          </div>
          {/*Grid row*/}
        </div>
        {/* Grid container */}
        {/* Copyright */}
        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          <i>Quality service is our top priority!</i>
        </div>
        {/* Copyright */}
      </footer>
    </>
  );
}

export default Footer;
