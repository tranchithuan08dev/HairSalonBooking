import API from "./api";

const authService = {
  login: (data) => {
    return API.call().post(`api/v1/auth/login`, data);
  },
  fetchWithMe: (token) => {
    return API.callWithToken(token).get(`api/v1/user/getCurrent`);
  },

  register: (data) => {
    return API.call().post(`api/v1/auth/register`, data);
  },
  sendEmail: (email) => {
    return API.call().post(`api/v1/auth/forgot-password`, email);
  },
  resetPassword: (data) => {
    return API.call().post(`api/v1/auth/reset-password`, data);
  },
};
export default authService;
