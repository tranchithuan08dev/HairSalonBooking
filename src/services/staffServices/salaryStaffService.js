import API from "../api";
const token = localStorage.getItem("ACCESS_TOKKEN");


const salaryStaffService = {
  getTotalSalary: (id, date) => {
    console.log(id, date);
    return API.call().get(`api/v1/salary/generalMonthlySalary?id=${id}&date=${date}`, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  },
};

export default salaryStaffService;
