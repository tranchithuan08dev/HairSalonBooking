import API from "../services/api";

const salaryService = {
    getTotalBookingOfStaff: (id) => {
        return API.call().get(`api/v1/totalBooking?staffID=${id}`);
    },
    getSalary: (id) => {
        return API.call().get(`api/v1/salary?staffID=${id}`);
    }
}

export default salaryService;