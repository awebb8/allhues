import Axios from "axios";
import "./auth.css";
import React, { useState, useContext } from "react";
import Modal from "react-modal";
import AuthContext from "../../utils/AuthContext";
import UserContext from "../../utils/UserContext";
import RoleContext from "../../utils/roleContext";
import { useHistory } from "react-router-dom";

Modal.setAppElement("#root");

const Signup = () => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [onboardingRole, setOnboardingRole] = useState("Consumer");
  const [roleCheckBox, setRoleCheckBox] = useState(false);
  const history = useHistory();

  const { setJwt } = useContext(AuthContext);
  const { setId } = useContext(UserContext);
  const { setRole } = useContext(RoleContext);

  // Errors
  const [incompleteError, setIncompleteError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [accountExists, setAccountExists] = useState(false);
  let re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  // handle submit button
  const handleToken = (e, name, userName, email, password, role) => {
    e.preventDefault();
    setIncompleteError(false);
    setEmailError(false);
    setPasswordError(false);
    setAccountExists(false);
    if (!name || !userName || !email || !password) {
      setIncompleteError(true);
    } else if (!re.test(email)) {
      setEmailError(true);
    } else if (password.length < 6) {
      setPasswordError(true);
    } else {
      Axios.post("/register", { name, userName, email, password, role })
        .then((response) => {
          setJwt(response.data.token);
          setId(response.data.user.id);
          setRole(response.data.user.role);

          // TODO: might be able to get rid of this
          localStorage.setItem("role", response.data.user.role);
          localStorage.setItem("token", response.data.token);
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
          setAccountExists(true);
        });
    }
  };

  const handleCloseBtnClick = () => {
    setModalIsOpen(false);
    let path = "/";
    history.push(path);
  };

  const handleRoleCheckBox = () => {
    setRoleCheckBox(!roleCheckBox);
    if (roleCheckBox === true) {
      setOnboardingRole("Consumer");
    } else {
      setOnboardingRole("Content Creator");
    }
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <div>
          <h2>Sign up</h2>
          <hr />
          <form>
            <div className="form-group">
              <label>Name</label>
              <input
                type="name"
                placeholder="First and Last Name"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Username</label>
              <input
                type="username"
                placeholder="Username"
                className="form-control"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                placeholder="Example@email.com"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <input
                type="checkbox"
                onChange={handleRoleCheckBox}
                className="mr-2"
              />
              <label>Content Creator?</label>
            </div>
            <button
              className="buttons"
              type="submit"
              onClick={(e) => {
                handleToken(e, name, userName, email, password, onboardingRole);
              }}
            >
              Sign up
            </button>
            <button
              className="buttons shadow-none py-0 px-2 text-muted"
              onClick={handleCloseBtnClick}
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                color: "black",
                backgroundColor: "white",
              }}
            >
              <h3>&times;</h3>
            </button>
            {incompleteError && (
              <div className="alert alert-danger mt-3" role="alert">
                Please fill out all fields
              </div>
            )}
            {emailError && (
              <div className="alert alert-danger mt-3" role="alert">
                Please enter a valid email address.
              </div>
            )}
            {passwordError && (
              <div className="alert alert-danger mt-3" role="alert">
                Please enter a password that is at least six characters.
              </div>
            )}
            {accountExists && (
              <div className="alert alert-danger mt-3" role="alert">
                An account already exists for the email address you have
                entered.
              </div>
            )}
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Signup;
