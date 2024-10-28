import React from "react";
import "./instagram.css";
function Instagram() {
  return (
    <>
      <div className="container mx-auto ">
        <div className="text-center">
          <h2 className="service-title text-black">Instagram</h2>
        </div>
        <div className="gallery">
          {/* Images */}

          <img
            src="../assets/image/avatar.jpg"
            alt="Image 1"
            className="custom-img "
          />
          <img
            src="../assets/image/avatar.jpg"
            alt="Image 2"
            className="custom-img"
          />
          <img
            src="../assets/image/avatar.jpg"
            alt="Image 3"
            className="custom-img"
          />
          <img
            src="../assets/image/avatar.jpg"
            alt="Image 4"
            className="custom-img"
          />
          <img
            src="../assets/image/avatar.jpg"
            alt="Image 5"
            className="custom-img"
          />
          <img
            src="../assets/image/avatar.jpg"
            alt="Image 6"
            className="custom-img"
          />
          <img
            src="../assets/image/avatar.jpg"
            alt="Image 7"
            className="custom-img"
          />
          <img
            src="../assets/image/avatar.jpg"
            alt="Image 8"
            className="custom-img"
          />
          <img
            src="../assets/image/avatar.jpg"
            alt="Image 9"
            className="custom-img"
          />
          <img
            src="../assets/image/avatar.jpg"
            alt="Image 10"
            className="custom-img"
          />
        </div>
      </div>
    </>
  );
}

export default Instagram;
