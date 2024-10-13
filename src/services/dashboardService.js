import API from "./api";

const dashboardService = {
  // Service
  getAllService: () => {
    return API.call().get(`/api/v1/service/getAll`);
  },

  getServiceById: (id) => {
    return API.call().get(`/api/v1/service/detail?id=${id}`);
  },

  //Staff
  getAllStaff: () => {
    return API.call().get(`/api/v1/staff/getAll`);
  },
  getDetailStaffById: (id) => {
    return API.call().get(`/api/v1/staff/detail?id=${id}`);
  },
  updateStaff: (inputParam = {}) => {
    const { staffID } = inputParam;
    return API.call().patch(`/api/v1/staff/update?id=${staffID}`, inputParam);
  },
  // Stylist
  getAllStylist: () => {
    return API.call().get(`/api/v1/stylist/getAll`);
  },
  getDetailStylistById: (id) => {
    return API.call().get(`/api/v1/stylist/detail?id=${id}`);
  },
  updateStylist: (inputParam = {}) => {
    const { stylistID } = inputParam;
    return API.call().patch(
      `/api/v1/stylist/update?id=${stylistID}`,
      inputParam
    );
  },
};

export default dashboardService;
