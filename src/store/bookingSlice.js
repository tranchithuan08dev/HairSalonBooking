import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import bookingService from "../services/bookingService";

const name = "booking";
const initialState = {
  workshift: [],
  loading: false,
  error: null,
};

export const fetchWorkShift = createAsyncThunk(
  `${name}/fetchWorkShift`,
  async (id) => {
    try {
      const res = await bookingService.getWorkshfit(id);
      console.log("res", res);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const bookingSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWorkShift.fulfilled, (state, action) => {
      state.workshift = action.payload;
    });
  },
});

export default bookingSlice.reducer;
