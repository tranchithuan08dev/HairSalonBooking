import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import stylistProfileReducer from "./stylistSlice/stylistProfileSlice";


const store = configureStore({
  reducer: {
    AUTH: authReducer,
    STYLIST: stylistProfileReducer,
  },
});

export default store;
