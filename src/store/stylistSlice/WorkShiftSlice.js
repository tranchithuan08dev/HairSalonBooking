import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import workshiftService from "../../services/StylistServices/WorkshiftService";

const initialState = {
  data: [],
  loading: true,
  error: null,
};

const name = "workshift";

export const getAll = createAsyncThunk(`${name}/getAll`, async (id) => {
  try {
    const response = await workshiftService.getAll(id);
    return {
      ok: true,
      data: response.data.data,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Cannot get all workshift for this stylist!",
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
        state.error = action.error.message; 
      });
  },
});

export default stylistWorkshiftSlice.reducer;
