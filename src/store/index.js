import { configureStore } from "@reduxjs/toolkit";
import dashbroadSlice from "./dashbroadSlice";

import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    DASHBOARD: dashbroadSlice,
    AUTH: authReducer,
  },
});

export default store;
