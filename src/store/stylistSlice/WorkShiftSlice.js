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
    const response = await workshiftService.getAllByStylistID(id);
    return {
      ok: true,
      data: response.data.data,
    };
  } catch (error) {
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
        state.error = action.payload.message; 
      });
  },
});

export default stylistWorkshiftSlice.reducer;
