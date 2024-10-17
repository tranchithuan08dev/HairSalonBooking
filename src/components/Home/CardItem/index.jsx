import React from "react";
import "./card.css";
function Item() {
  return (
    <>
      <div className="col-md-4 d-flex justify-content-center mb-4">
        <div className="card card-booking">
          <img
            src="../assets/image/logo_booking.jpg"
            className="card-img-top"
            alt="Stylist Trần Chí Thuận"
            style={{ height: 240, objectFit: "cover" }}
          />
          <div className="card-body">
            <h3 className="text-center">
              <a
                className="text-black"
                href="./StylistDetail.html"
                style={{ textDecoration: "none" }}
              >
                Trần Chí Thuận
              </a>
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default Item;
