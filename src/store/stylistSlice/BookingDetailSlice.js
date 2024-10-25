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

export const fetchBookingDetail = createAsyncThunk(
  `${name}/fetchDetail`,
  async (bookingID) => {
    try {
      let servicesNameArray = [];
      let stylistName = "";
      const response = await bookingDetailService.getDetail(bookingID);
      let detail = response.data.details;
      let data = response.data.booking[0];
      for (let index = 0; index < detail.length; index++) {
        const service = await bookingDetailService.getServiceDetail(
          detail[index].serviceID
        );
        let name = service.data.service.serviceName;
        servicesNameArray[index] = name;
      }
      const stylist = await bookingDetailService.getStylistDetail(
        data.stylistID
      );
      let name = stylist.data.data.user.fullName;
      stylistName = name;
      return {
        ok: true,
        data: data,
        detail: detail,
        servicesName: servicesNameArray,
        stylistName: stylistName,
      };
    } catch (error) {
      return {
        ok: false,
        message: "",
      };
    }
  }
);

export const updateStatus = createAsyncThunk(
  `${name}/update`,
  async (data) => {
    try {
      const response = await bookingDetailService.updateStatus(data);
      console.log("Data update: ", response);
      return {
        ok: true,
        data: response.data.data
      };
    } catch (error) {
      return {
        ok: false,
        message: "Cannot update booking!",
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
      .addCase(fetchBookingDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookingDetail.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.ok) {
          state.data = action.payload;
        } else {
          state.error = action.payload.message;
        }
      })
      .addCase(fetchBookingDetail.rejected, (state, action) => {
        state.error = action.payload.message;
      })
      .addCase(updateStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.showAlert = true;
        if (action.payload.ok) {
          state.data = { ...state.data, ...action.payload.data };
          state.message = "Booking updated successfully!";
        } else {
          state.error = action.payload.message;
        }
      })
      .addCase(updateStatus.rejected, (state, action) => {
        state.error = action.payload.message;
      })
  },
});

export const { setData, setLoading, setError, setMessage, setShowAlert } =
  bookingDetailSlice.actions;
export default bookingDetailSlice.reducer;
