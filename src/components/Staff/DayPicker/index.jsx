import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSearchParams } from "react-router-dom";

function DayPicker(props) {
  const { bookings, setFilteredBookings } = props;
  const [date, setDate] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmitDate = () => {
    if (date) {
      const dateValue = date.toLocaleDateString("en-GB");
      console.log(dateValue);
      const params = new URLSearchParams(searchParams);
      params.set("bookingDate", dateValue);
      setSearchParams(params);
      const filtered = bookings.filter(
        (item) => item.bookingDate === dateValue
      );
      setFilteredBookings(filtered);
    }
  };

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  return (
    <>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <div>
          <label htmlFor="bookingDate">Search by booking date</label>
        </div>
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmitDate();
            }}
          >
            <DatePicker
              selected={date}
              onChange={handleDateChange}
              placeholderText="DD/MM/YYYY"
              className="form-control-Date"
              dateFormat="dd/MM/yyyy"
              id="bookingdate"
            />
            <button type="submit" className="dateFind">
              Find
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default DayPicker;
