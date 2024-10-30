import API from "../api";
const token = localStorage.getItem("ACCESS_TOKKEN");

const workshiftService = {
  getAllByStylistID: (id) => {
    return API.call().get(`api/v1/workshift/getWorkshift?id=${id}`, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  },
  createWorkshift: (data) => {
    return API.call().post(`api/v1/workshift/addStylist`, data, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  },
  getAllWorkshift: () => {
    return API.call().get(`api/v1/workshift/getAll`);
  },
  getAllDetailByID: (id) => {
    return API.call().get(`api/v1/workshift/getWorkshiftDetail?id=${id}`, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  },
  getAllBooking: (id) => {
    return API.call().get(`api/v1/booking/getAll`);
  },
};

export default workshiftService;
