import API from "../api";

const profileService = {
    getStylist: (id) => {
        return API.callWithToken().get(`/api/v1/stylist/detail?id=${id}`)
    },
    updateProfile: (id, data) => {
        return API.callWithToken().patch(`/api/v1/stylist/update?id=${id}`, data)
    }
};

export default profileService;