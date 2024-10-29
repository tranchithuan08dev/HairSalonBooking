import API from "./api";
const token = localStorage.getItem("ACCESS_TOKKEN");
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
  cancleBooking: (id) => {
    return API.call().delete(`/api/v1/booking/delete?bookingID=${id}`);
  },
  historyBooking: (id) => {
    return API.call().get(`/api/v1/booking/history?id=${id}`, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  },
};
export default bookingService;
