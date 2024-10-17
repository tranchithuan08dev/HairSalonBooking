import API from "./api";
const token = localStorage.getItem("ACCESS_TOKKEN");
const dashboardService = {
  //Create Stylist and Staff
  createStaff: (data) => {
    return API.call().post(`/api/v1/auth/register`, data);
  },
  // Profile
  getDetailManagerById: (id) => {
    return API.call().get(`/api/v1/manager/detail?id=${id}`, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  },
  // Customer
  getAllCustomer: () => {
    return API.call().get(`/api/v1/customer/getAll`, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  },
  getDetailCustomerById: (id) => {
    return API.call().get(`/api/v1/customer/detail?id=${id}`, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  },

  updateCustomer: (inputParam = {}) => {
    const { customerID, token } = inputParam;
    return API.call().patch(
      `/api/v1/customer/update?id=${customerID}`,
      inputParam,
      {
        headers: {
          token: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },

  // Service
  getAllService: () => {
    return API.call().get(`/api/v1/service/getAll`, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  },

  getServiceById: (id) => {
    return API.call().get(`/api/v1/service/detail?id=${id}`, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  },

  updateService: (inputParam = {}) => {
    const { serviceID } = inputParam;
    return API.call().patch(
      `/api/v1/service/update?id=${serviceID}`,
      inputParam,
      {
        headers: {
          token: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },

  createService: (formData) => {
    return API.call().post(`/api/v1/service/create`, formData, {
      headers: {
        token: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  },

  //Staff
  getAllStaff: () => {
    return API.call().get(`/api/v1/staff/getAll`, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  },
  getDetailStaffById: (id) => {
    return API.call().get(`/api/v1/staff/detail?id=${id}`, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  },
  updateStaff: (inputParam = {}) => {
    const { staffID } = inputParam;
    return API.call().patch(`/api/v1/staff/update?id=${staffID}`, inputParam, {
      headers: {
        token: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  },
  // Stylist
  getAllStylist: () => {
    return API.call().get(`/api/v1/stylist/getAll`, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  },
  getDetailStylistById: (id) => {
    return API.call().get(`/api/v1/stylist/detail?id=${id}`, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  },
  updateStylist: (inputParam = {}) => {
    const { stylistID } = inputParam;
    return API.call().patch(
      `/api/v1/stylist/update?id=${stylistID}`,
      inputParam,
      {
        headers: {
          token: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },
};

export default dashboardService;
