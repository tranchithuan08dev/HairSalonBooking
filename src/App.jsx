import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./components/Staff/PrivateRoutes";
import Layout from "./components/Staff/StaffLayout";
import Home from "./pages/Staff/Home";
import BookingDetail from "./pages/Staff/BookingDetail";
import Profile from "./pages/Staff/Profile";
import Salary from "./pages/Staff/Salary";
// import HomePage from "./pages/HomePage";
import CreateBooking from "./pages/Staff/CreateBooking";
// import BookingPage from "./pages/BookingPage";

function App() {
  return (
    <>
      <Routes>
        {/* client */}
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage />}/>

        {/* staff */}
        <Route path="/staff/" element={<PrivateRoutes />}>
          <Route element={<Layout />}>
            <Route path="home/" element={<Home />} />
            <Route path="home/bookingDetail/:id" element={<BookingDetail />} />
            <Route path="createBooking" element={<CreateBooking />} />
            <Route path="profile" element={<Profile />} />
            <Route path="salary" element={<Salary />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
