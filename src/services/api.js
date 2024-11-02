import axios from "axios";

const API = {
  call: function () {
    const instance = axios.create({
        baseURL: "http://localhost:5000/",
    });

    instance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("ACCESS_TOKKEN");
            if (token) {
                config.headers["token"] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return instance;
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
