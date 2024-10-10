import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import dashboardService from "../services/dashboardService";
import { mappingStylist } from "../helpers";

const name = "posts";
const initialState = {
  postStylist: [],
};

export const fetchPostStylist = createAsyncThunk(
  `${name}/fetchAllStylist`,
  async () => {
    const res = await dashboardService.getAllStylist();
    const data = res.data.data.users.map(mappingStylist);
    return data;
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
  },
});

export default dashboardSlice.reducer;
