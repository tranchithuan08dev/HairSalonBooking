import API from "../api";

const bookingService = {
    getAll: (page, perpage) => {
        return API.call().get(`api/v1/booking/getAll?page=${page}&perpage=${perpage}`);
    },
    getDetail: (id) => {
        return API.call().get(`api/v1/booking/detail?bookingID=${id}`);
    },
    updateBooking: (id, data) => {
        return API.call().patch(`api/v1/booking/update?bookingID=${id}`, data);
    }
}

export default bookingService;