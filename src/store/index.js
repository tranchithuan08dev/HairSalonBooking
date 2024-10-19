import { configureStore } from "@reduxjs/toolkit";
import dashbroadSlice from "./dashbroadSlice";
import homeSlice from "./homeSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    DASHBOARD: dashbroadSlice,
    AUTH: authReducer,
    HOME: homeSlice,
  },
});

export default store;
