import API from "./api";

const salaryStaffService = {
    getTotalBookingOfStaff: (id) => {
        return API.call().get(`api/v1/totalBooking?staffID=${id}`);
    },
    getSalary: (id) => {
        return API.call().get(`api/v1/salary?staffID=${id}`);
    }
}

export default salaryStaffService;