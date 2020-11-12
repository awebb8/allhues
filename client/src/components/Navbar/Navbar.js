import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
// import AuthContext from "../../utils/AuthContext";
// import RoleContext from "../../utils/roleContext";
import Logout from "../Authentication/Logout";
// import API from "../../utils/API";

const Navbar = () => {
  // const [state, setState] = useState({
  //   token: "",
  // });
  // const { id, setId } = useContext(UserContext);
  // const { roleContext, setRoleContext } = useContext(RoleContext);
  // const { jwt, setJwt } = useContext(AuthContext);
  // useEffect(() => {
  //   API.allUsers().then((res) => {
  //     console.log(res.data.role);
  //     setRoleContext(res.data.role);
  //   });
  // }, []);

  //   const determineIfTokenInStorage = () => {
  //     if (localStorage.getItem("token")) {
  //       setState({ token: localStorage.getItem("token") });
  //     }
  //   };
  //   determineIfTokenInStorage();

  if (localStorage.getItem("token") == null) {
    return (
      <nav className="navbar navbar-expand-lg navbar-light">
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
    <nav className="navbar navbar-expand-lg sticky-top">
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
              ViewAll<span className="sr-only">(current)</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/upload" className="nav-link">
              Upload
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/portal" className="nav-link">
              Portal
            </Link>
          </li>
          <li className="nav-item">
            <div className="nav-link">
              <Logout />
            </div>
          </li>
          {/* <li className="nav-item">
            <Link to="/signup" className="nav-link">
              Signup
            </Link>
          </li> */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
