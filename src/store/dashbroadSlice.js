import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import dashboardService from "../services/dashboardService";
import {
  mappingCustomer,
  mappingService,
  mappingStaff,
  mappingStylist,
} from "../helpers";
import authService from "../services/authService";

const name = "posts";
const initialState = {
  //create and slary and update salary staff and stylist
  salary: null,
  createStaff: null,
  //News
  postNews: [],
  postNewsDetailId: {},
  updateNews: null,
  //Manager
  postManagerById: {},
  updateManager: null,
  //Customer
  postCustomer: [],
  postCustomerById: {},
  updateCustomer: null,
  //Service
  postService: [],
  postServiceById: {},
  updateService: null,
  createService: null,
  //Staff
  postStaff: [],
  postStaffDetailById: {},
  updateStaff: null,
  //Stylist
  postStylist: [],
  postStylistDetailById: [],
  updateStylist: null,
};
//create and slary and update salary staff and stylist
export const fetchCreate = createAsyncThunk(
  `${name}/fetchCreate`,
  async (data) => {
    try {
      const res = await dashboardService.createStaff(data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchSalary = createAsyncThunk(
  `${name}/fetchSalary`,
  async (id) => {
    try {
      const res = await dashboardService.getSalary(id);
      console.log("salary", res);

      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);
// NEWS
export const fetchPostNews = createAsyncThunk(
  `${name}/fetchPostNews`,
  async (inputParam = {}) => {
    try {
      const res = await dashboardService.getAllNews(inputParam);
      console.log("res", res);
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchPostNewsByID = createAsyncThunk(
  `${name}/fetchPostNewsByID`,
  async (inputParam = {}) => {
    try {
      const res = await dashboardService.getDetailNews(inputParam);
      console.log("res", res);
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchUpdateNews = createAsyncThunk(
  `${name}/fetchUpdateNews`,
  async (data) => {
    try {
      const res = await dashboardService.updateNews(data);
      console.log("res", res);
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);
//Manager
export const fetchPostManagerById = createAsyncThunk(
  `${name}/fetchPostById`,
  async () => {
    try {
      let token = localStorage.getItem("ACCESS_TOKKEN");
      const currentUser = await authService.fetchWithMe(token);
      const managerId = currentUser.data.actorByRole.managerID;
      const res = await dashboardService.getDetailManagerById(managerId);
      const dataManagerId = res.data.data;
      return dataManagerId;
    } catch (error) {
      console.error("Error fetching manager:", error);
    }
  }
);

export const fetchUpdateManager = createAsyncThunk(
  `${name}/fetchUpdateManager`,
  async (data) => {
    try {
      const res = await dashboardService.updateManager(data);
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);
// Customer
export const fetchPostCustomer = createAsyncThunk(
  `${name}/fetchPostCustomer`,
  async () => {
    const res = await dashboardService.getAllCustomer();
    const dataCustomer = res.data.customerList.map(mappingCustomer);
    return dataCustomer;
  }
);

export const fetchPostCustomerById = createAsyncThunk(
  `${name}/fetchPostCustomerById`,
  async (id) => {
    const res = await dashboardService.getDetailCustomerById(id);
    const dataCustomerId = res.data.data;
    return dataCustomerId;
  }
);

export const fetchUpdateCustomer = createAsyncThunk(
  `${name}/fetchUpdateCustomer`,
  async (inputParam = {}) => {
    const res = await dashboardService.updateCustomer(inputParam);
    return res.data;
  }
);

//Service'
export const fetchPostService = createAsyncThunk(
  `${name}/fetchPostService`,
  async () => {
    const res = await dashboardService.getAllService();
    const dataService = res.data.services.map(mappingService);
    return dataService;
  }
);

export const fetchPostServiceById = createAsyncThunk(
  `${name}/fetchPostServiceById`,
  async (id) => {
    const res = await dashboardService.getServiceById(id);
    const dataServiceId = res.data.service;
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

export const fetchCreateService = createAsyncThunk(
  `${name}/fetchCreateService`,
  async (formData) => {
    const res = await dashboardService.createService(formData);
    console.log(res);
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
  async (inputParam = {}) => {
    const res = await dashboardService.getAllStylist(inputParam);
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
    //create and slary and update salary staff and stylist
    builder.addCase(fetchSalary.fulfilled, (state, action) => {
      state.salary = action.payload;
    });
    //News
    builder.addCase(fetchPostNews.fulfilled, (state, action) => {
      state.postNews = action.payload;
    });
    builder.addCase(fetchPostNewsByID.fulfilled, (state, action) => {
      state.postNewsDetailId = action.payload;
    });
    //Manager
    builder.addCase(fetchPostManagerById.fulfilled, (state, action) => {
      state.postManagerById = action.payload;
    });

    builder.addCase(fetchUpdateManager.fulfilled, (state, action) => {
      state.updateManager = action.payload;
    });
    //Customer
    builder.addCase(fetchPostCustomer.fulfilled, (state, action) => {
      state.postCustomer = action.payload;
    });
    builder.addCase(fetchPostCustomerById.fulfilled, (state, action) => {
      state.postCustomerById = action.payload;
    });
    builder.addCase(fetchUpdateCustomer.fulfilled, (state, action) => {
      state.updateCustomer = action.payload;
    });

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
    builder.addCase(fetchCreateService.fulfilled, (state, action) => {
      state.createService = action.payload;
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
