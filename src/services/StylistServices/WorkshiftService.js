import API from "../api";
const token = localStorage.getItem("ACCESS_TOKKEN");


const workshiftService = {
    getAllByStylistID: (id) => {
        return API.call().get(`api/v1/workshift/getWorkshift?id=${id}`);
    },
    createWorkshift: (data) => {
        return API.call().post(`api/v1/workshift/addStylist`, data, {
            headers: {
                token: `Bearer ${token}`,
            }
        });
    },
    getAllWorkshift: () => {
        return API.call().get(`api/v1/workshift/getAll`);
    },
    getAllDetailByID: (id) => {
        return API.call().get(`api/v1/workshift/getWorkshiftDetail?id=${id}`);
    },
    getAllBooking: (id) => {
        return API.call().get(`api/v1/booking/getAll`);
    }
}

export default workshiftService;