import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./components/Staff/PrivateRoutes";
import Layout from "./components/Staff/StaffLayout";
import Home from "./pages/Staff/Home";
import BookingDetail from "./pages/Staff/BookingDetail";
import Profile from "./pages/Staff/Profile";
import Salary from "./pages/Staff/Salary";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import { useDispatch } from "react-redux";
import { fetchMe } from "./store/authSlice";
import { useEffect } from "react";
import RegisterPage from "./pages/RegisterPage";
import ForgotPassword from "./pages/Login/ForgotPassword";
import ResetPassword from "./pages/Login/ResetPassword";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMe());
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/staff/" element={<PrivateRoutes />}>
          <Route element={<Layout />}>
            <Route path="home/" element={<Home />} /> 
            <Route path="home/bookingDetail" element={<BookingDetail />} />
            <Route path="profile" element={<Profile />} />
            <Route path="salary" element={<Salary />} />
          </Route>
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
