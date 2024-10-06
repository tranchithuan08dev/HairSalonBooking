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
    console.log("res", res);
    // Simulate an API call or fetch request here
    // Example: return await fetch('/login', { method: 'POST', body: JSON.stringify(params) });

    return {
      ok: true,
      data: {
        token: "example-token",
        currenInfor: {
          name: "John Doe",
          email: "john@example.com",
        },
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
        console.log("action", action.payload.ok);

        state.token = action.payload.data.token;
        localStorage.setItem("ACCESS_TOKEN", state.token); // Correct typo from ACCESS_TOKKEN
        state.currentUser = action.payload.data.currenInfor;
        console.log(" state.currentUser", state.currentUser);
      }
    });
  },
});

export default authSlice.reducer;
