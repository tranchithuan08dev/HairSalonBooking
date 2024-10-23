import API from "./api";

const bookingService = {
  getWorkshift: (data = {}) => {
    return API.call().get(`/api/v1/workshift/getWorkshfit`, {
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
};
export default bookingService;
