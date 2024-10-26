import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import profileService from "../../services/StylistServices/ProfileService";

const initialState = {
    data: {},
    loading: true,
    error: null,
    message: "",
    showAlert: false,
};

const name = "profile";

export const fetchStylist = createAsyncThunk(
  `${name}/fetch`, 
  async (stylistID) => {
      try {
          const response = await profileService.getStylist(stylistID);
          console.log(response);
          return {
              ok: true,
              data: response.data.data.user, 
          };
      } catch (error) {
          return {
              ok: false,
              message: "Error fetching stylist data!",
          };
      }
  }
);

export const updateProfile = createAsyncThunk(
  `${name}/update`, 
  async ({ id, data }) => {
      try {
          const response = await profileService.updateProfile(id, data);
          console.log("data update: ",response);
          return {
              ok: true,
              data: response.data.data.user, 
          };
      } catch (error) {
          return {
              ok: false,
              message: "Cannot update!",
          };
      }
  }
);

const profileSlice = createSlice({
  name,
  initialState,
  reducers: {
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
    .addCase(fetchStylist.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchStylist.fulfilled, (state, action) => {
      state.loading = false; 
      if (action.payload.ok) {
        state.data = { ...state.data, ...action.payload.data };
      }else{
        state.error = action.payload.message;
      }
    })
    .addCase(fetchStylist.rejected, (state, action) => {
      state.loading = false;
      state.showAlert = true;
      state.error = action.payload.message; 
    })
    .addCase(updateProfile.pending, (state) => {
      state.loading = true; 
      state.error = null;
    })
    .addCase(updateProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.showAlert = true; 
      if (action.payload.ok) {
        state.message = "Updated successfully!";
      } else {
        state.error = action.payload.message;
      }
    })
    .addCase(updateProfile.rejected, (state, action) => {
      state.loading = false;
      state.showAlert = true;
      state.error = action.payload.message;
    })
  },
});

export const { 
  setData, 
  setLoading, 
  setError, 
  setMessage, 
  setShowAlert 
} = profileSlice.actions;

export default profileSlice.reducer;