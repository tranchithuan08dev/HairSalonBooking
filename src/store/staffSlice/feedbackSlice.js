import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import feedbackServices from "../../services/staffServices/feedbackServices";

const initialState = {
  data: {},
  loading: true,
  message: null,
  error: null,
  showAlert: false,
};

const name = "feedback";

export const getAllFeedback = createAsyncThunk(
  `${name}/getAllFeedback`,
  async () => {
    try {
      const response = await feedbackServices.getAllFeedback();
      console.log("return", response.data);
      if (!response) {
        return {
          ok: true,
          data: [],
        };
      }
      return {
        ok: true,
        data: response.data,
      };
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.warn("Feedback not found, returning empty array.");
        return {
          ok: true,
          data: [],
        };
      }
      return {
        ok: false,
        message: "Fetch data error!",
      };
    }
  }
);

export const createFeedback = createAsyncThunk(
  `${name}/createFeedback`,
  async (data) => {
    try {
      const response = await feedbackServices.createFeedback(data);
      console.log("return", response.data);
      return {
        ok: true,
        message: "Send Feedback successfully!",
      };
    } catch (error) {
      return {
        ok: false,
        error: "Fetch data error!",
      };
    }
  }
);

const feedbackSlice = createSlice({
  name,
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setShowAlert: (state) => {
      state.showAlert = !state.showAlert;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllFeedback.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.ok) {
        state.data = action.payload.data;
      } else {
        state.error = action.payload.message;
      }
    })
    .addCase(createFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.showAlert = true;
        if (action.payload.ok) {
          state.message = action.payload.message;
        } else {
          state.error = action.payload.error;
        }
      });
  },
});

export const { setShowAlert, setError, setMessage } = feedbackSlice.actions;
export default feedbackSlice.reducer;
