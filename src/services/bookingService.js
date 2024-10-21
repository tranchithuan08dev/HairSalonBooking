import API from "./api";

const bookingService = {
  getWorkshfit: (stylistId) => {
    return API.call().get(`/api/v1/workshift/getWorkshfit?id=${stylistId}`);
  },
  booking: (data) => {
    return API.call().post(`/api/v1/booking/create`, data);
  },
};
export default bookingService;
