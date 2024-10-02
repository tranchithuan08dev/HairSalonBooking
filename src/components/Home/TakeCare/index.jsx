import React from "react";

function TakeCare() {
  return (
    <>
      <div className="container mx-auto">
        <div className="text-center">
          <h2 className="service-title text-black">Store Overview</h2>
        </div>
        <div className="row mb-3">
          <div className="col-12">
            <img
              src="../assets/image/Store1.jpg"
              alt="Store Image"
              className="img-fluid rounded-3 border border-primary"
              style={{ maxHeight: 400, objectFit: "cover", width: "100%" }}
            />
          </div>
        </div>
        <div className="offer-section">
          <div className="row">
            <div className="col-md-4 offer-item">
              <h1>30</h1>
              <p>Days</p>
              <p>Free returns &amp; exchanges</p>
            </div>
            <div className="col-md-4 offer-item">
              <h1>7</h1>
              <p>Days</p>
              <p>Complimentary hair warranty</p>
            </div>
            <div className="col-md-4 offer-item">
              <h1>Exclusive</h1>
              <p>policy</p>
              <p>For long waiting times</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TakeCare;
