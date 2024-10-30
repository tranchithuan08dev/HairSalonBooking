import API from "../api";
const token = localStorage.getItem("ACCESS_TOKKEN");

const workshiftService = {
  getAllWorkshiftByID: (id) => {
    return API.call().get(`api/v1/workshift/getWorkshift?id=${id}`, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  },
  deleteWorkshift: (data) => {
    return API.call().delete(`api/v1/workshift/removeStylist/`, {
      headers: {
        token: `Bearer ${token}`,
      },
      data: {
        stylistID: data.stylistID,
        workShiftID: data.workShiftID,
      },
    });
  },
};

export default workshiftService;
