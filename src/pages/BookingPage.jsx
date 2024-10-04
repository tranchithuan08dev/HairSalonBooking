import React from "react";
import Header from "../components/header";
import Footer from "../components/Footer";
import "../assets/css/booking.css";
function BookingPage() {
  return (
    <>
      <div className="container-fluid bg-dark">
        {/* Header */}
        <Header />
        {/* Header END */}
        {/* Schedule */}
        <div
          className="d-flex justify-content-center my-4"
          style={{ paddingBottom: 20 }}
        >
          <div
            className="d-flex justify-content-center align-items-center border p-4 bg-dark text-white rounded"
            style={{ borderColor: "#0d6efd", width: 800 }}
          >
            {/* Left side (image) */}
            <div className="me-4">
              <img
                src="public/assets/image/WorkSchedule.jpg"
                alt="Work Schedule"
                className="img-fluid rounded"
                style={{ maxWidth: 300, height: 200, objectFit: "cover" }}
              />
            </div>
            {/* Right side (text) */}
            <div className="time">
              <h4 className="mb-3 text-center">Work Schedule</h4>
              <p className="mb-2">Working Hours: 10AM - 7:30PM (Everyday)</p>
              <p>Except Wednesday: 10AM - 4PM</p>
            </div>
          </div>
        </div>
        {/* Schedule END */}
        <div className="container">
          {/* Booking Title */}
          <h2 className="time text-white text-center">Booking</h2>
          {/* Booking Form */}
          <form action="" className="mb-4">
            {/* Phone Number Input */}
            <label htmlFor="inputPhone" className="form-label text-white">
              Please enter your phone number
            </label>
            <input
              type="tel"
              className="form-control"
              id="inputPhone"
              placeholder="Please enter your phone number"
            />
            {/* Name Input */}
            <label htmlFor="inputName" className="form-label text-white mt-3">
              Please enter your name:
            </label>
            <input
              type="text"
              className="form-control"
              id="inputName"
              placeholder="Please enter your name"
            />
            {/* Stylist Input */}
            <div className="container mt-4">
              {/* Dropdown to Select Stylist */}
              <div className="row">
                <div className="col-md-8">
                  <label
                    htmlFor="stylistSelect"
                    className="form-label text-white"
                  >
                    Choose stylist
                  </label>
                  <select
                    id="stylistSelect"
                    className="form-select"
                    aria-label="Select a stylist"
                  >
                    <option selected="">Choose stylist</option>
                    <option value={1}>Nguyễn Văn A</option>
                    <option value={2}>Trần Văn B</option>
                    <option value={3}>Võ Thị C</option>
                    <option value={4}>Đào Tấn D</option>
                    <option value={5}>Vũ Như E</option>
                  </select>
                </div>
                {/* Stylist Profile */}
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        {/* Stylist Profile */}
                        <img
                          src="public/assets/image/avatar.jpg"
                          alt="Stylist Image"
                          className="rounded-circle me-3"
                          style={{ width: 60, height: 60, objectFit: "cover" }}
                        />
                        <div>
                          <h5 className="mb-0">Nguyễn Văn A</h5>
                          <p className="mb-0">
                            4 <i className="bi bi-star-fill text-warning" />
                          </p>
                        </div>
                      </div>
                      {/* Gallery */}
                      <div className="mt-3">
                        <div className="row g-2">
                          {/* g-2 adds spacing between grid items */}
                          <div className="col-6 col-sm-4 mb-2">
                            <img
                              src="public/assets/image/avatar.jpg"
                              alt="Haircut Example"
                              className="img-fluid rounded"
                              style={{
                                objectFit: "cover",
                                width: 100,
                                height: 100,
                              }}
                            />
                          </div>
                          <div className="col-6 col-sm-4 mb-2">
                            <img
                              src="public/assets/image/avatar.jpg"
                              alt="Haircut Example"
                              className="img-fluid rounded"
                              style={{
                                objectFit: "cover",
                                width: 100,
                                height: 100,
                              }}
                            />
                          </div>
                          <div className="col-6 col-sm-4 mb-2">
                            <img
                              src="public/assets/image/avatar.jpg"
                              alt="Haircut Example"
                              className="img-fluid rounded"
                              style={{
                                objectFit: "cover",
                                width: 100,
                                height: 100,
                              }}
                            />
                          </div>
                          <div className="col-6 col-sm-4 mb-2">
                            <img
                              src="public/assets/image/avatar.jpg"
                              alt="Haircut Example"
                              className="img-fluid rounded"
                              style={{
                                objectFit: "cover",
                                width: 100,
                                height: 100,
                              }}
                            />
                          </div>
                          <div className="col-6 col-sm-4 mb-2">
                            <img
                              src="public/assets/image/avatar.jpg"
                              alt="Haircut Example"
                              className="img-fluid rounded"
                              style={{
                                objectFit: "cover",
                                width: 100,
                                height: 100,
                              }}
                            />
                          </div>
                          <div className="col-6 col-sm-4 mb-2">
                            <img
                              src="public/assets/image/avatar.jpg"
                              alt="Haircut Example"
                              className="img-fluid rounded"
                              style={{
                                objectFit: "cover",
                                width: 100,
                                height: 100,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      {/* Gallery End */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Stylist Input End */}
            {/* Service */}
            <label htmlFor="inputPhone" className="form-label text-white">
              Services
            </label>
            <select className="form-select" aria-label="Default select example">
              <option selected="">Choose service</option>
              <option value={1}>Haircut and shampooing</option>
              <option value={2}>Coloring</option>
              <option value={3}>Combo</option>
            </select>
            {/* Service END */}
            <label htmlFor="inputPhone" className="form-label text-white mt-3">
              Selected services
            </label>
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <span className="fw-bold">Shaving</span>
                  <span className="text-muted">x 2</span>
                </div>
                <span className="badge bg-secondary">150.000 VND</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <span className="fw-bold">Shaving</span>
                  <span className="text-muted">x 1</span>
                </div>
                <span className="badge bg-secondary">150.000 VND</span>
              </li>
            </ul>
            <button
              className="btn btn-dark mt-3"
              style={{ width: "100%", border: "1px solid" }}
            >
              Add Service
            </button>
            <hr />
            <div className="row">
              <div className="col-md-6 text-white">
                <p>
                  <strong>Total:</strong> 300.000 VND
                </p>
              </div>
              <div className="col-md-6 text-white">
                <p>
                  <strong>Estimated Duration:</strong> 120 minutes
                </p>
              </div>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="quietService"
              />
              <label
                className="form-check-label text-white"
                htmlFor="quietService"
              >
                Ask the stylist to be quiet during service
              </label>
            </div>
            {/* Service END */}
            {/* Appointment date */}
            <label htmlFor="inputPhone" className="form-label text-white mt-3">
              Appointment date:
            </label>
            <select className="form-select" aria-label="Default select example">
              <option selected="">Appointment date</option>
              <option value={1}>To day</option>
              <option value={2}>Tomorrow</option>
            </select>
            {/* Appointment date */}
            {/* TIME */}
            <label htmlFor="inputPhone" className="form-label text-white mt-3">
              Select service time slot:
            </label>
            <div className="row mt-3">
              <div className="col-2 time-slot btn btn-light">10:00</div>
              <div className="col-2 time-slot btn btn-light">10:30</div>
              <div className="col-2 time-slot btn btn-light">11:00</div>
              <div className="col-2 time-slot btn btn-light">11:30</div>
              <div className="col-2 time-slot btn btn-light">12:00</div>
              <div className="col-2 time-slot btn btn-light">12:30</div>
              <div className="col-2 time-slot btn btn-light">13:00</div>
              <div className="col-2 time-slot btn btn-light">13:30</div>
              <div className="col-2 time-slot btn btn-light">14:00</div>
              <div className="col-2 time-slot btn btn-light">14:30</div>
              <div className="col-2 time-slot btn btn-light">15:00</div>
              <div className="col-2 time-slot btn btn-light">15:30</div>
              <div className="col-2 time-slot btn btn-light">16:00</div>
              <div className="col-2 time-slot btn btn-light">16:30</div>
              <div className="col-2 time-slot btn btn-light">17:00</div>
              <div className="col-2 time-slot btn btn-light">17:30</div>
              <div className="col-2 time-slot btn btn-light">18:00</div>
              <div className="col-2 time-slot btn btn-light">18:30</div>
              <div className="col-2 time-slot btn btn-light">19:00</div>
              <div className="col-2 time-slot btn btn-light">19:30</div>
            </div>
            {/* TIME END */}
            {/* NOTE */}
            <label htmlFor="inputPhone" className="form-label text-white mt-3">
              NOTE:
            </label>
            <textarea
              className="form-control"
              rows={5}
              id="comment"
              placeholder="Note"
              defaultValue={""}
            />
            {/* NOTE END */}
            <button
              className="btn btn-dark mt-3"
              style={{ width: "100%", border: "1px solid" }}
            >
              Booking
            </button>
            <p className="text-white text-center mt-3 mb-0">
              Pay after the haircut is done, and it's okay to cancle the
              pointment
            </p>
          </form>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default BookingPage;
