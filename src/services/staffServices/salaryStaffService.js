import API from "../api";

const salaryStaffService = {
    getTotalSalary: (id) => {
        return API.call().get(`api/v1/salary/generalMonthlySalary?id=${id}`);
    }
}

export default salaryStaffService;