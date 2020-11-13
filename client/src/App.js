import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthContext from "./utils/AuthContext";
import UserContext from "./utils/UserContext";
import RoleContext from "./utils/roleContext";
import NameContext from "./utils/NameContext";
import Home from "./pages/Home";
import ContentCreatorUpload from "./pages/ContentCreatorUpload";
import ContentCreatorPortal from "./pages/ContentCreatorPortal";
import ConsumerViewAll from "./pages/ConsumerViewAll";
import ConsumerViewOne from "./pages/ConsumerViewOne";

import Navbar from "./components/Navbar/Navbar";
import FavoritesPage from "./pages/FavoritesPage";
import Footer from "./components/Footer/Footer";
import Signup from "./components/Authentication/Signup";
import Login from "./components/Authentication/Login";
import JsonWebToken from "jsonwebtoken";

// import { setAxiosDefault } from "./utils/axiosDefaults";

function App() {
  const [jwt, setJwt] = useState("");
  const [id, setId] = useState("");
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  // const { setRoleContext } = useContext(RoleContext);

  useEffect(() => {
    const localJwt = localStorage.getItem("token");
    const roleForCurrentUser = localStorage.getItem("role");
    // setName(localStorage.getItem("name"));
    const nameOfUser = localStorage.getItem("name");
    if (nameOfUser) {
      setName(nameOfUser);
    }
    if (roleForCurrentUser) {
      setRole(roleForCurrentUser);
    }
    if (localJwt) {
      setJwt(localJwt);
      try {
        const decoded = JsonWebToken.decode(localJwt, process.env.JWT_SECRET);
        // console.log(decoded);
        setId(decoded.id);

        // API.getUser().then((res) => {
        //   console.log(res.data.role);
        //   setRole(res.data.role);
        // });
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
  //   if (role) {
  //     // setAxiosDefault(jwt);
  //     localStorage.setItem("role", role);
  //   }
  // }, [role]);

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
            <NameContext.Provider value={{ name, setName }}>
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
                    path="/portal/:id"
                    component={ContentCreatorPortal}
                  ></Route>
                  <Route
                    exact
                    path="/viewall"
                    component={ConsumerViewAll}
                  ></Route>
                  {/* <Route exact path="/viewone" component={ConsumerViewOne}></Route> */}
                  <Route
                    path="/viewone/:id"
                    component={ConsumerViewOne}
                  ></Route>
                  <Route
                    path="/viewall/:id"
                    component={ConsumerViewAll}
                  ></Route>
                  <Route exact path="/signup" component={Signup}></Route>
                  <Route exact path="/login" component={Login}></Route>
                </Switch>
                <Footer />
              </Router>
            </NameContext.Provider>
          </RoleContext.Provider>
        </UserContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
