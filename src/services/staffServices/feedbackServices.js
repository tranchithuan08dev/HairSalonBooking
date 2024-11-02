import API from "../api";
const token = localStorage.getItem("ACCESS_TOKKEN");

const feedbackService = {
  createFeedback: (data) => {
    return API.call().post("api/v1/feedback/create", data, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  },
};

export default feedbackService;
