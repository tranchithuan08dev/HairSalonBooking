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
          <ul className="navbar-nav me-auto" style={{ marginLeft: "-40px" }}>
            <li className="nav-item">
              <Link to="/aboutUs" className="nav-link text-white">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/feedback" className="nav-link text-white">
                Feedback
              </Link>
            </li>
          </ul>
          {/* Center*/}
          <Link to="/" className="navbar-brand ">
            <div
              style={{
                marginRight: !token ? "90px" : undefined,
                marginLeft: token ? "100px" : undefined,
              }}
            >
              <h1 className="text-white text-center">Harmony</h1>
            </div>
          </Link>
          {/* Right Side */}
          <ul className={`navbar-nav ${!token ? "" : "mx-auto"}`}>
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
                      <Link className="dropdown-item" to="/bookingHistory">
                        History
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/changePassword">
                        Change Password
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
