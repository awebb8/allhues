import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthContext from "./utils/AuthContext";
import UserContext from "./utils/UserContext";
import Home from "./pages/Home";
import ContentCreatorUpload from "./pages/ContentCreatorUpload";
import ContentCreatorPortal from "./pages/ContentCreatorPortal";
import ConsumerViewAll from "./pages/ConsumerViewAll";
import ConsumerViewOne from "./pages/ConsumerViewOne";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Signup from "./components/Authentication/Signup";
import Login from "./components/Authentication/Login";
// import API from "./utils/API";
// import Axios from "axios";
import JsonWebToken from "jsonwebtoken";
import RoleContext from "./utils/roleContext";
// import { setAxiosDefault } from "./utils/axiosDefaults";

function App() {
  const [jwt, setJwt] = useState("");
  const [id, setId] = useState("");
  const [role, setRole] = useState("");
  // const { setRoleContext } = useContext(RoleContext);

  useEffect(() => {
    // API.getUser().then((res) => {
    //   console.log(res.data.role);
    //   setRoleContext(res.data.role);
    // });
    const localJwt = localStorage.getItem("token");
    if (localJwt) {
      setJwt(localJwt);
      try {
        const decoded = JsonWebToken.decode(localJwt, process.env.JWT_SECRET);
        // console.log(decoded);
        setId(decoded.id);
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  useEffect(() => {
    if (jwt) {
      // setAxiosDefault(jwt);
      localStorage.setItem("token", jwt);
    }
  }, [jwt]);

  // useEffect(() => {
  //   Axios.get("/api/users").then((res) => {
  //     console.log(res.data);
  //   });
  // });
  return (
    <div>
      <AuthContext.Provider value={{ jwt, setJwt }}>
        <UserContext.Provider value={{ id, setId }}>
          <RoleContext.Provider value={{ role, setRole }}>
            <Router>
              <Navbar />
              <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route
                  exact
                  path="/upload"
                  component={ContentCreatorUpload}
                ></Route>
                <Route
                  exact
                  path="/portal"
                  component={ContentCreatorPortal}
                ></Route>
                <Route
                  exact
                  path="/viewall"
                  component={ConsumerViewAll}
                ></Route>
                {/* <Route exact path="/viewone" component={ConsumerViewOne}></Route> */}
                <Route path="/viewall/:id" component={ConsumerViewOne}></Route>
                <Route exact path="/signup" component={Signup}></Route>
                <Route exact path="/login" component={Login}></Route>
              </Switch>
              <Footer />
            </Router>
          </RoleContext.Provider>
        </UserContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
