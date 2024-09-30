import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function SelectOption(props) {
    const {bookings, setFilteredBookings} = props;
    const [searchParams, setSearchParams] = useSearchParams();
    const [sortOption, setSortOption] = useState("");

    const handleSelectChange = (e) => {
    setSortOption(e.target.value);
    const params = new URLSearchParams(searchParams);
    params.set("sort", sortOption);
    setSearchParams(params);

    let sortedBookings = [...bookings];

    switch (sortOption) {
      case "bookingNewest":
        sortedBookings = sortedBookings.sort(
          (a, b) => new Date(b.bookingDate) - new Date(a.bookingDate)
        );
        break;
      case "bookingOldest":
        sortedBookings = sortedBookings.sort(
          (a, b) => new Date(a.bookingDate) - new Date(b.bookingDate)
        );
        break;
      case "priceLowToHigh":
        sortedBookings = sortedBookings.sort(
          (a, b) => a.totalPrice - b.totalPrice
        );
        break;
      case "priceHighToLow":
        sortedBookings = sortedBookings.sort(
          (a, b) => b.totalPrice - a.totalPrice
        );
        break;
      case "serviceSoonest":
        sortedBookings = sortedBookings.sort(
          (a, b) => new Date(a.serviceDate) - new Date(b.serviceDate)
        );
        break;
      case "serviceLatest":
        sortedBookings = sortedBookings.sort(
          (a, b) => new Date(b.serviceDate) - new Date(a.serviceDate)
        );
        break;
      default:
        break;
    }

    setFilteredBookings(sortedBookings);
  };

  return (
    <>
      <select 
      className="form-select mb-3" 
      value={sortOption}
      onChange={handleSelectChange}
    >
      <option value="" disabled>Sort By</option> {/* Placeholder */}
      <option value="bookingNewest">Booking Date (Newest First)</option>
      <option value="bookingOldest">Booking Date (Oldest First)</option>
      <option value="priceLowToHigh">Total Price - Low to High</option>
      <option value="priceHighToLow">Total Price - High to Low</option>
      <option value="serviceSoonest">Service Date (Soonest First)</option>
      <option value="serviceLatest">Service Date (Latest First)</option>
    </select>
    </>
  );
}

export default SelectOption;
