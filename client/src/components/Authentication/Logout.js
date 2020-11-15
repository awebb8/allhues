import React from "react";
// import AuthContext from "../../utils/AuthContext";
import { Link, useHistory } from "react-router-dom";

const Logout = () => {
  const history = useHistory();

  const handleClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

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
