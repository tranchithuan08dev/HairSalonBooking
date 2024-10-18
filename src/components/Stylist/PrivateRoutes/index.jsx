import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";


function PrivateRoutes() {
    const { token, currentUser } = useSelector((state) => state.AUTH);
    const isLogin = !!token
    const isStylist = currentUser?.record.role === "Stylist" ; 
    return (
        <>
            {isLogin && isStylist ? <Outlet /> : <Navigate to="/login" />}
        </>
    );
}

export default PrivateRoutes;