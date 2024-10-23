import API from "../api";

const workshiftService = {
    getAll: (id) => {
        return API.call().get(`api/v1/workshift/getWorkshfitDetail?id=${id}`);
    }
}

export default workshiftService;