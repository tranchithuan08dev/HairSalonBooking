import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Home from "./pages/Dashboard/Home";
import DashBroad from "./pages/Dashboard";

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
        </Route>
      </Routes>
    </>
  );
}

export default App;
