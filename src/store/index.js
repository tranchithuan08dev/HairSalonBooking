import { configureStore } from "@reduxjs/toolkit";
import profileStaffSlice from "./profileStaffSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    AUTH: authReducer,
    StaffProfile: profileStaffSlice
  },
});

export default store;
