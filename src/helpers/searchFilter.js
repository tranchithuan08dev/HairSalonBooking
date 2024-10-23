export const searchFilter = (bookings, value) => {
  const isValidPhone = /^\d+$/.test(value);
  
  if (isValidPhone) {
      return {
          key: value,
          filtered: bookings.filter((item) => item.phoneNumber.includes(value)), 
      };
  }
  
  return {
      key: value,
      filtered: bookings,
  };
};
