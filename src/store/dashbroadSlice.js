import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import dashboardService from "../services/dashboardService";
import { mappingStaff, mappingStylist } from "../helpers";

const name = "posts";
const initialState = {
  //Staff
  postStaff: [],
  //Stylist
  postStylist: [],
  postStylistDetailById: [],
  updateStylist: null,
};

//Staff
export const featchPostStaff = createAsyncThunk(
  `${name}/featchPostStaff`,
  async () => {
    const res = await dashboardService.getAllSatff();
    const dataStaff = res.data.data.users.map(mappingStaff);
    return dataStaff;
  }
);
//Stylist
export const fetchPostStylist = createAsyncThunk(
  `${name}/fetchAllStylist`,
  async () => {
    const res = await dashboardService.getAllStylist();
    const data = res.data.data.users.map(mappingStylist);
    return data;
  }
);

export const fetchPostStylistDetailById = createAsyncThunk(
  `${name}/fetchPostStylistDetailById`,
  async (stylistID) => {
    const res = await dashboardService.getDetailStylistById(stylistID);
    const datastylistId = res.data.data.user;
    return datastylistId;
  }
);

export const fetchUpdateStylist = createAsyncThunk(
  `${name}/fetchUpdateStylist`,
  async (inputParams = {}) => {
    const res = await dashboardService.updateStylist(inputParams);
    console.log(res);
    return res.data;
  }
);

const dashboardSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(featchPostStaff.fulfilled, (state, action) => {
      state.postStaff = action.payload;
    });

    //Stylist
    builder.addCase(fetchPostStylist.fulfilled, (state, action) => {
      state.postStylist = action.payload;
    });
    builder.addCase(fetchPostStylistDetailById.fulfilled, (state, action) => {
      state.postStylistDetailById = action.payload;
    });
    builder.addCase(fetchUpdateStylist.fulfilled, (state, action) => {
      state.updateStylist = action.payload;
    });
  },
});

export default dashboardSlice.reducer;
