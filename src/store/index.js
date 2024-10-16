import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./staffSlice/profileStaffSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    AUTH: authReducer,
    STAFF: profileReducer
  },
});

export default store;
