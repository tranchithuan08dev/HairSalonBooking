import { configureStore } from "@reduxjs/toolkit";
import dashbroadSlice from "./dashbroadSlice";

const store = configureStore({
  reducer: {
    DASHBOARD: dashbroadSlice,
  },
});

export default store;
