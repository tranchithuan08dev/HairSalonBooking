import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Home from "./pages/Dashboard/Home";
import DashBroad from "./pages/Dashboard";
import Service from "./pages/Dashboard/Service";
import Stylist from "./pages/Dashboard/Stylist";
import Staff from "./pages/Dashboard/Staff";
import User from "./pages/Dashboard/User";
import Profile from "./pages/Dashboard/Profile";
import LoginPage from "./pages/Login/LoginPage";
import { useDispatch } from "react-redux";
import { fetchMe } from "./store/authSlice";
import { useEffect } from "react";
import RegisterPage from "./pages/RegisterPage";
import ForgotPassword from "./pages/Login/ForgotPassword";
import ResetPassword from "./pages/Login/ResetPassword";
import NewService from "./pages/Dashboard/NewService";
import NewStylist from "./pages/Dashboard/NewStylist";
import NewStaff from "./pages/Dashboard/NewStaff";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMe());
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route element={<DashBroad />}>
          <Route
            path="/dashboard"
            element={<Navigate to="/dashboard/home" />}
          />
          <Route path="/dashboard/home" element={<Home />} />
          <Route path="/dashboard/service" element={<Service />} />
          <Route path="/dashboard/stylist" element={<Stylist />} />
          <Route path="/dashboard/staff" element={<Staff />} />
          <Route path="/dashboard/newService" element={<NewService />} />
          <Route path="/dashboard/user" element={<User />} />
          <Route path="/dashboard/newStylist" element={<NewStylist />} />
          <Route path="/dashboard/newStaff" element={<NewStaff />} />
          <Route path="/dashboard/profile" element={<Profile />} />
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
