import API from "../api";

const salaryStaffService = {
    getTotalBooking: (id) => {
        return API.call().get(`api/v1/booking`);
    },
    getTotalBooking: (id) => {
        return API.call().get(`api/v1/salary/getAll?id=${id}`);
    }
}

export default salaryStaffService;