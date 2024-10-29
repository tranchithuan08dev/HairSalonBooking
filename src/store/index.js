import { configureStore } from "@reduxjs/toolkit";
import dashbroadSlice from "./dashbroadSlice";
import homeSlice from "./homeSlice";
import authReducer from "./authSlice";
import bookingSlice from "./bookingSlice";
import stylistReducer from "./stylistSlice";

const store = configureStore({
  reducer: {
    DASHBOARD: dashbroadSlice,
    AUTH: authReducer,
    STYLIST: stylistReducer,
    HOME: homeSlice,
    BOOKING: bookingSlice,
  },
});

export default store;
