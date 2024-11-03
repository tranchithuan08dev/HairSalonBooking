import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";

const initialState = {
  token: null,
  currentUser: null,
  sendEmail: null,
  resetPassword: null,
  changePassword: null,
};

const name = "auth";

export const Login = createAsyncThunk(`${name}/Login`, async (params = {}) => {
  try {
    console.log(params);
    const res = await authService.login(params);
    console.log(res);
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

export const Register = createAsyncThunk(
  `${name}/Register`,
  async (params = {}) => {
    try {
      console.log(params);

      const response = await authService.register(params);
      const res = await authService.login({
        phoneNumber: params.phoneNumber,
        password: params.password,
      });
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
        message: "Registration failed!",
      };
    }
  }
);

export const fetchMe = createAsyncThunk(`${name}/fetchMe`, async (token) => {
  try {
    if (!token) token = localStorage.getItem("ACCESS_TOKKEN");
    console.log(token);
    const currentUser = await authService.fetchWithMe(token);
    console.log(currentUser);
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

export const fetchResetPassWord = createAsyncThunk(
  `${name}/fetchResetPassWord`,
  async (data) => {
    try {
      const res = await authService.resetPassword(data);
      const dataOTP = res.data;
      return {
        ok: true,
        data: {
          dataOTP,
        },
      };
    } catch (error) {
      return {
        ok: false,
        message: "Failed to  OTP",
      };
    }
  }
);

export const fetchChangePassword = createAsyncThunk(
  `${name}/fetchChangePassword`,
  async (data) => {
    try {
      const res = await authService.changePassword(data);
      console.log("res", res);

      const dataChangePassword = res.data;
      return {
        ok: true,
        data: {
          dataChangePassword,
        },
      };
    } catch (error) {
      return {
        ok: false,
        message: "Failed to  change password",
      };
    }
  }
);

const authSlice = createSlice({
  name,
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(Login.fulfilled, (state, action) => {
      if (action.payload.ok) {
        state.token = action.payload.data.token;
        localStorage.setItem("ACCESS_TOKKEN", state.token);
        state.currentUser = action.payload.data.currenInfor;
      }
    });
    builder.addCase(Register.fulfilled, (state, action) => {
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
    builder.addCase(fetchResetPassWord.fulfilled, (state, action) => {
      if (action.payload.ok) {
        state.resetPassword = action.payload.data.dataOTP;
      }
    });

    builder.addCase(fetchChangePassword.fulfilled, (state, action) => {
      if (action.payload.ok) {
        state.changePassword = action.payload.data.dataChangePassword;
      }
    });
  },
});

export default authSlice.reducer;
