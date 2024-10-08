import { Outlet, Navigate } from "react-router-dom";

function PrivateRoutes() {
    const isLogin = true;
    const isStaff = true;
    return (
        <>
            {isLogin && isStaff ? (<Outlet/>) : (<Navigate to ="/login"/>)}
        </>
    )
}

export default PrivateRoutes;