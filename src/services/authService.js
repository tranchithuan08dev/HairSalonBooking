import API from "./api";

const authService = {
  login: (data) => {
    return API.call().post(`/api/v1/auth/login`, data);
  },
};
export default authService;
