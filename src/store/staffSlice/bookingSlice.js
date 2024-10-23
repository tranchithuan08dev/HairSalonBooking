import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import bookingService from "../../services/staffServices/bookingDetailStaffService";

const initialState = {
  all: {},
  data: {},
  paymentID: "",
  detail: {},
  loading: true,
  error: null,
  message: "",
  showAlert: false,
};

const name = "booking";

export const fetchBookings = createAsyncThunk(
  `${name}/fetch`,
  async ({ page, perPage }) => {
    try {
      const response = await bookingService.getAll(page, perPage);
      const responseAll = await bookingService.getAllWithoutParameter();
      return {
        ok: true,
        data: response.data,
        all: responseAll.data,
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
      let servicesNameArray = [];
      let stylistName = "";
      const response = await bookingService.getDetail(bookingID);
      let detail = response.data.details; 
      let data = response.data.booking[0];
      for (let index = 0; index < detail.length; index++) {
        const service = await bookingService.getServiceDetail(detail[index].serviceID);
        let name = service.data.service.serviceName;
        servicesNameArray[index] = name; 
      }
      const stylist = await bookingService.getStylistDetail(data.stylistID);
      let name = stylist.data.data.user.fullName;
      stylistName = name;
      return {
        ok: true,
        data: data,
        detail: detail,
        servicesName: servicesNameArray,
        stylistName: stylistName
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
  async (data) => {
    try {
      const response = await bookingService.updateBooking(data);
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

export const generateQR = createAsyncThunk(
  `${name}/generateQR`,
  async (data) => {
    try {
      const response = await bookingService.generateQR(data);
      return {
        ok: true,
        data: response.data,
      };
    } catch (error) {
      return {
        ok: false,
        message: "Cannot generateQR!",
      };
    }
  }
);

export const updatePayment = createAsyncThunk(
  `${name}/updatePayment`,
  async ({id, data}) => {
    try{
      const response = await bookingService.updatePayment(id, data);
      console.log(response.data);
      return {
        ok: true,
        message: "Payment updated successfully!",
      };
    }catch(error){
      return {
        ok: false,
        message: "Cannot update!",
      };
    }
  }
)

export const createPayment = createAsyncThunk(
  `${name}/createPayment`,
  async (data) => {
    try{
      const response = await bookingService.createPayment(data);
      console.log("paymentCreate", response.data);
      return {
        ok: true,
        data: response.data.data.paymentID
      };
    }catch(error){
      return {
        ok: false,
        message: "This booking was paid!",
      };
    }
  }
)

const bookingSlice = createSlice({
  name,
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    },
    setDetail: (state, action) => {
      state.detail = { ...state.detail, ...action.payload };
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
    }
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
          state.all = { ...state.data, ...action.payload.all };
        } else {
          state.error = action.payload.message;
        }
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.error = action.payload.message;
      })
      .addCase(fetchBookingDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookingDetail.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.ok) {
          state.detail = action.payload;
        } else {
          state.error = action.payload.message;
        }
      })
      .addCase(fetchBookingDetail.rejected, (state, action) => {
        state.error = action.payload.message;
      })
      .addCase(createPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.ok) {
          state.paymentID = action.payload.data;
        } else {
          state.error = action.payload.message;
        }
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.error = action.payload.message;
      })
      .addCase(updatePayment.rejected, (state) => {
        state.error = action.payload.message;
      })
      .addCase(updatePayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePayment.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.ok) {
          state.message = action.payload.message;
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
          state.message = "Booking updated successfully!";
        } else {
          state.error = action.payload.message;
        }
      })
      .addCase(updateBooking.rejected, (state, action) => {
        state.error = action.payload.message;
      })
      .addCase(generateQR.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateQR.fulfilled, (state, action) => {
        state.loading = false;
        state.showAlert = true;
        if (action.payload.ok) {
          state.qrCode = action.payload.data.qrCode;
          state.message = "QR generated successfully!";
        } else {
          state.error = action.payload.message;
        }
      })
      .addCase(generateQR.rejected, (state, action) => {
        state.error = action.payload.message;
      })
  },
});

export const {
  setData,
  setLoading,
  setError,
  setMessage,
  setShowAlert,
  setDetail,
} = bookingSlice.actions;
export default bookingSlice.reducer;
