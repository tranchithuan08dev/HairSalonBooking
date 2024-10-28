import API from "../api";

const salaryStaffService = {
    getTotalSalaryUntilNow: (id, date) => {
        return API.call().get(`api/v1/salary/monthlySalary?id=${id}&date=${date}`);
    },
    countBookings: () => {
        return API.call().get(`api/v1/booking/getAll`);
    }
}

export default salaryStaffService;