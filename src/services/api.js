import axios from "axios";

const API = {
  call: function () {
    return axios.create({
      baseURL: "http://localhost:5000/",
    });
  },
};
