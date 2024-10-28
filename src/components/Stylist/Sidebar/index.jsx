import { NavLink } from "react-router-dom";
import "../../../assets/scss/sidebar.scss";

function Sidebar() {
  const navLinkActive = (e) => {
    return e.isActive ? "sidebar__menu__li__link sidebar__menu__li__link--active" : "sidebar__menu__li__link";
  };

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
              <NavLink to={`/stylist`} className={navLinkActive} end>
                Workshift
              </NavLink>
            </li>
            <li>
              <NavLink to={`/stylist/profile`} className={navLinkActive}>
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink to={`/stylist/salary`} className={navLinkActive}>
                Salary
              </NavLink>
            </li>
            <li>
              <NavLink to={`/stylist/createStylistWorkshift`} className={navLinkActive}>
                Choose Workshift Schedule
              </NavLink>
            </li>
          </ul>
          <div className="sidebar__menu--logout">
            <NavLink to="/" className={navLinkActive}>
              Logout
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;