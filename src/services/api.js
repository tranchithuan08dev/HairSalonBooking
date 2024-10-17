import axios from "axios";

const API = {
  call: function () {
    return axios.create({
      baseURL: "http://localhost:5000/",
    });
  },
  callWithToken: function (token) {
    if (!token) token = localStorage.getItem("ACCESS_TOKKEN");
    return axios.create({
      baseURL: "http://localhost:5000/",
      headers: {
        token: `Bearer ${token}`,
      },
    });
  },
};
export default API;
