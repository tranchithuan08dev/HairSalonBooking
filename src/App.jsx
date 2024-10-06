import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Home from "./pages/Dashboard/Home";
import DashBroad from "./pages/Dashboard";
import Service from "./pages/Dashboard/Service";
import Stylist from "./pages/Dashboard/Stylist";
import Staff from "./pages/Dashboard/Staff";
import User from "./pages/Dashboard/User";
import Profile from "./pages/Dashboard/Profile";

function App() {
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
          <Route path="/dashboard/user" element={<User />} />
          <Route path="/dashboard/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
