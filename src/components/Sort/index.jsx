import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { sortBookings } from "../../helpers/sortBookings";

function Sort(props) {
  const { bookings, setFilteredBookings } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortOption, setSortOption] = useState("");

  const optionValue = [
    { label: "Booking Newest", value: "bookingNewest" },
    { label: "Booking Oldest", value: "bookingOldest" },
    { label: "Price Low to High", value: "priceLowToHigh" },
    { label: "Price High to Low", value: "priceHighToLow" },
    { label: "Service Soonest", value: "serviceSoonest" },
    { label: "Service Latest", value: "serviceLatest" }
  ];

  const handleSelectChange = (e) => {
    const params = new URLSearchParams(searchParams);
    const selectedOption = e.target.value;
    setSortOption(selectedOption);
    const sortedBookings = sortBookings(bookings, selectedOption);
    setFilteredBookings(sortedBookings);
    params.set("sort",selectedOption);
    setSearchParams(params);
  };

  return (
    <>
      <select className="form-select mb-3" value={sortOption} onChange={handleSelectChange}>
        <option value="" disabled>Select Sorting Option</option>
        {optionValue.map((item, id) => (
          <option value={item.value} key={id}>{item.label}</option>
        ))}
      </select>
    </>
  );
}

export default Sort;
