import axios from "axios";

const API = {
  call: function () {
    return axios.create({
      baseURL: "http://localhost:5000/api/v1",
    });
  }
};

export default API;
