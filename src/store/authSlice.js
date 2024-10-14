import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";

const initialState = {
  token: null,
  currentUser: null,
  sendEmail: null,
};

const name = "auth";

export const Login = createAsyncThunk(`${name}/Login`, async (params = {}) => {
  try {
    const res = await authService.login(params);
    const token = res.data.records.accessToken;
    const currentUser = await authService.fetchWithMe(token);
    const currenInfor = currentUser.data;

    return {
      ok: true,
      data: {
        token,
        currenInfor,
      },
    };
  } catch (error) {
    return {
      ok: false,
      message: "Your login information is incorrect!",
    };
  }
});

export const fetchMe = createAsyncThunk(`${name}/fetchMe`, async (token) => {
  try {
    if (!token) token = localStorage.getItem("ACCESS_TOKKEN");
    const currentUser = await authService.fetchWithMe(token);
    const currenInfor = currentUser.data;
    return {
      ok: true,
      data: {
        token,
        currenInfor,
      },
    };
  } catch (error) {
    localStorage.removeItem("ACCESS_TOKKEN");
    return {
      ok: false,
    };
  }
});
export const fetchEmail = createAsyncThunk(
  `${name}/fetchEmail`,
  async (email) => {
    try {
      const res = await authService.sendEmail(email);
      const dataEmail = res.data;
      return {
        ok: true,
        data: {
          dataEmail,
        },
      };
    } catch (error) {
      return {
        ok: false,
        message: "Failed to send email.",
      };
    }
  }
);

const authSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(Login.fulfilled, (state, action) => {
      if (action.payload.ok) {
        state.token = action.payload.data.token;
        localStorage.setItem("ACCESS_TOKKEN", state.token);
        state.currentUser = action.payload.data.currenInfor;
      }
    });
    builder.addCase(fetchMe.fulfilled, (state, action) => {
      if (action.payload.ok) {
        state.token = action.payload.data.token;
        state.currentUser = action.payload.data.currenInfor;
      }
    });
    builder.addCase(fetchEmail.fulfilled, (state, action) => {
      if (action.payload.ok) {
        state.sendEmail = action.payload.data.dataEmail;
      }
    });
  },
});

export default authSlice.reducer;
