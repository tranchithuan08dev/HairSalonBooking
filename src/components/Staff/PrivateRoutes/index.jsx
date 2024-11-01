import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";

function PrivateRoutesStaff() {
    const { token, currentUser } = useSelector((state) => state.AUTH);
    const location = useLocation();

    const storedToken = token || localStorage.getItem("ACCESS_TOKKEN");

    let storedUser = currentUser;

    if (location.pathname === "/staff/bookingDetail" && !storedUser) {
        const savedUser = sessionStorage.getItem("currentUser");
        try {
            storedUser = savedUser ? JSON.parse(savedUser) : null;
        } catch (error) {
            console.error("Error parsing currentUser from sessionStorage:", error);
            storedUser = null; 
        }
    }

    const isLogin = !!storedToken;
    const isStaff = storedUser?.record.role === "Staff";

    return isLogin && isStaff ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutesStaff;
