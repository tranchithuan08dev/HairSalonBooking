import API from "./api";

const profileService = {
    getStaff: (id) => {
        return API.call().get(`staff/detail/${id}`)
    },
    updateProfile: (id, data) => {
        return API.call().patch(`staff/update/${id}`, data)
    }
};

export default profileService;