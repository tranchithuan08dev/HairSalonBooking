import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import dashboardService from "../services/dashboardService";
import { mappingStylist } from "../helpers";

const name = "posts";
const initialState = {
  postStaff: [],
  //Stylist
  postStylist: [],
  postStylistDetailById: [],
  updateStylist: null,
};
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
