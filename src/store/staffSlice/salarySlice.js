import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import salaryService from "../../services/staffServices/salaryStaffService";

const initialState = {
  data: {},
  loading: true,
  error: null,
};

const name = "salary";

export const fetchData = createAsyncThunk(
  `${name}/fetchData`,
  async (id) => {
    try {
      const responseSalary = await salaryService.getTotalSalary(id);
      console.log("return", responseSalary.data.salary[0]);
      return {
        ok: true,
        salary: responseSalary.data.salary[0],
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
        if (action.payload.ok) {
          state.data = action.payload.salary;
        } else {
          state.error = action.payload.message;
        }
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.error = action.payload.message;
      });
  },
});

export const { setLoading, setError } = salarySlice.actions;
export default salarySlice.reducer;
