export const sortBookings = (bookings, sortOption) => {
  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split("/"); 
    return new Date(year, month - 1, day);
  };

  switch (sortOption) {
    case "bookingNewest":
      bookings = bookings.sort(
        (a, b) => parseDate(b.bookingDate) - parseDate(a.bookingDate)
      );
      break;
    case "bookingOldest":
      bookings = bookings.sort(
        (a, b) => parseDate(a.bookingDate) - parseDate(b.bookingDate)
      );
      break;
    case "priceLowToHigh":
      bookings = bookings.sort((a, b) => a.totalPrice - b.totalPrice);
      break;
    case "priceHighToLow":
      bookings = bookings.sort((a, b) => b.totalPrice - a.totalPrice);
      break;
    case "serviceSoonest":
      bookings = bookings.sort(
        (a, b) => parseDate(a.serviceDate) - parseDate(b.serviceDate)
      );
      break;
    case "serviceLatest":
      bookings = bookings.sort(
        (a, b) => parseDate(b.serviceDate) - parseDate(a.serviceDate)
      );
      break;
    default:
      break;
  }

  return bookings;
};
