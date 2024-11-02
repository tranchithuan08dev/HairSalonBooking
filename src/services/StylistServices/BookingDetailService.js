import API from "../api";
const token = localStorage.getItem("ACCESS_TOKKEN");

const bookingDetailService = {
  getDetail: (id) => {
    return API.call().get(`api/v1/booking/detail?bookingID=${id}`, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  },
  getServiceDetail: (id) => {
    return API.call().get(`api/v1/service/detail?id=${id}`, {
      headers: {
          token: `Bearer ${token}`,
      }
    });
  },
  getStylistDetail: (id) => {
    return API.call().get(`api/v1/stylist/detail?id=${id}`);
  },
  updateStatus: (data) => {
    return API.call().patch(`api/v1/booking/change-status`, data, {
      headers: {
          token: `Bearer ${token}`,
      }
    });
  },
};

export default bookingDetailService;
