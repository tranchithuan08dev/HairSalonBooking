import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const { currentUser, token } = useSelector((state) => state.AUTH);
  console.log(currentUser.record.phoneNumber);
  console.log(token);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light backgroud-header">
        <div className="container container-header mx-auto">
          {/* Left Side */}
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                Contact
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                Feedback
              </a>
            </li>
          </ul>
          {/* Center*/}
          <a className="navbar-brand mx-auto" href="#">
            <h1 className="text-white">Harmony</h1>
          </a>
          {/* Right Side */}
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                Booking
              </a>
            </li>
            <li className="nav-item">
              {!token ? (
                <Link className="nav-link text-white" to="/login">
                  Sign-In
                </Link>
              ) : (
                <a className="nav-link text-white" href="#">
                  {currentUser.record.phoneNumber}
                </a>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Header;
