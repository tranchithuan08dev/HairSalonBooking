import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dashboardService from "../services/dashboardService";
import { mappingService, mappingStylist } from "../helpers";

const name = "home";
const initialState = {
  // Stylist
  stylist: [],
  service: [],
  news: [],
};

export const fetchHomeNews = createAsyncThunk(
  `${name}/fetchHomeNews`,
  async (inputParam = {}) => {
    const res = await dashboardService.getAllNews(inputParam);
    return res.data.data;
  }
);

export const fetchHomeStylist = createAsyncThunk(
  `${name}/fetchHomeStylist`,
  async (inputParam = {}) => {
    const res = await dashboardService.getAllStylist(inputParam);
    const data = res.data.data.users.map(mappingStylist);
    return data;
  }
);

export const fetchHomeService = createAsyncThunk(
  `${name}/fetchHomeService`,
  async (inputParam = {}) => {
    const res = await dashboardService.getAllService(inputParam);
    const dataService = res.data.services.map(mappingService);
    return dataService;
  }
);

const homeSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHomeNews.fulfilled, (state, action) => {
      state.news = action.payload;
    });
    builder.addCase(fetchHomeStylist.fulfilled, (state, action) => {
      state.stylist = action.payload;
    });
    builder.addCase(fetchHomeService.fulfilled, (state, action) => {
      state.service = action.payload;
    });
  },
});

export default homeSlice.reducer;
