import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dashboardService from "../services/dashboardService";
import { mappingStylist } from "../helpers";

const name = "home";
const initialState = {
  // Stylist
  stylist: [],
};

export const fetchHomeStylist = createAsyncThunk(
  `${name}/fetchHomeStylist`,
  async (inputParam = {}) => {
    const res = await dashboardService.getAllStylist(inputParam);
    const data = res.data.data.users.map(mappingStylist);
    console.log("dtaattatat", data);

    return data;
  }
);

const homeSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHomeStylist.fulfilled, (state, action) => {
      state.stylist = action.payload;
    });
  },
});

export default homeSlice.reducer;
