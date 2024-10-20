import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
// import BookingPage from "./pages/BookingPage";
import LoginPage from "./pages/Login/LoginPage";
import { useDispatch } from "react-redux";
import { fetchMe } from "./store/authSlice";
import { useEffect } from "react";
import RegisterPage from "./pages/RegisterPage";
import ForgotPassword from "./pages/Login/ForgotPassword";
import ResetPassword from "./pages/Login/ResetPassword";
import PrivateRoutes from "./components/Stylist/PrivateRoutes";
import StylistLayout from "./components/Stylist/StylistLayout";
import WorkShift from "./pages/Stylist/Workshift";
import Profile from "./pages/Stylist/Profile";
import Salary from "./pages/Stylist/Salary";
import BookingDetail from "./pages/Stylist/BookingDetail";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMe());
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />

        <Route path="/stylist/" element={<PrivateRoutes />}>
          <Route element={<StylistLayout />}>
            <Route index element={<WorkShift />} />
            <Route path="profile" element={<Profile />} />
            <Route path="salary" element={<Salary />} />
            <Route path="bookingDetail" element={<BookingDetail />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
