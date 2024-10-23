import { combineReducers } from "@reduxjs/toolkit";
import profileStaffReducer from "./profileStaffSlice";
import bookingReducer from "./bookingSlice";
import salaryReducer from "./salarySlice";

const staffReducer = combineReducers({
  profile: profileStaffReducer,
  booking: bookingReducer,
  salary: salaryReducer
});
export default staffReducer;
