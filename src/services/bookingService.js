import API from "./api";

const bookingService = {
  createGuest: (data) => {
    return API.call().post(`/api/v1/guest/create`, data);
  },
  getWorkshift: (data = {}) => {
    return API.call().get(`/api/v1/workshift/getWorkshift`, {
      params: {
        id: data.id,
        shiftDate: data.shiftDate,
      },
    });
  },

  booking: (data) => {
    return API.call().post(`/api/v1/booking/create`, data);
  },
  bookingDetail: (id) => {
    return API.call().get(`/api/v1/booking/detail?bookingID=${id}`);
  },
  updateBooking: (data) => {
    return API.call().patch(`/api/v1/booking/update`, data);
  },
};
export default bookingService;
