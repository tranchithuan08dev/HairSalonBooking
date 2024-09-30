import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSearchParams } from "react-router-dom";

function DayPicker(props) {
  const { bookings, setFilteredBookings } = props;
  const [date, setDate] = useState(""); // Khởi tạo trạng thái cho ngày
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmitDate = () => {
    if (date) {
      const dateValue = date.toLocaleDateString("en-GB"); // Định dạng ngày theo DD/MM/YYYY
      console.log(dateValue);
      const params = new URLSearchParams(searchParams);
      params.set("bookingDate", dateValue);
      setSearchParams(params);
      const filtered = bookings.filter((item) => item.bookingDate === dateValue);
      setFilteredBookings(filtered);
    }
  };

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  return (
    <>
      <label htmlFor="bookingDate">Search by booking date</label>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmitDate();
      }}>
        <DatePicker
          selected={date} // Liên kết giá trị đã chọn với trạng thái
          onChange={handleDateChange} // Cập nhật trạng thái khi thay đổi ngày
          placeholderText="DD/MM/YYYY"
          className="form-control-Date"
          dateFormat="dd/MM/yyyy"
          id="bookingdate"
        />
        <button type="submit" className="dateFind">
          Find
        </button>
      </form>
    </>
  );
}

export default DayPicker;
