import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSearchParams } from "react-router-dom";

function DayPicker() {
  const [date, setDate] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmitDate = () => {
    if (date) {
      const dateValue = date.toLocaleDateString("en-GB");
      console.log(dateValue);
      const params = new URLSearchParams(searchParams);
      params.set("appointmentAt", dateValue);
      setSearchParams(params);
    }
  };

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>
          <label htmlFor="appointmentAt">Search by appointment date</label>
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
              placeholderText="DD-MM-YYYY"
              className="form-control-Date"
              dateFormat="dd-MM-yyyy"
              id="appointmentAt"
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
