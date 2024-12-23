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
  link: "",
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

      let data = response.data.booking[0];
      console.log("dataBoooking", data);

      let customerPoint;
      if (data.customerID != null) {
        const customer = await bookingService.getCustomer(data.customerID);
        customerPoint = customer.data.data.customer.loyaltyPoints;
      }
      let detail = response.data.details;
      console.log("Detail", detail);

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
      data.loyaltyPoints = customerPoint;
      return {
        ok: true,
        data: data,
        detail: detail,
        servicesName: servicesNameArray,
        stylistName: stylistName,
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
      console.log("Data update booking: ", response.data);
      return {
        ok: true,
        data: response.data,
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

export const createPayment = createAsyncThunk(
  `${name}/createPayment`,
  async (data) => {
    try{
      const response = await bookingService.createPayment(data);
      console.log(response.data);
      return {
        ok: true,
        message: "Created payment successfully!"
      };
    }catch(error){
      return {
        ok: false,
        error: "Payment was created!",
      };
    }
  }
)

export const updateStatus = createAsyncThunk(
  `${name}/updateStatus`,
  async (data) => {
    try {
      const response = await bookingService.updateStatus(data);
      console.log("Data update: ", response);
      return {
        ok: true,
        message: "Updated successfully!"
      };
    } catch (error) {
      return {
        ok: false,
        error: "Cannot update status!",
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
        message: "Cannot update customer!",
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
      .addCase(fetchBookingDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookingDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.showAlert = true;
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
        state.showAlert = true;
        console.log("payment", action.payload); 
        if(action.payload.ok){
          state.message = action.payload.message;
        }else{
          state.error = action.payload.error;
        }
      })
      .addCase(updateBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.showAlert = true;
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
        if (action.payload.ok) {
          state.message = action.payload.message;
        } else {
          state.error = action.payload.error;
        }
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
