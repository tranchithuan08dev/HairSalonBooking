import API from "../api";

const workshiftService = {
    getAll: (id) => {
        return API.call().get(`api/v1//workshift/getWorkshift?id=${id}`);
    },
    // getDetail: (id) => {
    //     return API.call().get(`api/v1/booking/`)
    // }
}

export default workshiftService;