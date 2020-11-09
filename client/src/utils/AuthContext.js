import React from "react";
const AuthContext = React.createContext({
  jwt: "",
  // id: "",
  setJwt: () => {},
});

export default AuthContext;
