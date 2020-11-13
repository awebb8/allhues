import React from "react";
const NameContext = React.createContext({
  name: "",
  // id: "",
  setName: () => {},
});

export default NameContext;
