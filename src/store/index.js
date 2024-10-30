import { configureStore } from "@reduxjs/toolkit";
import dashbroadSlice from "./dashbroadSlice";
import homeSlice from "./homeSlice";
import authReducer from "./authSlice";
import stylistReducer from "./stylistSlice/index";
import bookingSlice from "./bookingSlice";
import staffReducer from "./staffSlice/index";

const store = configureStore({
  reducer: {
    DASHBOARD: dashbroadSlice,
    AUTH: authReducer,
    HOME: homeSlice,
    BOOKING: bookingSlice,
    STAFF: staffReducer,
    STYLIST: stylistReducer
  },
});

export default store;
