import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dashboardService from "../services/dashboardService";
import { mappingService, mappingStylist } from "../helpers";

const name = "home";
const initialState = {
  // Stylist
  stylist: [],
  service: [],
  news: [],
  //contact
  message: "",
  error: "",
  showAlert: false,
  // feedback
  data: []
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

export const fetchAllFeedback = createAsyncThunk(
  `${name}/fetchAllFeedback`,
  async () => {
    try {
      const response = await dashboardService.getAllFeedback();
      const feedbacks = response.data.feedbacks;
      console.log(feedbacks);
      const bookingPromises = feedbacks.map(async (feedback) => {
        const bookingResponse = await dashboardService.getBookingDetail(feedback.bookingID);
        const bookingArray = bookingResponse.data.booking[0];
        const {guestID} = bookingArray;
        const details = bookingResponse.data.details;
        const servicesNameArray = await Promise.all(
          details
            .filter((detail) => !detail.deleted) 
            .map(async (detail) => {
              const service = await dashboardService.getServiceById(detail.serviceID);
              return service.data.service.serviceName;
            })
        );
        return {
          ...feedback,
          guestID: guestID,
          services: servicesNameArray,
        };
      });
      const mergedFeedbacks = await Promise.all(bookingPromises);
      console.log(mergedFeedbacks); 

      return {
        ok: true,
        data: mergedFeedbacks,
      };
    } catch (error) {
      return {
        ok: false,
        message: "Fetch data error!",
      };
    }
  }
);

export const sendEmail = createAsyncThunk(`${name}/sendEmail`, async (data) => {
  try {
    await dashboardService.sendEmail(data);
    return {
      ok: true,
      success: "Send email successfully",
    };
  } catch (error) {
    return {
      ok: false,
      message: "Send email unsuccessfully!",
    };
  }
});

const homeSlice = createSlice({
  name,
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload; 
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setShowAlert: (state) => {
      state.showAlert = !state.showAlert; 
    },
  },
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
    builder.addCase(fetchAllFeedback.fulfilled, (state, action) => {
      if (action.payload.ok) {
        state.data = action.payload.data;
      } else {
        state.error = action.payload.message;
      }
    });
    builder.addCase(sendEmail.fulfilled, (state, action) => {
      state.showAlert = true;
      if (action.payload.ok) {
        state.message = action.payload.success;
      } else {
        state.error = action.payload.message;
      }
    })
  },
});

export const { setError, setMessage, setShowAlert } = homeSlice.actions;

export default homeSlice.reducer;
