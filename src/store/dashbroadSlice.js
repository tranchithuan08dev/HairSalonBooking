import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import dashboardService from "../services/dashboardService";
import { mappingStylist } from "../helpers";

const name = "posts";
const initialState = {
  postStylist: [],
  postStylistDetailById: [],
};

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
  },
});

export default dashboardSlice.reducer;
