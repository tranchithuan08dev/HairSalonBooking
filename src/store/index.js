import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import staffReducer from "./staffSlice/index";

const store = configureStore({
  reducer: {
    AUTH: authReducer,
    STAFF: staffReducer
  },
});

export default store;
