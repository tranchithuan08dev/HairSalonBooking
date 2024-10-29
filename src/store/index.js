import { configureStore } from "@reduxjs/toolkit";
import dashbroadSlice from "./dashbroadSlice";
import homeSlice from "./homeSlice";
import authReducer from "./authSlice";
import bookingSlice from "./bookingSlice";
import stylistReducer from "./stylistSlice";
import staffReducer from "./staffSlice/index";

const store = configureStore({
  reducer: {
    DASHBOARD: dashbroadSlice,
    AUTH: authReducer,
    STYLIST: stylistReducer,
    HOME: homeSlice,
    BOOKING: bookingSlice,
    STAFF: staffReducer,
  },
});

export default store;
