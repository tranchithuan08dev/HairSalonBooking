import { configureStore } from "@reduxjs/toolkit";
import profileStaffSlice from "./profileStaffSlice";


const store = configureStore({
  reducer: {
    StaffProfile: profileStaffSlice
  },
});

export default store;
