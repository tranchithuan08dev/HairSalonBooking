import { combineReducers } from 'redux';
import profileSlice from './ProfileSlice';
import workshiftReducer from './WorkShiftSlice';
import bookingReducer from "./BookingDetailSlice";
import salaryReducer from './SalarySlice';

const stylistReducer = combineReducers({
    profile: profileSlice,
    workshift: workshiftReducer,
    bookingDetail: bookingReducer,
    salary: salaryReducer
});

export default stylistReducer;
