import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import salaryService from "../../services/StylistServices/SalaryService";

const initialState = {
    data: {},
    loading: true,
    error: null
};

const name = "salary";

export const fetchData = createAsyncThunk(
  `${name}/fetchData`, 
  async ({userID, stylistID}) => {
      try {
          const responseBooking = await salaryService.countBookings();
          const matchingBookings = responseBooking.data.bookings.filter(
            (booking) => booking.stylistID === stylistID
          )
          const responseSalary = await salaryService.getTotalSalaryUntilNow(userID);
          return {
              ok: true,
              count: matchingBookings.length,
              salary: responseSalary.data.data
          };
      } catch (error) {
          return {
              ok: false,
              message: "Fetch data error!",
          };
      }
  }
);

const salarySlice = createSlice({
  name,
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload; 
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchData.pending, (state) => {
        state.loading = true;
    })
    .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        if(action.payload.ok){
            state.data = {
                count: action.payload.count,
                salary: action.payload.salary,
              };
        }else{
            state.error = action.payload.message;
        }
    })
    .addCase(fetchData.rejected, (state, action) => {
        state.showAlert = true;
        state.error = action.payload.message;
    })
  },
});

export const {setLoading, setError} = salarySlice.actions;
export default salarySlice.reducer; 