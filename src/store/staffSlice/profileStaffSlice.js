import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import profileStaffService from "../../services/staffServices/profileStaffService";

const initialState = {
    data: {},
    loading: true,
    error: null,
    message: "",
    showAlert: false,
};

const name = "staffProfile";

export const fetchStaff = createAsyncThunk(
  `${name}/fetch`, 
  async (staffID) => {
      try {
          const response = await profileStaffService.getStaff(staffID);
          console.log(response);
          return {
              ok: true,
              data: response.data.data.user, 
          };
      } catch (error) {
          return {
              ok: false,
              message: "Error fetching staff data!",
          };
      }
  }
);

export const updateProfile = createAsyncThunk(
  `${name}/update`, 
  async ({ id, data }) => {
      try {
          const response = await profileStaffService.updateProfile(id, data);
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

const profileStaffSlice = createSlice({
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
    .addCase(fetchStaff.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchStaff.fulfilled, (state, action) => {
      state.loading = false; 
      if (action.payload.ok) {
        state.data = { ...state.data, ...action.payload.data };
      }
    })
    .addCase(updateProfile.pending, (state) => {
      state.loading = true; 
      state.error = null;
    })
    .addCase(updateProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.showAlert = true; 
      if (action.payload.ok) {
        for (const key in action.payload.data) {
          if (state.data[key] !== action.payload.data[key]) {
            state.data[key] = action.payload.data[key];
          }
        }
        state.message = "Profile updated successfully!";
      } else {
        state.error = "Cannot update!"; 
      }
    })
  },
});

export const { setData, setLoading, setError, setMessage, setShowAlert } = profileStaffSlice.actions;
export default profileStaffSlice.reducer; 