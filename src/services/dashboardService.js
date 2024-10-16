import API from "./api";

const dashboardService = {
  // Profile
  getDetailManagerById: (id) => {
    return API.call().get(`/api/v1/manager/detail?id=${id}`);
  },
  // Customer
  getAllCustomer: () => {
    return API.call().get(`/api/v1/customer/getAll`);
  },
  getDetailCustomerById: (id) => {
    return API.call().get(`/api/v1/customer/detail?id=${id}`);
  },

  updateCustomer: (inputParam = {}) => {
    const { customerID } = inputParam;
    return API.call().patch(
      `/api/v1/customer/update?id=${customerID}`,
      inputParam
    );
  },
  // Service
  getAllService: () => {
    return API.call().get(`/api/v1/service/getAll`);
  },

  getServiceById: (id) => {
    return API.call().get(`/api/v1/service/detail?id=${id}`);
  },

  updateService: (inputParam = {}) => {
    const { serviceID } = inputParam;
    return API.call().patch(
      `/api/v1/service/update?id=${serviceID}`,
      inputParam
    );
  },

  createService: (formData) => {
    return API.call().post(`/api/v1/service/create`, formData);
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
