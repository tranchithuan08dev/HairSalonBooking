import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./components/Staff/PrivateRoutes";
import Layout from "./components/Staff/StaffLayout";
import Home from "./pages/Staff/Home";
import BookingDetail from "./pages/Staff/BookingDetail";
import Profile from "./pages/Staff/Profile";
import Salary from "./pages/Staff/Salary";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/staff/" element={<PrivateRoutes />}>
          <Route element={<Layout />}>
            <Route path="home/" element={<Home />} /> 
            <Route path="home/bookingDetail/:id" element={<BookingDetail />} />
            <Route path="profile" element={<Profile />} />
            <Route path="salary" element={<Salary />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
