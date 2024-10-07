import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";

const initialState = {
  token: null,
  currentUser: null,
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
      message: "Thông tin đăng nhập của bạn không đúng!",
    };
  }
});

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
  },
});

export default authSlice.reducer;
