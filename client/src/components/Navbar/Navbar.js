import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import "./navbar.css";

import RoleContext from "../../utils/roleContext";
import Logout from "../Authentication/Logout";
import UserContext from "../../utils/UserContext";

const Navbar = () => {
  const { role } = useContext(RoleContext);
  const { id } = useContext(UserContext);

  if (localStorage.getItem("token") == null) {
    return (
      <nav className="navbar navbar-expand-lg navbar-light sticky-top py-3">
      <div>
        <Link
          to="/"
          className="navbar-brand"
          style={{ letterSpacing: "8px", color: "white" }}
        >
          AllHues
        </Link>
      </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
            <NavLink
              to="/viewall"
              className="nav-link"
              activeClassName="nav-link-active"
              style={{ letterSpacing: "0.5px" }}
            >
              View Kits
            </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
          <li className="nav-item">
              <Link to="/login" className="nav-link" style={{ letterSpacing: "0.5px" }}>
                Login
              </Link>
            </li>

          </ul>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light sticky-top py-3">
      <div>
        <Link
          to="/"
          className="navbar-brand"
          style={{ letterSpacing: "8px", color: "white" }}
        >
          AllHues
        </Link>
      </div>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink
              to="/viewall"
              className="nav-link"
              activeClassName="nav-link-active"
              style={{ letterSpacing: "0.5px" }}
            >
              View Kits
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/favorites"
              className="nav-link"
              style={{ letterSpacing: "0.5px" }}
              activeClassName="nav-link-active"
            >
              Favorites
            </NavLink>
          </li>

          {role === "Consumer" ? (
            ""
          ) : (
            <li className="nav-item">
              <NavLink
                to="/upload"
                className="nav-link"
                activeClassName="nav-link-active"
                style={{ letterSpacing: "0.5px" }}
              >
                Upload
              </NavLink>
            </li>
          )}

        </ul>

        <ul className="navbar-nav ml-auto">
        <li className="nav-item">
            <NavLink
              to={`/portal/${id}`}
              className="nav-link"
              activeClassName="nav-link-active"
              style={{ letterSpacing: "0.5px" }}
              onClick={() => window.location.href=`/portal/${id}`}
            >
              Profile
            </NavLink>
          </li>
          <li className="nav-item">
            <div className="nav-link">
              <Logout />
            </div>
          </li>
        </ul>
      </div>

    </nav>
  );
};

export default Navbar;
