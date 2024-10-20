import API from "./api";

const bookingService = {
  getWorkshfit: (stylistId) => {
    return API.call().get(`/api/v1/workshift/getWorkshfit?id=${stylistId}`);
  },
};
export default bookingService;
