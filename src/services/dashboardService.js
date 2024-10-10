import API from "./api";

const dashboardService = {
  getAllStylist: () => {
    return API.call().get(`/api/v1/stylist/getAll`);
  },
};

export default dashboardService;
