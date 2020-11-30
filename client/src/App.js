import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthContext from "./utils/AuthContext";
import UserContext from "./utils/UserContext";
import RoleContext from "./utils/roleContext";
import Home from "./pages/Home";
import ContentCreatorUpload from "./pages/ContentCreatorUpload";
import ContentCreatorPortal from "./pages/ContentCreatorPortal";
import ConsumerViewAll from "./pages/ConsumerViewAll";
import ConsumerViewOne from "./pages/ConsumerViewOne";
import ViewAllVideos from "./pages/ViewAllVideos";
import Navbar from "./components/Navbar/Navbar";
import FavoritesPage from "./pages/FavoritesPage";
import Signup from "./components/Authentication/Signup";
import Login from "./components/Authentication/Login";
import JsonWebToken from "jsonwebtoken";

function App() {
  const [jwt, setJwt] = useState("");
  const [id, setId] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const localJwt = localStorage.getItem("token");
    const roleForCurrentUser = localStorage.getItem("role");

    if (roleForCurrentUser) {
      setRole(roleForCurrentUser);
    }
    if (localJwt) {
      setJwt(localJwt);
      try {
        const decoded = JsonWebToken.decode(localJwt, process.env.JWT_SECRET);

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
                  path="/portal/:id"
                  component={ContentCreatorPortal}
                ></Route>
                <Route
                  exact
                  path="/viewall"
                  component={ConsumerViewAll}
                ></Route>
                <Route exact path="/videos" component={ViewAllVideos}></Route>
<<<<<<< HEAD
=======

>>>>>>> 89558053e36cc7a0658dda14217ff8233f102240
                {/* <Route exact path="/viewone" component={ConsumerViewOne}></Route> */}
                <Route path="/viewone/:id" component={ConsumerViewOne}></Route>
                {/* <Route path="/viewone/:id" component={Favo/}></Route> */}
                <Route path="/viewall/:id" component={ConsumerViewAll}></Route>
                <Route exact path="/signup" component={Signup}></Route>
                <Route exact path="/login" component={Login}></Route>
                <Route
                  exact
                  path="/favorites"
                  component={FavoritesPage}
                ></Route>
              </Switch>
              {/* <Footer /> */}
            </Router>
          </RoleContext.Provider>
        </UserContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
