import API from "../api";
const token = localStorage.getItem("ACCESS_TOKKEN");


const salaryStaffService = {
  getTotalSalary: (id) => {
    return API.call().get(`api/v1/salary/generalMonthlySalary?id=${id}`, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  },
};

export default salaryStaffService;
