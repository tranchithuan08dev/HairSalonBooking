import API from "../api";
const token = localStorage.getItem("ACCESS_TOKKEN");

const salaryStaffService = {
  getTotalSalaryUntilNow: (id) => {
    return API.call().get(`api/v1/salary/generalMonthlySalary?id=${id}`, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  },
  countBookings: () => {
    return API.call().get(`api/v1/booking/getAll`);
  },
};

export default salaryStaffService;
