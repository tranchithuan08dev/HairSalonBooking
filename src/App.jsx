import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Home from "./pages/Dashboard/Home";
import DashBroad from "./pages/Dashboard";
import Service from "./pages/Dashboard/Service";

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
        </Route>
      </Routes>
    </>
  );
}

export default App;
