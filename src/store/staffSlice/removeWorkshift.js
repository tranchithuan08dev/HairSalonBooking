import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import removeWorkshiftServices from "../../services/staffServices/removeStylistWorkshiftService";

const initialState = {
  data: {},
  error: null,
  message: "",
  showAlert: false,
};

const name = "removeWorkshift";

export const getAll = createAsyncThunk(`${name}/getAll`, async (id) => {
  try {
    const response = await removeWorkshiftServices.getAll(id);
    console.log(response.data.data);
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

export const updateStatus = createAsyncThunk(
  `${name}/updateStatus`,
  async (data) => {
    try {
      await removeWorkshiftServices.updateStatus(data);
      return {
        ok: true,
        success: "Updated successfully!",
      };
    } catch (error) {
      return {
        ok: false,
        message: "Cannot update!",
      };
    }
  }
);

const removeWorkshiftSlice = createSlice({
  name,
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = { ...state.data, ...action.payload };
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
      .addCase(getAll.pending, (state) => {
        state.error = null;
      })
      .addCase(getAll.fulfilled, (state, action) => {
        if (action.payload.ok) {
          state.data = action.payload.data;
        } else {
          state.error = action.payload.message;
        }
      })
      .addCase(getAll.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateStatus.pending, (state) => {
        state.error = null;
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        state.showAlert = true;
        if (action.payload.ok) {
          state.message = action.payload.success;
        } else {
          state.error = action.payload.message;
        }
      })
      .addCase(updateStatus.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { setData, setError, setMessage, setShowAlert } =
removeWorkshiftSlice.actions;

export default removeWorkshiftSlice.reducer;
