import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

import RoleContext from "../../utils/roleContext";
import Logout from "../Authentication/Logout";
import UserContext from "../../utils/UserContext";

const Navbar = () => {
  const { role } = useContext(RoleContext);
  const { id } = useContext(UserContext);

  if (role === "Consumer") {
    return (
      <nav className="navbar navbar-expand-lg navbar-light sticky-top">
        <Link to="/" className="navbar-brand">
          AllHues
        </Link>
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
              <Link to="/viewall" className="nav-link">
                View Kits<span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/videos" className="nav-link">
                Video Guides<span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/favorites" className="nav-link">
                Favorites<span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <a href={`/portal/${id}`} className="nav-link">
                Profile<span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <div className="nav-link">
                <Logout />
              </div>
            </li>
          </ul>
        </div>
        {/* <div className="navbar-right">
          <img src={usersPicture} style={{width: 40, height: 40, borderRadius: 100}}/> {usersName}
        </div> */}
      </nav>
    );
  }

  if (localStorage.getItem("token") == null) {
    return (
      <nav className="navbar navbar-expand-lg navbar-light sticky-top">
        <Link to="/" className="navbar-brand">
          AllHues
        </Link>
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
              <Link to="/viewall" className="nav-link">
                View Kits<span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/videos" className="nav-link">
                Video Guides<span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="nav-link">
                Signup
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light sticky-top">
      <Link to="/" className="navbar-brand">
        AllHues
      </Link>
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
            <Link to="/viewall" className="nav-link">
              View Kits<span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/videos" className="nav-link">
              Video Guides<span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/favorites" className="nav-link">
              Favorites<span className="sr-only">(current)</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/upload" className="nav-link">
              Upload
            </Link>
          </li>
          <li className="nav-item">
            <a href={`/portal/${id}`} className="nav-link">
              Profile<span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <div className="nav-link">
              <Logout />
            </div>
          </li>
        </ul>
      </div>
      {/* <div className="navbar-right">
          <img src={usersPicture} style={{width: 40, height: 'auto', borderRadius: 100}}/> {usersName}
        </div> */}
    </nav>
  );
};

export default Navbar;
