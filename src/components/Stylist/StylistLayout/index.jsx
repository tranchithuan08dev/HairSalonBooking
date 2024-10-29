import { Outlet } from "react-router-dom";
import Sidebar from '../Sidebar';

function Layout() {
    return (
        <>
            <div className="layout-default" style={{display: "flex"}}>
                <div className="layout-default__sidebar" style={{width: "280px"}}>
                    <Sidebar/> 
                </div>
                <div className="layout-default__main" style={{width: "1449px", overflowY: 'hidden', overflowX: 'hidden'}}>
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default Layout;
