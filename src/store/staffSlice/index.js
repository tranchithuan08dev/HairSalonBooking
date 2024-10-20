import { combineReducers } from "@reduxjs/toolkit";
import profileStaffReducer from "./profileStaffSlice";
import bookingReducer from "./bookingSlice";

const staffReducer = combineReducers({
  profile: profileStaffReducer,
  booking: bookingReducer
});
export default staffReducer;
