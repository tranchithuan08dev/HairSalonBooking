import API from "../api";

const bookingDetailService = {
    getDetail: (id) => {
        return API.call().get(`api/v1/booking/detail?bookingID=${id}`);
    },
    updateStatus: (id, data) => {
        return API.call().get(`api/v1/booking/update?bookingID=${id}`,data);
    }
}

export default bookingDetailService;
