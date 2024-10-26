import { combineReducers } from "@reduxjs/toolkit";
import profileStaffReducer from "./profileStaffSlice";
import bookingReducer from "./bookingSlice";
import salaryReducer from "./salarySlice";
import removeWorkshift from "./removeWorkshift";

const staffReducer = combineReducers({
  profile: profileStaffReducer,
  booking: bookingReducer,
  salary: salaryReducer,
  removeWorkshift: removeWorkshift
});
export default staffReducer;
