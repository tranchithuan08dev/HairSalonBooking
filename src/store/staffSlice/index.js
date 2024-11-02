import { combineReducers } from "@reduxjs/toolkit";
import profileStaffReducer from "./profileStaffSlice";
import bookingReducer from "./bookingSlice";
import salaryReducer from "./salarySlice";
import removeWorkshift from "./removeWorkshift";
import feedbackReducer from "./feedbackSlice";

const staffReducer = combineReducers({
  profile: profileStaffReducer,
  booking: bookingReducer,
  salary: salaryReducer,
  removeWorkshift: removeWorkshift,
  feedback: feedbackReducer
});
export default staffReducer;
