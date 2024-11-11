// import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRoutes() {
  //   const { token, currentUser } = useSelector((state) => state.AUTH);
  //   const isLogin = !!token;
  //   const isStaff = currentUser?.record.role === "Staff";
  //   return <>{isLogin && isStaff ? <Outlet /> : <Navigate to="/login" />}</>;
  return (
    <>
      <Outlet />
    </>
  );
}

export default PrivateRoutes;
