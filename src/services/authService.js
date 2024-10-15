import API from "./api";

const authService = {
  login: (data) => {
    return API.call().post(`/api/v1/auth/login`, data);
  },
  fetchWithMe: (token) => {
    return API.callWithToken(token).get(`/api/v1/user/getCurrent`);
  },
};
export default authService;
