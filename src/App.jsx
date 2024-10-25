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
import PrivateRoutesStylist from "./components/Stylist/PrivateRoutes";
import StylistLayout from "./components/Stylist/StylistLayout";
import StylistWorkShift from "./pages/Stylist/Workshift";
import StylistProfile from "./pages/Stylist/Profile";
import StylistSalary from "./pages/Stylist/Salary";
import StylistBookingDetail from "./pages/Stylist/BookingDetail";
import StylistCreateStylistWorkshift from "./pages/Stylist/CreateStylistWorkshift";

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

        <Route path="/stylist/" element={<PrivateRoutesStylist />}>
          <Route element={<StylistLayout />}>
            <Route index element={<StylistWorkShift />} />
            <Route path="profile" element={<StylistProfile />} />
            <Route path="salary" element={<StylistSalary />} />
            <Route path="bookingDetail" element={<StylistBookingDetail />} />
            <Route path="createStylistWorkshift" element={<StylistCreateStylistWorkshift />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
