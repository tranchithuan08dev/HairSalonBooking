export const searchFilter = (bookings, value) => {
  const isValidPhone = /^\d+$/.test(value);
  if (isValidPhone) {
      return {
          type: "phone",
          key: value,
          filtered: bookings.filter((item) => item.phone.includes(value))
      };
  } else if (value.trim() === "") {
      return { type: "", key: "", filtered: bookings }; 
  } else {
      return {
          type: "name",
          key: value,
          filtered: bookings.filter((item) => item.name.toLowerCase().includes(value.toLowerCase())) 
      };
  }
};
