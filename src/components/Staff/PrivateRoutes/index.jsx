import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRoutes() {
    // const { token, currentInfor } = useSelector((state) => state.auth);

    // const isLogin = !!token || !!localStorage.getItem("ACCESS_TOKEN");
    const isLogin = true;

    // const isStaff = currentInfor?.role === "Staff";
    const isStaff = true;

    return isLogin && isStaff ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;