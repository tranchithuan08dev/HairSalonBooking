import React from "react";
import Item from "../CardItem";

function Stylist() {
  return (
    <>
      <div className="service" style={{ backgroundColor: "#2e2d2d" }}>
        <div className="text-center">
          <h2 className="service-title text-white">Stylist</h2>
        </div>
        <div className="container mx-auto">
          {/* Row 1 */}
          <div className="row d-flex justify-content-center flex-wrap">
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
          </div>
        </div>
        <div className="d-flex justify-content-center p-5">
          <a href="#" className="loading">
            Xem thêm
          </a>
        </div>
      </div>
    </>
  );
}

export default Stylist;
