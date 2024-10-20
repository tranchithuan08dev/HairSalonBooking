import { combineReducers } from 'redux';
import profileSlice from './ProfileSlice';
import workshiftReducer from './WorkShiftSlice';
import bookingReducer from "./BookingDetailSlice";

const stylistReducer = combineReducers({
    profile: profileSlice,
    workshift: workshiftReducer,
    bookingDetail: bookingReducer
});

export default stylistReducer;
