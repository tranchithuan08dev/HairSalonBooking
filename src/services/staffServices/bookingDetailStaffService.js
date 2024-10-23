import API from "../api";

const bookingService = {
    getAll: (page, perpage) => {
        return API.call().get(`api/v1/booking/getAll?page=${page}&perpage=${perpage}`);
    },
    getAllWithoutParameter: () => {
        return API.call().get(`api/v1/booking/getAll`); 
    },
    getDetail: (id) => {
        return API.call().get(`api/v1/booking/detail?bookingID=${id}`);
    },
    updateBooking: (data) => {
        return API.call().patch(`api/v1/booking/update`, data);
    },
    generateQR: (data) => {
        return API.call().post(`api/v1/payment/generateQR`, data);
    },
    getServiceDetail: (id) => {
        return API.call().get(`api/v1/service/detail?id=${id}`);
    },
    getStylistDetail: (id) => {
        return API.call().get(`api/v1/stylist/detail?id=${id}`);
    },
    createPayment: (data) => {
        return API.call().post(`api/v1/payment/create`, data);
    },
    updatePayment: (id, data) => {
        return API.call().patch(`api/v1/payment/update?id=${id}`, data);
    }
}

export default bookingService;