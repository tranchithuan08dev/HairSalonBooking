import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRoutes() {
  const { token, currentUser } = useSelector((state) => state.AUTH);
  console.log("currentUser:", currentUser);
  console.log("Role:", currentUser?.record.role);
  console.log("Token:", token);

  const isLogin = !!token;
  const isStaff = currentUser?.record.role === "Staff";

  return <>{isLogin && isStaff ? <Outlet /> : <Navigate to="/login" />}</>;
}

export default PrivateRoutes;
