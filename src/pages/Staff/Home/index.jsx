import { Outlet } from "react-router-dom";
import HomeContent from "../StaffContent/HomeContent";
function Home() {
  return (
    <>
        <HomeContent />
        <Outlet/>
    </>
  );
}

export default Home;
