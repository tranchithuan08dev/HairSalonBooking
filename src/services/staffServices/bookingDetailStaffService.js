import API from "../api";
const token = localStorage.getItem("ACCESS_TOKKEN");

const bookingService = {
  getAll: () => {
    return API.call().get(`api/v1/booking/getAll`);
  },
  getDetail: (id) => {
    return API.call().get(`api/v1/booking/detail?bookingID=${id}`, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  },
  updateBooking: (data) => {
    console.log(data);
    return API.call().patch(`api/v1/booking/update`, data, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  },
  generateQR: (data) => {
    return API.call().post(`api/v1/payment/generateQR`, data, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  },
  getServiceDetail: (id) => {
    return API.call().get(`api/v1/service/detail?id=${id}`, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  },
  getStylistDetail: (id) => {
    return API.call().get(`api/v1/stylist/detail?id=${id}`, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  },
  createPayment: (data) => {
    return API.call().post(`api/v1/payment/create`, data, {
      headers: {
          token: `Bearer ${token}`,
      }
    });
  },
  updateStatus: (data) => {
    return API.call().patch(`api/v1/booking/change-status`, data, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  },
  getCustomer: (id) => {
    return API.call().get(`api/v1/customer/detail?id=${id}`, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  },
  getAllServices: () => {
    return API.call().get(`api/v1/service/getAll`);
  },
  updateCustomer: (id, data) => {
    return API.call().patch(`api/v1/customer/update?id=${id}`, data, {
      headers: {
        token: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  }
};
export default bookingService;
