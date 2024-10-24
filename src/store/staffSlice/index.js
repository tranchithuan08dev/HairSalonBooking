import { combineReducers } from "@reduxjs/toolkit";
import profileStaffReducer from "./profileStaffSlice";
import bookingReducer from "./bookingSlice";
import salaryReducer from "./salarySlice";
import updateWorkshift from "./updateWorkshift";

const staffReducer = combineReducers({
  profile: profileStaffReducer,
  booking: bookingReducer,
  salary: salaryReducer,
  updateWorkshift: updateWorkshift
});
export default staffReducer;
