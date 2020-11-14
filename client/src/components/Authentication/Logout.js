import React from "react";
// import AuthContext from "../../utils/AuthContext";
import { Link, useHistory } from "react-router-dom";

const Logout = () => {
  // const [jwtContext, setJwtContext] = useState({
  // jwt: "",
  // });
  const history = useHistory();
  // const { jwt, setJwt } = useContext(AuthContext);

  //   useEffect(() => {
  //     localStorage.clear();
  //     setJwt({ ...jwt, jwt: "" });
  //   }, []);
  const handleClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    // setJwtContext({ jwt: "", setJwt: () => {} });
    history.push("/");
    window.location.reload();
    // history.push("/");
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
