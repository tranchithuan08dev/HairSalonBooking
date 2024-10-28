import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import workshiftService from "../../services/StylistServices/WorkshiftService";

const initialState = {
  data: [],
  duplicated: [],
  loading: true,
  error: null,
};

const name = "workshift";

export const getAll = createAsyncThunk(`${name}/getAll`, async (id) => {
  try {
    console.log("Fetching workshift details...");
    const response = await workshiftService.getAllDetailByID(id);
    const responseData = response.data.data;
    console.log("Response Data:", responseData);

    console.log("Fetching bookings...");
    const bookingResponse = await workshiftService.getAllBooking();
    const bookings = bookingResponse.data.bookings;
    console.log("Bookings:", bookings);

    const mergedData = responseData.map((shift) => {
      const matchingBooking = bookings.find(
        (booking) => booking.stylistWorkShiftID === shift.stylistWorkShiftID
      );
      return matchingBooking
        ? { ...shift, bookingID: matchingBooking.bookingID }
        : shift;
    });

    console.log("Merged Data:", mergedData);

    console.log("Fetching schedule...");
    const scheduleWorkshift = await workshiftService.getAllByStylistID(id);
    const schedule = scheduleWorkshift.data.data;

    const finalData = schedule.map((sched) => {
      const matchingShift = mergedData.find(
        (shift) => shift.stylistWorkShiftID === sched.stylistWorkShiftID
      );
    
      return matchingShift
        ? { ...sched, ...matchingShift } 
        : sched; 
    });

    console.log("Final Merged Data:", finalData);

    return {
      ok: true,
      data: finalData,
    };
  } catch (error) {
    console.error("Error occurred:", error);
    return {
      ok: false,
      message: "Workshift is empty",
    };
  }
});


export const fetchAllWorkshift = createAsyncThunk(`${name}/fetchAllWorkshift`, async (id) => {
  try {
    const response = await workshiftService.getAllWorkshift();
    const responseStylistWorkshift = await workshiftService.getAllByStylistID(id);
    console.log("allworkshift", response.data.data);
    console.log("stylistworkshift", responseStylistWorkshift.data.data);

    let stylistWorkshiftIDs = [];

    if (responseStylistWorkshift && responseStylistWorkshift.data?.data) {
      stylistWorkshiftIDs = responseStylistWorkshift.data.data.map(s => s.workShiftID);
    }
    console.log(stylistWorkshiftIDs);

    return {
      ok: true,
      data: response.data,
      duplicateWorkshiftIDs: stylistWorkshiftIDs 
    };
  } catch (error) {
    return {
      ok: false,
      message: "Cannot get all!",
    };
  }
});

export const createStylistWorkshift = createAsyncThunk(`${name}/create`, async (data) => {
  try {
    const response = await workshiftService.createWorkshift(data);
    console.log(response.data);
    return {
      ok: true,
      data: response.data,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Cannot create!",
    };
  }
});


const stylistWorkshiftSlice = createSlice({
  name,
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.ok) {
          state.data = action.payload.data;
        } else {
          state.error = action.payload.message; 
        }
      })
      .addCase(getAll.rejected, (state, action) => {
        state.loading = false;
        state.showAlert = true;
        state.error = action.payload.message; 
      })
      .addCase(createStylistWorkshift.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createStylistWorkshift.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.ok) {
          state.data = action.payload.data;
        } else {
          state.error = action.payload.message; 
        }
      })
      .addCase(createStylistWorkshift.rejected, (state, action) => {
        state.loading = false;
        state.showAlert = true;
        state.error = action.payload.message; 
      })
      .addCase(fetchAllWorkshift.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllWorkshift.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.ok) {
          state.data = action.payload.data;
          state.duplicated = action.payload.duplicateWorkshiftIDs;
        } else {
          state.error = action.payload.message; 
        }
      })
      .addCase(fetchAllWorkshift.rejected, (state, action) => {
        state.loading = false;
        state.showAlert = true;
        state.error = action.payload.message; 
      });
  },
});

export default stylistWorkshiftSlice.reducer;
