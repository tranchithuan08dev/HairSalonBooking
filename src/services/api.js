import axios from "axios";

const API = {
  call: function () {
    return axios.create({
      baseURL: "http://localhost:5000/",
    });
  },
  callWithToken: function (token) {
    return axios.create({
      baseURL: "http://localhost:5000/",
      headers: {
        token: `Bearer ${token}`,
      },
    });
  },
};
export default API;
