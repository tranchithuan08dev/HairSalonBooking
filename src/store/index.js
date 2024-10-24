import { configureStore } from "@reduxjs/toolkit";
import dashbroadSlice from "./dashbroadSlice";
import homeSlice from "./homeSlice";
import authReducer from "./authSlice";
import staffReducer from "./staffSlice/index";

const store = configureStore({
  reducer: {
    DASHBOARD: dashbroadSlice,
    AUTH: authReducer,
    STAFF: staffReducer,
    HOME: homeSlice,
  },
});

export default store;
