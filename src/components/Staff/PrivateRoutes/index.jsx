import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRoutes() {
    const { token, currentUser } = useSelector((state) => state.AUTH);
    

    const isLogin = !!token;
    const isStaff = currentUser?.record.role === "Staff";
    console.log(isStaff);

    return isLogin && isStaff ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;