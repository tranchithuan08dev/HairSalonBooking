import API from "../api";

const bookingDetailService = {
  getDetail: (id) => {
    return API.call().get(`api/v1/booking/detail?bookingID=${id}`);
  },
  getServiceDetail: (id) => {
    return API.call().get(`api/v1/service/detail?id=${id}`);
  },
  getStylistDetail: (id) => {
    return API.call().get(`api/v1/stylist/detail?id=${id}`);
  },
  updateStatus: (data) => {
    return API.call().patch(`api/v1/booking/update`, data);
  },
};

export default bookingDetailService;
