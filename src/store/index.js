import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "./profileSlice";


const store = configureStore({
  reducer: {
    Profile: profileSlice
  },
});

export default store;
