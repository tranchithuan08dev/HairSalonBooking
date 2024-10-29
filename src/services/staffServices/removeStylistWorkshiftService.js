import API from "../api";
const token = localStorage.getItem("ACCESS_TOKKEN");

const workshiftService = {
    getAll: (id) => {
        return API.call().get(`api/v1/workshift/getWorkshift?id=${id}`);
    },
    deleteWorkshift: (data) => {
        return API.call().delete(`api/v1/workshift/removeStylist/`, {
            data: {
                stylistID: data.stylistID,
                workShiftID: data.workShiftID
            }
        });
    }
    
};

export default workshiftService;