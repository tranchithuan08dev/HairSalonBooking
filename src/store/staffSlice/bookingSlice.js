import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import bookingService from "../../services/staffServices/bookingDetailStaffService";

const initialState = {
  data: {},
  detail: {},
  loading: true,
  error: null,
  message: null,
  showAlert: false,
  services: [],
  link: ""
};

const name = "booking";

export const fetchBookings = createAsyncThunk(`${name}/fetchAll`, async () => {
  try {
    const response = await bookingService.getAll();
    return {
      ok: true,
      data: response.data,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error fetching bookings data!",
    };
  }
});

export const fetchBookingDetail = createAsyncThunk(
  `${name}/fetchDetail`,
  async (id) => {
    try {
      let servicesNameArray = [];
      let stylistName = "";
      console.log("id", id);
      const response = await bookingService.getDetail(id);
      const payment = await bookingService.getAllPayment();
      let data = response.data.booking[0];
      let customerPoint;
      if (data.customerID != null) {
        const customer = await bookingService.getCustomer(data.customerID);
        customerPoint = customer.data.data.customer.loyaltyPoints;
      }
      let detail = response.data.details;
      for (let index = 0; index < detail.length; index++) {
        const service = await bookingService.getServiceDetail(
          detail[index].serviceID
        );
        let name = service.data.service.serviceName;
        servicesNameArray[index] = name;
      }
      const stylist = await bookingService.getStylistDetail(data.stylistID);
      let name = stylist.data.data.user.fullName;
      stylistName = name;
      let paymentList = payment.data.paymentList;
      const foundPayment = paymentList.find(
        (paymentItem) => paymentItem.bookingID === id
      );
      data.loyaltyPoints = customerPoint;
      return {
        ok: true,
        data: data,
        detail: detail,
        servicesName: servicesNameArray,
        stylistName: stylistName,
        payment: foundPayment,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        message: "Error fetching booking detail!",
      };
    }
  }
);

export const fetchServices = createAsyncThunk(
  `${name}/fetchServices`,
  async () => {
    try {
      const response = await bookingService.getAllServices();
      console.log(response.data.services);
      return {
        ok: true,
        data: response.data.services,
      };
    } catch (error) {
      return {
        ok: false,
        message: "Error fetching list services data!",
      };
    }
  }
);

export const updateBooking = createAsyncThunk(
  `${name}/updateBooking`,
  async (data) => {
    try {
      console.log("send", data);
      const response = await bookingService.updateBooking(data);
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
  async ({ id, data }) => {
    try {
      const response = await bookingService.updatePayment(id, data);
      console.log(response.data);
      return {
        ok: true,
        message: "Update payment successfully!",
      };
    } catch (error) {
      return {
        ok: false,
        error: "This booking was paid!",
      };
    }
  }
);

export const createPaymentUrl = createAsyncThunk(
  `${name}/createPaymentUrl`,
  async (data) => {
    try {
      const response = await bookingService.createPaymentUrl(data);
      console.log(response.data.link);
      return {
        ok: true,
        link: response.data.link
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: "Error",
      };
    }
  }
);

export const vnpayReturnURL = createAsyncThunk(
  `${name}/vnpayReturnURL`,
  async (data) => {
    try {
      const response = await bookingService.vnpayReturnURL(data);
      console.log(response.data);
      return {
        ok: true,
        data: response.data
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: "Error",
      };
    }
  }
);

export const updateStatus = createAsyncThunk(
  `${name}/updateStatus`,
  async (data) => {
    try {
      const response = await bookingService.updateStatus(data);
      console.log("Data update: ", response);
      return {
        ok: true,
        success: "Updated status successfullly!",
      };
    } catch (error) {
      return {
        ok: false,
        message: "Cannot update status!",
      };
    }
  }
);

export const updateCustomer = createAsyncThunk(
  `${name}/updateCustomer`,
  async (data) => {
    try {
      const response = await bookingService.updateCustomer(id, data);
      console.log("Data update: ", response.data);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        message: "Cannot update cusomer!",
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
        }
      })
      .addCase(fetchBookings.rejected, (state) => {
        state.loading = false;
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
      .addCase(updatePayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePayment.fulfilled, (state, action) => {
        state.loading = false;
        state.showAlert = true;
        if (action.payload.ok) {
          state.message = action.payload.message;
        } else {
          state.error = action.payload.error;
        }
      })
      .addCase(updatePayment.rejected, (state, action) => {
        state.error = action.payload.message;
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
      .addCase(updateStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.showAlert = true;
        if (action.payload.ok) {
          state.message = action.payload.success;
        } else {
          state.error = action.payload.message;
        }
      })
      .addCase(updateStatus.rejected, (state, action) => {
        state.showAlert = true;
        state.error = action.payload.message;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.ok) {
          state.services = action.payload.data;
        }
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        if (action.payload.ok) {
          state.message = action.payload.success;
        }
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.error = action.payload.message;
      })
      .addCase(createPaymentUrl.fulfilled, (state, action) => {
        if (action.payload.ok) {
          state.link = action.payload.link;
        }else{
          state.showAlert = true;
          state.error = action.payload.message;
        }
      })
      .addCase(vnpayReturnURL.fulfilled, (state, action) => {
        if (action.payload.ok) {
          state.link = action.payload.data;
        }else{
          state.showAlert = true;
          state.error = action.payload.message;
        }
      });
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
