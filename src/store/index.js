import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import profileSlice from "./profileSlice";


const store = configureStore({
  reducer: {
    AUTH: authReducer,
    Profile: profileSlice
  },
});

export default store;
