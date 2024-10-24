import { NavLink } from "react-router-dom";
import "../../../assets/scss/sidebar.scss";

function Sidebar() {
  const navLinkActive = (e) => {
    return e.isActive ? "sidebar__menu__li__link sidebar__menu__li__link--active" : "sidebar__menu__li__link";
  };
  const handleLogout =() =>{
    console.log("before");
    let item = localStorage.removeItem("ACCESS_TOKKEN");
    console.log(item);
    console.log("after");

  }
  return (
    <>
      <div className="sidebar">
        <div className="sidebar__nameBrand">
          <span>Hair Harmony</span>
        </div>
        <hr />
        <div className="sidebar__menu">
          <ul>
            <li>
              <NavLink to={`/staff`} className={navLinkActive} end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to={`/staff/profile`} className={navLinkActive}>
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink to={`/staff/salary`} className={navLinkActive}>
                Salary
              </NavLink>
            </li>
            <li>
              <NavLink to={`/staff/updateStylistWorkshift`} className={navLinkActive}>
                Update Stylist Workshift
              </NavLink>
            </li>
          </ul>
          <div className="sidebar__menu--logout">
            <NavLink to="/" className={navLinkActive} onClick={handleLogout}>
              Logout
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
