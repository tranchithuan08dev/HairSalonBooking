import API from "../api";

const profileStaffService = {
    getAll: (id) => {
        return API.call().get(`api/v1/workshift/getWorkshift?id=${id}`);
    },
    updateStatus: (data) => {
        return API.call().patch(`api/v1/workshift/updateStatus`, data);
    }
};

export default profileStaffService;