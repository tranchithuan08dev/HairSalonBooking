import React from "react";
import Header from "../components/header";
import Footer from "../components/Footer";
import Booking from "../components/Home/Booking";
import Service from "../components/Home/Service";

function HomePage() {
  return (
    <>
      <div className="container-fluid p-0">
        {/* Header */}
        <Header />
        {/* Header END */}
        {/* Booking */}
        <Booking />

        {/* Endbooking */}
        {/* Service */}
        <Service />

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
          <div className="container mx-auto">
            {/* Row 1 */}
            <div className="row d-flex justify-content-center flex-wrap">
              <div className="col-md-4 d-flex justify-content-center mb-4">
                <div className="card">
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
              <div className="col-md-4 d-flex justify-content-center mb-4">
                <div className="card">
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
              <div className="col-md-4 d-flex justify-content-center mb-4">
                <div className="card">
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
              <div className="col-md-4 d-flex justify-content-center mb-4">
                <div className="card">
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
              <div className="col-md-4 d-flex justify-content-center mb-4">
                <div className="card">
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
              <div className="col-md-4 d-flex justify-content-center mb-4">
                <div className="card">
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
            </div>
          </div>
          <div className="d-flex justify-content-center p-5">
            <a href="#" className="loading">
              Xem thêm
            </a>
          </div>
        </div>

        {/* Stylist End */}
        {/* Take care */}
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

        {/* Take care END */}

        {/* New Blog */}
        <div className="service" style={{ backgroundColor: "#2e2d2d" }}>
          <div className="text-center">
            <h2 className="service-title text-white">Stylist</h2>
          </div>
          <div className="container mx-auto">
            {/* Row 1 */}
            <div className="row d-flex justify-content-center flex-wrap">
              <div className="col-md-4 d-flex justify-content-center mb-4">
                <div className="card">
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
              <div className="col-md-4 d-flex justify-content-center mb-4">
                <div className="card">
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
              <div className="col-md-4 d-flex justify-content-center mb-4">
                <div className="card">
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
              <div className="col-md-4 d-flex justify-content-center mb-4">
                <div className="card">
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
              <div className="col-md-4 d-flex justify-content-center mb-4">
                <div className="card">
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
              <div className="col-md-4 d-flex justify-content-center mb-4">
                <div className="card">
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
            </div>
          </div>
          <div className="d-flex justify-content-center p-5">
            <a href="#" className="loading">
              Xem thêm
            </a>
          </div>
        </div>

        {/* Blog End */}
        {/* Ins */}
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
            <img
              src="../assets/image/avatar.jpg"
              alt="Image 11"
              className="custom-img"
            />
            <img
              src="../assets/image/avatar.jpg"
              alt="Image 12"
              className="custom-img"
            />
          </div>
        </div>
        {/* Ins end */}
        {/* Map  */}
        <div className="container mx-auto py-8">
          <div className="text-center mb-6">
            <h2 className="service-title text-3xl font-semibold text-black">
              Find Us
            </h2>
            <p className="text-gray-600">
              Locate us on the map and visit our Harmony Salon
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                Harmony Salon Address
              </h3>
              <p className="text-gray-700 mb-2">123 Harmony Street</p>
              <p className="text-gray-700 mb-2">Binh Thanh District</p>
              <p className="text-gray-700 mb-2">Ho Chi Minh City, Vietnam</p>
              <p className="text-gray-700">Phone: (0123) 456 789</p>
            </div>

            <div className="col-span-1 md:col-span-3">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.6100105376067!2d106.80730271151613!3d10.841127589267007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2sFPT%20University%20HCMC!5e0!3m2!1sen!2s!4v1727717121372!5m2!1sen!2s"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg shadow-md"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Map end */}
      </div>
      {/* FOOTER  */}
      <Footer />
      {/* FOOTER END */}
    </>
  );
}

export default HomePage;
