import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import bookingDetailService from "../../services/StylistServices/BookingDetailService";

const initialState = {
  data: [],
  loading: true,
  error: null,
  message: "",
  showAlert: false,
};

const name = "bookingDetail";

export const getBooking = createAsyncThunk(`${name}/getBooking`, async (id) => {
  try {
    const response = await bookingDetailService.getDetail(id);
    console.log("response", response.data.booking);
    return {
      ok: true,
      data: response.data.booking,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Cannot get this booking!",
    };
  }
});

export const updateStatus = createAsyncThunk(
  `${name}/update`,
  async ({ id, data }) => {
    try {
      const response = await bookingDetailService.updateStatus(id, data);
      console.log("data update: ", response);
      return {
        ok: true,
        data: response.data.data,
      };
    } catch (error) {
      return {
        ok: false,
        message: "Cannot update!",
      };
    }
  }
);

const bookingDetailSlice = createSlice({
  name,
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBooking.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.ok) {
          state.data = action.payload.data;
        } else {
          state.error = action.payload.message;
        }
      })
      .addCase(updateStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.showAlert = true;
        if (action.payload.ok) {
          state.data = action.payload.data;
        } else {
          state.error = action.payload.message;
        }
      })
      .addCase(updateStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default bookingDetailSlice.reducer;
