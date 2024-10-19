import API from "../api";

const bookingDetailStaffService = {
    getAll: () => {
        return API.call().get(`api/v1/booking/getAll`);
    },
    getDetail: (id) => {
        return API.call().get(`api/v1/booking/detail?bookingID=${id}`);
    },
    updateBooking: (id, data) => {
        return API.call().patch(`api/v1/booking/update?bookingID=${id}`, data);
    }
}

export default bookingDetailStaffService;