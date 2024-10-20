import API from "../api";

const profileStaffService = {
    getStaff: (id) => {
        return API.call().get(`api/v1/staff/detail?id=${id}`)
    },
    updateProfile: (id, data) => {
        return API.call().patch(`api/v1/staff/update?id=${id}`, data)
    }
};

export default profileStaffService;