import React from "react";
// import AuthContext from "../../utils/AuthContext";
import { Link, useHistory } from "react-router-dom";

const Logout = () => {
  const history = useHistory();

  const handleClick = () => {
    localStorage.removeItem("token");
    // localStorage.setItem("token", "");
    localStorage.removeItem("role");
    // localStorage.setItem("role", "");
    // localStorage.clear();

    history.push("/");
    window.location.reload();
  };

  return (
    <>
      <Link to="/" onClick={handleClick}>
        Logout
      </Link>
    </>
  );
};

export default Logout;
