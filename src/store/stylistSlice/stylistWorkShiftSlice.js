import { createAsyncThunk } from "@reduxjs/toolkit";
import workshiftService from "../../services/StylistServices/stylistWorkshiftService";


const name = "stylistWorkshift"

export const getAll = createAsyncThunk(
    `${name}/getAll`, async (id) => {
        try{
            const response = await workshiftService.getAll(id);
            console.log(response);
        }catch(error){
            return {
                ok: false,
                message: "Cannot get all workshift for this stylist!"
            };
        };
    }
);
