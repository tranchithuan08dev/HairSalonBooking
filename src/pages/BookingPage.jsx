import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../assets/css/booking.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostService,
  fetchPostStylist,
  fetchPostStylistDetailById,
} from "../store/dashbroadSlice";
import { fetchWorkShift } from "../store/bookingSlice";

function BookingPage() {
  const dispatch = useDispatch();
  // Call Data
  const dataService = useSelector((state) => state.DASHBOARD.postService);
  const dataStylist = useSelector((state) => state.DASHBOARD.postStylist);
  const dataStylistById = useSelector(
    (state) => state.DASHBOARD.postStylistDetailById
  );
  const dataWorkShift = useSelector((state) => state.BOOKING.workshift);

  console.log("dataService", dataService);
  // console.log("dataStylist", dataStylist);
  // console.log("dataStylistById", dataStylistById);
  console.log("dataWorkShift", dataWorkShift);

  // USE State AND GET ALL DATA
  const [selectedServices, setSelectedServices] = useState([]);
  const [selects, setSelects] = useState([1]);
  const [selectedStylist, setSelectedStylist] = useState({});
  const [selectStylistWorkShift, setSelectStylistWorkShift] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null); // Store the selected time
  const [currentHour, setCurrentHour] = useState(new Date().getHours()); // Get the current hour

  console.log("selectedServices", selectedServices);

  useEffect(() => {
    dispatch(fetchPostStylist());
    dispatch(fetchPostService());
  }, [dispatch]);

  // SELECT STYLIST
  const handleServiceChange = (index, value) => {
    const newSelectedServices = [...selectedServices];
    newSelectedServices[index] = value;
    setSelectedServices(newSelectedServices);
  };

  // SELECT SERVICE AND SHOW ADD MORE
  const dataTotal = selectedServices
    .map((item) => JSON.parse(item))
    .reduce(
      (acc, service) => ({
        totalPrice: acc.totalPrice + parseFloat(service.price),
        totalDuration: acc.totalDuration + service.duration,
      }),
      { totalPrice: 0, totalDuration: 0 }
    );
  useEffect(() => {
    setTotalPrice(dataTotal.totalPrice);
    setTotalDuration(dataTotal.totalDuration);
  }, [selectedServices]);

  const handleStylistChange = (event) => {
    const stylistId = event.target.value;
    setSelectedStylist(stylistId);
    dispatch(fetchWorkShift(stylistId));
    dispatch(fetchPostStylistDetailById(stylistId));
  };

  // Hàm thêm select nếu số lượng dưới 3
  const handleAddSelect = (event) => {
    event.preventDefault();
    if (selects.length < 3) {
      setSelects([...selects, selects.length + 1]);
    }
  };

  // Hàm xóa select nếu số lượng trên 1
  const handleRemoveSelect = (index) => {
    if (selects.length > 1) {
      // Remove the select
      const newSelects = selects.filter((_, i) => i !== index);
      setSelects(newSelects);
      const newSelectedServices = [...selectedServices];
      newSelectedServices.splice(index, 1);
      setSelectedServices(newSelectedServices);
    }
  };

  // SELECTED TIME AND CHECK REAL TIME
  const handleTimeClick = (time, id) => {
    setSelectedTime(time); // Allow only one selection
    setSelectStylistWorkShift(id);
  };
  console.log("selectStylistWorkShift", selectStylistWorkShift);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHour(new Date().getHours()); // Update the hour in real-time
    }, 60000); // Update every minute

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);
  const formatTimeToHHmm = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    return `${hours}:${minutes}`;
  };
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
        <div className="container mx-auto">
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
                    onChange={handleStylistChange}
                  >
                    <option selected>Choose stylist</option>
                    {dataStylist.map((item) => {
                      return (
                        <option key={item.id} value={item.id}>
                          {item.fullName}
                        </option>
                      );
                    })}
                  </select>
                </div>
                {/* Stylist Profile */}

                <div className="col-md-4">
                  {Object.keys(dataStylistById).length > 0 && (
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          {/* Stylist Profile */}
                          <img
                            src=" ../public/assets/image/avatar.jpg"
                            alt={`${dataStylistById.fullName}'s Image`}
                            className="rounded-circle me-3"
                            style={{
                              width: 60,
                              height: 60,
                              objectFit: "cover",
                            }}
                          />
                          <div>
                            <h5 className="mb-0">{dataStylistById.fullName}</h5>
                            <p className="mb-0">
                              <i className="bi bi-star-fill text-warning" />
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Stylist Input End */}
            {/* Service */}
            <label htmlFor="inputPhone" className="form-label text-white">
              Services
            </label>
            <div>
              {selects.map((_, index) => (
                <div key={index} className="d-flex align-items-center mb-2">
                  <select
                    className="form-select"
                    onChange={(e) => handleServiceChange(index, e.target.value)}
                  >
                    <option value="" disabled>
                      Choose service
                    </option>
                    {dataService.map((item) => (
                      <option key={item.id} value={JSON.stringify(item)}>
                        {item.serviceName} - {item.price.toLocaleString()} VND
                      </option>
                    ))}
                  </select>
                  {index > 0 && (
                    <button
                      className="btn btn-danger ms-2"
                      onClick={() => handleRemoveSelect(index)}
                    >
                      Xóa
                    </button>
                  )}
                </div>
              ))}

              <button
                className="btn btn-dark mt-3"
                style={{ width: "100%", border: "1px solid" }}
                onClick={handleAddSelect}
              >
                Add Service
              </button>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-6 text-white">
                <p>
                  <strong>Total: </strong>
                  {totalPrice} VND
                </p>
              </div>
              <div className="col-md-6 text-white">
                <p>
                  <strong>Estimated Duration: </strong> {totalDuration} minutes
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
              {dataWorkShift.map((slot) => (
                <div
                  key={slot.id}
                  className={`col-2 time-slot btn btn-light ${
                    selectedTime === formatTimeToHHmm(slot.startTime)
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    slot.status !== "active" &&
                    handleTimeClick(
                      formatTimeToHHmm(slot.startTime),
                      slot.stylistWorkShiftID
                    )
                  } // Disable click if status is "active"
                  style={{
                    pointerEvents:
                      slot.status === "active" ||
                      formatTimeToHHmm(slot.startTime) <= currentHour
                        ? "none"
                        : "auto", // Disable if status is active or time is in the past
                    backgroundColor:
                      slot.status === "active" ||
                      formatTimeToHHmm(slot.startTime) <= currentHour
                        ? "#e0e0e0"
                        : selectedTime === formatTimeToHHmm(slot.startTime)
                        ? "#4caf50"
                        : "#fff", // Adjust background color
                    color:
                      selectedTime === formatTimeToHHmm(slot.startTime)
                        ? "white"
                        : "black", // Text color
                    borderColor:
                      selectedTime === formatTimeToHHmm(slot.startTime)
                        ? "#4caf50"
                        : "#ced4da", // Border color
                    cursor:
                      slot.status === "active" ||
                      formatTimeToHHmm(slot.startTime) <= currentHour
                        ? "not-allowed"
                        : "pointer", // Cursor behavior
                  }}
                >
                  {formatTimeToHHmm(slot.startTime)}
                </div>
              ))}
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
