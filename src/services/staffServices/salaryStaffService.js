import API from "../api";

const salaryStaffService = {
    getTotalSalary: (id,date) => {
        return API.call().get(`api/v1/salary/generalMonthlySalary?id=${id}&date=${date}`);
    }
}

export default salaryStaffService;