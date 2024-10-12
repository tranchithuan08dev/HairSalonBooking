import { NavLink } from "react-router-dom";
import "../../../assets/scss/sidebar.scss";

function Sidebar(props) {
  const { id } = props; 
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
              <NavLink to={`/staff/${id}/home`} className={navLinkActive}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to={`/staff/${id}/profile`} className={navLinkActive}>
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink to={`/staff/${id}/salary`} className={navLinkActive}>
                Salary
              </NavLink>
            </li>
            <li>
              <NavLink to={`/staff/${id}/createBooking`} className={navLinkActive}>
                Create Booking
              </NavLink>
            </li>
          </ul>
          <div className="sidebar__menu--logout">
            <NavLink to="/logout" className={navLinkActive}>
              Logout
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
