import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import dashboardService from "../services/dashboardService";
import { mappingStaff, mappingStylist } from "../helpers";

const name = "posts";
const initialState = {
  //Staff
  postStaff: [],
  postStaffDetailById: {},
  //Stylist
  postStylist: [],
  postStylistDetailById: [],
  updateStylist: null,
};

//Staff
export const fetchPostStaff = createAsyncThunk(
  `${name}/fetchPostStaff`,
  async () => {
    const res = await dashboardService.getAllSatff();
    const dataStaff = res.data.data.users.map(mappingStaff);
    return dataStaff;
  }
);

export const fetchPostStaffDetailById = createAsyncThunk(
  `${name}/fetchPostStaffDetailById`,
  async (id) => {
    const res = await dashboardService.getDetailStaffById(id);
    const dataStaffId = res.data.data.user;
    return dataStaffId;
  }
);
//Stylist
export const fetchPostStylist = createAsyncThunk(
  `${name}/fetchAllStylist`,
  async () => {
    const res = await dashboardService.getAllStylist();
    const data = res.data.data.users.map(mappingStylist);
    return data;
  }
);

export const fetchPostStylistDetailById = createAsyncThunk(
  `${name}/fetchPostStylistDetailById`,
  async (stylistID) => {
    const res = await dashboardService.getDetailStylistById(stylistID);
    const datastylistId = res.data.data.user;
    return datastylistId;
  }
);

export const fetchUpdateStylist = createAsyncThunk(
  `${name}/fetchUpdateStylist`,
  async (inputParams = {}) => {
    const res = await dashboardService.updateStylist(inputParams);
    console.log(res);
    return res.data;
  }
);

const dashboardSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPostStaff.fulfilled, (state, action) => {
      state.postStaff = action.payload;
    });
    builder.addCase(fetchPostStaffDetailById.fulfilled, (state, action) => {
      state.postStaffDetailById = action.payload;
    });
    //Stylist
    builder.addCase(fetchPostStylist.fulfilled, (state, action) => {
      state.postStylist = action.payload;
    });
    builder.addCase(fetchPostStylistDetailById.fulfilled, (state, action) => {
      state.postStylistDetailById = action.payload;
    });
    builder.addCase(fetchUpdateStylist.fulfilled, (state, action) => {
      state.updateStylist = action.payload;
    });
  },
});

export default dashboardSlice.reducer;
