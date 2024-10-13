import API from "./api";

const bookingDetailStaffService = {
    getBooking: (id) => {
        return API.call().get(`api/v1/booking/detail?bookingID=${id}`);
    },
    updateBooking: (id, data) => {
        return API.call().patch(`api/v1/booking/update?bookingID=${id}`, data);
    }
}

export default bookingDetailStaffService;