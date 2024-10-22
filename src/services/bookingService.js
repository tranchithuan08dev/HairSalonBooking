import API from "./api";

const bookingService = {
  getWorkshfit: (stylistId) => {
    return API.call().get(`/api/v1/workshift/getWorkshfit?id=${stylistId}`);
  },
  booking: (data) => {
    return API.call().post(`/api/v1/booking/create`, data);
  },
  bookingDetail: (id) => {
    return API.call().get(`/api/v1/booking/detail?bookingID=${id}`);
  },
};
export default bookingService;
