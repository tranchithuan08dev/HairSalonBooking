import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import bookingService from "../services/bookingService";

const name = "booking";
const initialState = {
  createGuest: [],
  workshift: [],
  booking: [],
  updateBooking: [],
  cancleBooking: [],
};

export const fetchCancleBooking = createAsyncThunk(
  `${name}/fetchCancleBooking`,
  async (id) => {
    try {
      const res = await bookingService.cancleBooking(id);
      console.log("res", res);

      return res.data;
    } catch (error) {
      console.log("error", error);
    }
  }
);

export const fetchUpdateBooking = createAsyncThunk(
  `${name}/fetchUpdateBooking`,
  async (data) => {
    try {
      const res = await bookingService.updateBooking(data);
      console.log("res", res);

      return res.data;
    } catch (error) {
      console.log("error", error);
    }
  }
);

export const fetchGuest = createAsyncThunk(
  `${name}/fetchGuest`,
  async (data) => {
    try {
      const res = await bookingService.createGuest(data);
      console.log("res", res);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

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
      return res.data;
    } catch (error) {
      console.log("errrr", error);
    }
  }
);

const bookingSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGuest.fulfilled, (state, action) => {
      state.createGuest = action.payload;
    });
    builder.addCase(fetchWorkShift.fulfilled, (state, action) => {
      state.workshift = action.payload;
    });
    builder.addCase(fetchBooking.fulfilled, (state, action) => {
      state.booking = action.payload;
    });
    builder.addCase(fetchUpdateBooking.fulfilled, (state, action) => {
      state.updateBooking = action.payload;
    });
  },
});

export default bookingSlice.reducer;
