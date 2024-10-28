import API from "../api";
const token = localStorage.getItem("ACCESS_TOKKEN");

const salaryStaffService = {
    getTotalSalaryUntilNow: (id, date) => {
        return API.call().get(`api/v1/salary/monthlySalary?id=${id}&date=${date}`);
    },
    countBookings: () => {
        return API.call().get(`api/v1/booking/getAll`, {
            headers: {
                token: `Bearer ${token}`,
            }
        });
    }
}

export default salaryStaffService;