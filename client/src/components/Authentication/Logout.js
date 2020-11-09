import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../utils/AuthContext";
import { Link, useHistory } from "react-router-dom";

const Logout = () => {
  const [jwtContext, setJwtContext] = useState({
    jwt: "",
  });
  const history = useHistory();
  const { jwt, setJwt } = useContext(AuthContext);

  //   useEffect(() => {
  //     localStorage.clear();
  //     setJwt({ ...jwt, jwt: "" });
  //   }, []);
  const handleClick = () => {
    localStorage.removeItem("token");
    // setJwtContext({ jwt: "", setJwt: () => {} });
    window.location.reload();
    // history.push("/");
  };

  return (
    <>
      <Link to='/' onClick={handleClick}>Logout</Link>
    </>
  );
};

export default Logout;
