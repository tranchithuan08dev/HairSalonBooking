import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import bookingService from "../services/bookingService";

const name = "booking";
const initialState = {
  workshift: [],
  booking: [],
};

export const fetchWorkShift = createAsyncThunk(
  `${name}/fetchWorkShift`,
  async (inputParams = {}) => {
    try {
      const res = await bookingService.getWorkshift(inputParams);
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchBooking = createAsyncThunk(
  `${name}/fetchBooking`,
  async (data) => {
    try {
      const res = await bookingService.booking(data);
      console.log("Ressss", res);
      return res;
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
    builder.addCase(fetchBooking.fulfilled, (state, action) => {
      state.booking = action.payload;
    });
  },
});

export default bookingSlice.reducer;
