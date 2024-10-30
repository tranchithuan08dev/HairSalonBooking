import API from "../api";
const token = localStorage.getItem("ACCESS_TOKKEN");

const profileService = {
    getStylist: (id) => {
        return API.call().get(`api/v1/stylist/detail?id=${id}`)
    },
    updateProfile: (id, data) => {
        return API.call().patch(`api/v1/stylist/update?id=${id}`, data, {
            headers: {
                token: `Bearer ${token}`,
            }
        });
    }
};

export default profileService;