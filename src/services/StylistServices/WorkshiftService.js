import API from "../api";

const workshiftService = {
    getAll: (id) => {
        return API.call().get(`api/v1/workshift/getWorkshfit?id=${id}`);
    }
}

export default workshiftService;