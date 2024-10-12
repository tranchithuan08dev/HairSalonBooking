import API from "./api";

const dashboardService = {
  getAllStylist: () => {
    return API.call().get(`/api/v1/stylist/getAll`);
  },
  getDetailStylistById: (id) => {
    return API.call().get(`/api/v1/stylist/detail?id=${id}`);
  },
  updateStylist: (inputParam = {}) => {
    const { stylistID, ...data } = inputParam;
    return API.call().patch(`/api/v1/stylist/update?id=${stylistID}`, data);
  },
};

export default dashboardService;
