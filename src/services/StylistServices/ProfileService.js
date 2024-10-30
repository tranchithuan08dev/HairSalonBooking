import API from "../api";

const profileService = {
    getStylist: (id) => {
        return API.call().get(`api/v1/stylist/detail?id=${id}`)
    },
    updateProfile: (id, data) => {
        return API.call().patch(`api/v1/stylist/update?id=${id}`, data, {
            headers: {
                token: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        });
    }
};

export default profileService;