import API from "../api";
const token = localStorage.getItem("ACCESS_TOKKEN");

const profileStaffService = {
    getStaff: (id) => {
        return API.call().get(`api/v1/staff/detail?id=${id}`, {
            headers: {
                token: `Bearer ${token}`,
            }
        })
    },
    updateProfile: (id, data) => {
        return API.call().patch(`api/v1/staff/update?id=${id}`, data, {
            headers: {
                token: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        })
    }
};

export default profileStaffService;