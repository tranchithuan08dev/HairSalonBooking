import API from "./api";
const token = localStorage.getItem("ACCESS_TOKKEN");
const dashboardService = {
  //News
  getAllNews: (inputParam) => {
    return API.call().get(`/api/v1/news/getAll`, {
      params: inputParam,
    });
  },

  getDetailNews: (id) => {
    return API.call().get(`/api/v1/news/getDetail?id=${id}`);
  },

  updateNews: (data) => {
    return API.call().patch(`/api/v1/news/update?id=${data.newsID}`, data, {
      headers: {
        token: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  },
  createNews: (data) => {
    return API.call().post(`api/v1/news/create?id=${data.managerID}`, data, {
      headers: {
        token: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  },
  //Create  Stylist and Staff and Update salary
  createStaff: (data) => {
    return API.call().post(`/api/v1/auth/register`, data, {
      headers: {
        token: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getSalary: (id) => {
    return API.call().get(`/api/v1/salary/monthlySalary?id=${id}`);
  },

  getSalaryStaff: (id) => {
    return API.call().get(`/api/v1/salary/generalMonthlySalary?id=${id}`);
  },

  updateSalary: (data) => {
    return API.call().patch(`/api/v1/salary/update?id=${data.salaryID}`, data);
  },
  // Profile
  getDetailManagerById: (id) => {
    return API.call().get(`/api/v1/manager/detail?id=${id}`, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  },

  updateManager: (data) => {
    return API.call().patch(`/api/v1/manager/update`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
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
  getAllService: (inputParam = {}) => {
    return API.call().get(`/api/v1/service/getAll`, {
      params: inputParam,
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
  getAllStylist: (inputParam = {}) => {
    return API.call().get(`/api/v1/stylist/getAll`, {
      params: inputParam,
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
