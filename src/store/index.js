import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import stylistReducer from "./stylistSlice";


const store = configureStore({
  reducer: {
    AUTH: authReducer,
    STYLIST: stylistReducer,
  },
});

export default store;
