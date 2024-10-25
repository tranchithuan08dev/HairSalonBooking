import API from "../api";

const workshiftService = {
    getAllByStylistID: (id) => {
        return API.call().get(`api/v1/workshift/getWorkshift?id=${id}`);
    },
    createWorkshift: (data) => {
        return API.call().post(`api/v1/workshift/addStylist`, data);
    },
    getAllWorkshift: () => {
        return API.call().get(`api/v1/workshift/getAll`);
    }

}

export default workshiftService;