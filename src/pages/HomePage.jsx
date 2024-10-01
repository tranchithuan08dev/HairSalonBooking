import React from "react";
import Header from "../../components/header";
import Footer from "../../components/Footer";

function HomePage() {
  return (
    <>
      <div className="container-fluid p-0">
        {/* Header */}
        <Header />
        {/* Header END */}
        {/* Booking */}
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

        {/* Endbooking */}
        {/* Service */}
        <div className="service" style={{ backgroundColor: "#2e2d2d" }}>
          <div className="text-center">
            <h2 className="service-title text-white">Service</h2>
          </div>
          <div className="container d-flex justify-content-center mx-auto">
            <div className="card card-left">
              <img
                src="../assets/image/service.jpg"
                className="card-img-top"
                alt="..."
                style={{ height: 240, objectFit: "cover" }}
              />
              <div className="card-body">
                <h3 className="text-center">Layer</h3>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
            <div className="card">
              <img
                src="../assets/image/service.jpg"
                className="card-img-top"
                alt="..."
                style={{ height: 240, objectFit: "cover" }}
              />
              <div className="card-body">
                <h3 className="text-center">Layer</h3>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
            <div className="card">
              <img
                src="../assets/image/service.jpg"
                className="card-img-top"
                alt="..."
                style={{ height: 240, objectFit: "cover" }}
              />
              <div className="card-body">
                <h3 className="text-center">Layer</h3>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center p-5">
            <a href="" className="loading">
              Xem thêm
            </a>
          </div>
        </div>
        {/* Service End */}
        {/* Store Space */}
        <div
          className="bg-secondary-subtle p-0"
          style={{ marginBottom: "-20px" }}
        >
          <div className="container mx-auto" style={{ marginTop: 0 }}>
            <div className="text-center" style={{ paddingBottom: 10 }}>
              <h2 className="service-title text-white">Store Space</h2>
            </div>
            {/* Large image */}
            <div className="row mb-3">
              <div className="col-12">
                <img
                  src="../assets/image/Store1.jpg"
                  alt="Large Image"
                  className="img-fluid rounded-3 border border-primary"
                  style={{
                    maxHeight: 400,
                    objectFit: "cover",
                    width: "100%",
                  }}
                />
              </div>
            </div>
            {/* Three smaller images */}
            <div className="row" style={{ paddingBottom: 60 }}>
              <div className="col-md-4">
                <img
                  src="../assets/image/store2.jpg"
                  alt="Small Image 1"
                  className="img-fluid rounded-3"
                  style={{
                    maxHeight: 200,
                    objectFit: "cover",
                    width: "100%",
                  }}
                />
              </div>
              <div className="col-md-4">
                <img
                  src="../assets/image/store3.jpg"
                  alt="Small Image 2"
                  className="img-fluid rounded-3"
                  style={{
                    maxHeight: 200,
                    objectFit: "cover",
                    width: "100%",
                  }}
                />
              </div>
              <div className="col-md-4">
                <img
                  src="../assets/image/store2.jpg"
                  alt="Small Image 3"
                  className="img-fluid rounded-3"
                  style={{
                    maxHeight: 200,
                    objectFit: "cover",
                    width: "100%",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        {/* End Space */}
        {/* Stylist */}
        <div className="service" style={{ backgroundColor: "#2e2d2d" }}>
          <div className="text-center">
            <h2 className="service-title text-white">Stylist</h2>
          </div>
          <div className="container d-flex justify-content-center mx-auto">
            <div className="card card-left">
              <img
                src="../assets/image/avatar.jpg"
                className="card-img-top"
                alt="..."
                style={{ height: 240, objectFit: "cover" }}
              />
              <div className="card-body">
                <h3 className="text-center">Trần Chí Thuận</h3>
              </div>
            </div>
            <div className="card">
              <img
                src="../assets/image/avatar.jpg"
                className="card-img-top"
                alt="..."
                style={{ height: 240, objectFit: "cover" }}
              />
              <div className="card-body">
                <h3 className="text-center">Trần Chí Thuận</h3>
              </div>
            </div>
            <div className="card">
              <img
                src="../assets/image/avatar.jpg"
                className="card-img-top"
                alt="..."
                style={{ height: 240, objectFit: "cover" }}
              />
              <div className="card-body">
                <h3 className="text-center">Trần Chí Thuận</h3>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center p-5">
            <a href="" className="loading">
              Xem thêm
            </a>
          </div>
        </div>
        {/* Stylist End */}
      </div>
      {/* FOOTER  */}
      <Footer />
      {/* FOOTER END */}
    </>
  );
}

export default HomePage;
