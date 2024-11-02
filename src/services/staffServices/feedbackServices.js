import API from "../api";
const token = localStorage.getItem("ACCESS_TOKKEN");

const feedbackService = {
  getAllFeedback: () => {
    return API.call().get(`api/v1/feedback/getAll`);
  },
  createFeedback: (data) => {
    return API.call().post("api/v1/feedback/create", data, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  },
};

export default feedbackService;
