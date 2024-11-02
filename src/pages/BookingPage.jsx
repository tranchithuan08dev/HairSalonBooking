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
import { fetchBooking, fetchWorkShift } from "../store/bookingSlice";
import { fetchMe } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { formatPriceToUSD } from "../helpers";

function BookingPage() {
  const nagative = useNavigate();
  const dispatch = useDispatch();
  // Call Data
  const dataServiceFilter = useSelector((state) => state.DASHBOARD.postService);
  const dataStylistFilter = useSelector((state) => state.DASHBOARD.postStylist);

  const dataService = dataServiceFilter.filter(
    (service) => service.deleted === false
  );
  const dataStylist = dataStylistFilter.filter(
    (stylist) => stylist.deleted === false
  );

  const dataStylistById = useSelector(
    (state) => state.DASHBOARD.postStylistDetailById
  );
  const dataWorkShift = useSelector((state) => state.BOOKING.workshift);
  const auth = useSelector((state) => state.AUTH.currentUser);
  const guest = useSelector((state) => state.BOOKING.createGuest);
  const token = localStorage.getItem("ACCESS_TOKKEN");
  // console.log("dataService", dataService);
  // console.log("dataStylist", dataStylist);
  console.log("dataStylistById", dataStylistById);
  // console.log("dataWorkShift", dataWorkShift);
  console.log("tokennnn", auth);
  console.log("Guest", guest);

  // USE State AND GET ALL DATA
  const [phone, setPhone] = useState(null);
  const [name, setName] = useState(null);
  const [customerID, setCustomerID] = useState(null);
  const [guestID, setGuestID] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selects, setSelects] = useState([1]);
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [selectStylistWorkShift, setSelectStylistWorkShift] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const [serviceIDs, setServiceIDs] = useState([]);
  const [selectedToday, setSelectedToday] = useState("");
  const [selectedTomorrow, setSelectedTomorrow] = useState("");
  const [todayDayOfWeek, setTodayDayOfWeek] = useState("");
  const [tomorrowDayOfWeek, setTomorrowDayOfWeek] = useState("");
  const [selectDay, setSelectDay] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  useEffect(() => {
    setPhone(auth?.record?.phoneNumber || guest?.guest?.phoneNumber);
    setName(auth?.actorByRole?.fullName || guest?.guest?.fullName);
    setCustomerID(auth?.actorByRole?.customerID || null);
    setGuestID(guest.guest?.guestID);
  }, [auth]);
  console.log("customerID", customerID);

  // check validate
  const validateForm = () => {
    let isValid = true;

    if (!selectedStylist) {
      message.error("Please select a stylist.");
      isValid = false;
    }

    if (selectedServices.length === 0) {
      message.error("At least one service must be selected.");
      isValid = false;
    }

    if (!selectedTime) {
      message.error("Please select a time slot.");
      isValid = false;
    }

    if (!selectStylistWorkShift) {
      message.error("Please select a stylist's work shift.");
      isValid = false;
    }

    return isValid; // Returns true if the form is valid
  };

  // console.log("selectedServices", selectedServices);
  const HandleBooking = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const booking = {
      guestID: guestID,
      customerID: customerID,
      stylistID: selectedStylist,
      serviceID: serviceIDs,
      originalPrice: totalPrice.toString().replace(/,/g, ""),
      stylistWorkShiftID: selectStylistWorkShift,
    };
    console.log("Booking", booking);

    dispatch(fetchBooking(booking));
    nagative("/bookingsuccess");
  };
  // console.log("StylistId", selectedStylist);

  useEffect(() => {
    dispatch(fetchMe(token));
    dispatch(fetchPostStylist());
    dispatch(fetchPostService());
  }, [dispatch]);

  // SELECT STYLIST
  useEffect(() => {
    const ids = selectedServices.map((item) => {
      const parsedItem = JSON.parse(item);
      return parsedItem.id;
    });
    setServiceIDs(ids);
  }, [selectedServices]);

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

  // Format total price to USD after calculating the total
  const formattedTotalPrice = formatPriceToUSD(dataTotal.totalPrice);

  useEffect(() => {
    setTotalPrice(formattedTotalPrice);
    setTotalDuration(dataTotal.totalDuration);
  }, [selectedServices]);

  console.log("total", totalPrice);

  const handleStylistChange = (event) => {
    const stylistId = event.target.value;
    setSelectedStylist(stylistId);

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
  // console.log("selectStylistWorkShift", selectStylistWorkShift);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 60000); // Update every minute

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const formatTimeToHHmm = (timeString) => {
    const [hours] = timeString.split(":");
    return hours;
  };
  //SELECT TODAY OR TOMORROW
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  useEffect(() => {
    // Get today's date
    const today = new Date();
    const dayToday = String(today.getDate()).padStart(2, "0");
    const monthToday = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const yearToday = today.getFullYear();
    const todayDay = daysOfWeek[today.getDay()];
    setTodayDayOfWeek(todayDay);
    setSelectedToday(`${dayToday}/${monthToday}/${yearToday}`);

    // Get tomorrow's date
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // Increment the day by 1
    const dayTomorrow = String(tomorrow.getDate()).padStart(2, "0");
    const monthTomorrow = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const yearTomorrow = tomorrow.getFullYear();
    const tomorrowDay = daysOfWeek[tomorrow.getDay()];
    setSelectedTomorrow(`${dayTomorrow}/${monthTomorrow}/${yearTomorrow}`);
    setTomorrowDayOfWeek(tomorrowDay);
  }, []);

  const handleChangeDay = (event) => {
    const value = event.target.value;
    console.log("value", value);
    if (value === "1") {
      setSelectDay(todayDayOfWeek);
      setSelectedDate(selectedToday);
    } else {
      setSelectDay(tomorrowDayOfWeek);
      setSelectedDate(selectedTomorrow);
    }
  };
  console.log("selectDay", selectDay);

  useEffect(() => {
    if (selectedStylist != null && selectDay != null) {
      dispatch(fetchWorkShift({ id: selectedStylist, shiftDate: selectDay }));
    }
  }, [selectedStylist, selectDay]);

  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split("/").map(Number);
    return new Date(year, month - 1, day);
  };

  const isToday =
    selectedDate &&
    parseDate(selectedDate).toDateString() === new Date().toDateString();

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
              value={phone}
              disabled
              placeholder="Please enter your phone number"
            />
            {/* Name Input */}
            <label htmlFor="inputName" className="form-label text-white mt-3">
              Please enter your name:
            </label>
            <input
              type="text"
              className="form-control"
              value={name}
              disabled
              placeholder="Please enter your name"
            />
            {/* Stylist Input */}
            <div className="container mt-4">
              {/* Dropdown to Select Stylist */}
              <div className="row">
                <div className="col-md-8" style={{ marginLeft: "-11px" }}>
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
                              {[
                                ...Array(Math.min(dataStylistById.level, 5)),
                              ].map((_, index) => (
                                <i
                                  key={index}
                                  className="bi bi-star-fill text-warning"
                                />
                              ))}
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
                    <option selected="">Choose service</option>
                    {dataService.map((item) => (
                      <option key={item.id} value={JSON.stringify(item)}>
                        {item.serviceName} -{" "}
                        {formatPriceToUSD(item.price.toLocaleString())} VND
                      </option>
                    ))}
                  </select>
                  {index > 0 && (
                    <button
                      className="btn btn-danger ms-2"
                      onClick={() => handleRemoveSelect(index)}
                    >
                      Delete
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
            {selectedStylist && (
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={handleChangeDay}
              >
                <option selected="">Appointment date</option>
                <option value={1}>
                  {selectedToday}||{todayDayOfWeek}
                </option>
                <option value={2}>
                  {selectedTomorrow} || {tomorrowDayOfWeek}
                </option>
              </select>
            )}

            {/* Appointment date */}
            {/* TIME */}
            <label htmlFor="inputPhone" className="form-label text-white mt-3">
              Select service time slot:
            </label>
            <div className="row mt-3">
              {dataWorkShift && dataWorkShift.length > 0 ? (
                dataWorkShift.map((slot) => (
                  <div
                    key={slot.id}
                    className={`col-2 time-slot btn btn-light ${
                      selectedTime === formatTimeToHHmm(slot.startTime)
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      slot.status !== "Inactive" &&
                      handleTimeClick(
                        formatTimeToHHmm(slot.startTime),
                        slot.stylistWorkShiftID
                      )
                    }
                    style={{
                      pointerEvents:
                        slot.status === "Inactive" ||
                        (isToday &&
                          formatTimeToHHmm(slot.startTime) <= currentHour)
                          ? "none"
                          : "auto",
                      backgroundColor:
                        slot.status === "Inactive" ||
                        (isToday &&
                          formatTimeToHHmm(slot.startTime) <= currentHour)
                          ? "#e0e0e0"
                          : selectedTime === formatTimeToHHmm(slot.startTime)
                          ? "#4caf50"
                          : "#fff",
                      color:
                        selectedTime === formatTimeToHHmm(slot.startTime)
                          ? "white"
                          : "black",
                      borderColor:
                        selectedTime === formatTimeToHHmm(slot.startTime)
                          ? "#4caf50"
                          : "#ced4da",
                      cursor:
                        slot.status === "Inactive" ||
                        (isToday &&
                          formatTimeToHHmm(slot.startTime) <= currentHour)
                          ? "not-allowed"
                          : "pointer",
                    }}
                  >
                    {formatTimeToHHmm(slot.startTime)}:00
                  </div>
                ))
              ) : (
                <div className="col-12 text-center text-white">
                  Sorry, stylist not available at this time.
                </div>
              )}
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
              onClick={HandleBooking}
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
