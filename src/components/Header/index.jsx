import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const { currentUser, token } = useSelector((state) => state.AUTH);

  const handleLogout = () => {
    localStorage.removeItem("ACCESS_TOKKEN");
    window.location.reload();
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light backgroud-header">
        <div className="container container-header mx-auto">
          {/* Left Side */}
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link to="/contact" className="nav-link text-white">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                Feedback
              </a>
            </li>
          </ul>
          {/* Center*/}
          <Link to="/" className="navbar-brand mx-auto">
            <h1 className="text-white">Harmony</h1>
          </Link>
          {/* Right Side */}
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link to="/booking" className="nav-link text-white">
                Booking
              </Link>
            </li>
            <li className="nav-item">
              {!token ? (
                <Link className="nav-link text-white" to="/login">
                  Sign-In
                </Link>
              ) : (
                <div className="dropdown">
                  {/* Dropdown toggle button */}
                  <button
                    className="btn nav-link dropdown-toggle text-white name"
                    type="button"
                    id="userDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {currentUser.actorByRole.fullName}
                  </button>

                  {/* Dropdown menu */}
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="userDropdown"
                  >
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/settings">
                        Settings
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" onClick={handleLogout}>
                        Log out
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Header;
