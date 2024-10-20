import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import bookingService from "../../services/staffServices/bookingDetailStaffService";

const initialState = {
    data: {},
    loading: true,
    error: null,
    message: "",
    showAlert: false,
};

const name = "booking";

export const fetchBookings = createAsyncThunk(
  `${name}/fetch`, 
  async ({ page, perPage}) => {
      try {
          const response = await bookingService.getAll(page, perPage);
          return {
              ok: true,
              data: response.data.bookings, 
          };
      } catch (error) {
          return {
              ok: false,
              message: "Error fetching bookings data!",
          };
      }
  }
);

export const fetchBookingDetail = createAsyncThunk(
  `${name}/fetchDetail`, 
  async (bookingID) => {
      try {
          const response = await bookingService.getDetail(bookingID);
          console.log("Booking detail response: ", response);
          return {
              ok: true,
              data: response, 
          };
      } catch (error) {
          return {
              ok: false,
              message: "Error fetching booking detail!",
          };
      }
  }
);

export const updateBooking = createAsyncThunk(
  `${name}/update`, 
  async ({ id, data }) => {
      try {
          const response = await bookingService.updateBooking(id, data);
          console.log("Data update: ", response);
          return {
              ok: true,
              data: response.data.data, 
          };
      } catch (error) {
          return {
              ok: false,
              message: "Cannot update booking!",
          };
      }
  }
);

const bookingSlice = createSlice({
  name,
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = { ...state.data, ...action.payload }; 
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload; 
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setShowAlert: (state) => {
      state.showAlert = !state.showAlert; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false; 
        if (action.payload.ok) {
          state.data = { ...state.data, ...action.payload.data };
        } else {
          state.error = action.payload.message;
        }
      })
      .addCase(fetchBookingDetail.pending, (state) => {
        state.loading = true; 
        state.error = null;
      })
      .addCase(fetchBookingDetail.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.ok) {
          state.data = { ...state.data, ...action.payload.data }; 
        } else {
          state.error = action.payload.message;
        }
      })
      .addCase(updateBooking.pending, (state) => {
        state.loading = true; 
        state.error = null;
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.showAlert = true; 
        if (action.payload.ok) {
          state.data = { ...state.data, ...action.payload.data };
        } else {
          state.error = action.payload.message; 
        }
      });
  },
});

export const { setData, setLoading, setError, setMessage, setShowAlert } = bookingSlice.actions;
export default bookingSlice.reducer;
