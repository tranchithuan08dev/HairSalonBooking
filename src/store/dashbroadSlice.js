import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import dashboardService from "../services/dashboardService";
import { mappingService, mappingStaff, mappingStylist } from "../helpers";

const name = "posts";
const initialState = {
  //Service
  postService: [],
  postServiceById: {},
  updateService: null,
  //Staff
  postStaff: [],
  postStaffDetailById: {},
  updateStaff: null,
  //Stylist
  postStylist: [],
  postStylistDetailById: [],
  updateStylist: null,
};

//Service'
export const fetchPostService = createAsyncThunk(
  `${name}/fetchPostService`,
  async () => {
    const res = await dashboardService.getAllService();
    const dataService = res.data.userList.map(mappingService);
    return dataService;
  }
);

export const fetchPostServiceById = createAsyncThunk(
  `${name}/fetchPostServiceById`,
  async (id) => {
    const res = await dashboardService.getServiceById(id);
    const dataServiceId = res.data.service;
    console.log(dataServiceId);
    return dataServiceId;
  }
);

export const fetchUpdateService = createAsyncThunk(
  `${name}/fetchUpdateService`,
  async (inputParam = {}) => {
    const res = await dashboardService.updateService(inputParam);
    return res.data;
  }
);
//Staff
export const fetchPostStaff = createAsyncThunk(
  `${name}/fetchPostStaff`,
  async () => {
    const res = await dashboardService.getAllStaff();
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

export const fetchUpdateStaff = createAsyncThunk(
  `${name}/fetchUpdateStaff`,
  async (inputParams = {}) => {
    const res = await dashboardService.updateStaff(inputParams);
    return res.data;
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
    return res.data;
  }
);

const dashboardSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Service
    builder.addCase(fetchPostService.fulfilled, (state, action) => {
      state.postService = action.payload;
    });
    builder.addCase(fetchPostServiceById.fulfilled, (state, action) => {
      state.postServiceById = action.payload;
    });
    builder.addCase(fetchUpdateService.fulfilled, (state, action) => {
      state.updateService = action.payload;
    });
    //Staff
    builder.addCase(fetchPostStaff.fulfilled, (state, action) => {
      state.postStaff = action.payload;
    });
    builder.addCase(fetchPostStaffDetailById.fulfilled, (state, action) => {
      state.postStaffDetailById = action.payload;
    });
    builder.addCase(fetchUpdateStaff.fulfilled, (state, action) => {
      state.updateStaff = action.payload;
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
