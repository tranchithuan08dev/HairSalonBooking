import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
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
import PrivateRoutesStylist from "./components/Stylist/PrivateRoutes";
import StylistLayout from "./components/Stylist/StylistLayout";
import StylistWorkShift from "./pages/Stylist/Workshift";
import StylistProfile from "./pages/Stylist/Profile";
import StylistSalary from "./pages/Stylist/Salary";
import StylistBookingDetail from "./pages/Stylist/BookingDetail";
import StylistCreateStylistWorkshift from "./pages/Stylist/CreateStylistWorkshift";
import NewService from "./pages/Dashboard/NewService";
import NewStylist from "./pages/Dashboard/NewStylist";
import NewStaff from "./pages/Dashboard/NewStaff";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import StylistDetailPage from "./pages/StylistDetailPage";
import ProfilePage from "./pages/ProfilePage";
import News from "./pages/Dashboard/News";
import NewsDetail from "./pages/NewsDetail";
import CreateNews from "./pages/Dashboard/CreateNews";
import BookingSuccessPage from "./pages/BookingSuccessPage";
import UpdateBooking from "./pages/UpdateBooking";
import BookingHistory from "./pages/BookingHistory";
import AboutUsPage from "./pages/AboutUsPage";
import PrivateRoutesStaff from "./components/Staff/PrivateRoutes";
import LayoutStaff from "./components/Staff/StaffLayout";
import HomeStaff from "./pages/Staff/Home";
import BookingDetailStaff from "./pages/Staff/BookingDetail";
import ProfileStaff from "./pages/Staff/Profile";
import SalaryStaff from "./pages/Staff/Salary";
import RemoveStylistWorkshift from "./pages/Staff/RemoveStylistWorkshift";
import FeedbackPage from "./pages/FeedbackPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import FeedBack from "./pages/FeedBack";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMe());
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/aboutUs" element={<AboutUsPage />} />
        <Route path="/service/:id" element={<ServiceDetailPage />} />
        <Route path="/stylist/:id" element={<StylistDetailPage />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/bookingsuccess" element={<BookingSuccessPage />} />
        <Route path="/updateBooking" element={<UpdateBooking />} />
        <Route path="/bookingHistory" element={<BookingHistory />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/rating" element={<FeedBack />} />
        <Route path="/changePassword" element={<ChangePasswordPage />} />
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
          <Route path="/dashboard/newStaff" element={<NewStaff />} />
          <Route path="/dashboard/createNews" element={<CreateNews />} />
          <Route path="/dashboard/newStylist" element={<NewStylist />} />
          <Route path="/dashboard/news" element={<News />} />
        </Route>
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
            <Route
              path="createStylistWorkshift"
              element={<StylistCreateStylistWorkshift />}
            />
          </Route>
        </Route>

        <Route path="/staff/" element={<PrivateRoutesStaff />}>
          <Route element={<LayoutStaff />}>
            <Route index element={<HomeStaff />} />
            <Route path="bookingDetail" element={<BookingDetailStaff />} />
            <Route path="profile" element={<ProfileStaff />} />
            <Route path="salary" element={<SalaryStaff />} />
            <Route
              path="removeStylistWorkshift"
              element={<RemoveStylistWorkshift />}
            />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
