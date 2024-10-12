import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRoutes() {
    // const { token, currentInfor } = useSelector((state) => state.auth);
    // const isLogin = !!token;
    const isLogin = true; 

    const isStaff = true;
    // const isStaff = currentInfor?.role ==== "Staff" ; 
    return (
        <>
            {isLogin && isStaff ? <Outlet /> : <Navigate to="/login" />}
        </>
    );
}

export default PrivateRoutes;