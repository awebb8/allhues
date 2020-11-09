import Axios from "axios";
import "./auth.css";

import React, { useState, useContext } from "react";
import Modal from "react-modal";
import AuthContext from "../../utils/AuthContext";
import { useHistory } from "react-router-dom";
import Home from "../../pages/Home";

Modal.setAppElement("#root");

const Signup = () => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const history = useHistory();

  const { jwt, setJwt } = useContext(AuthContext);

  //   const handleChange = ()=>{

  //   }

  const handleToken = (e, name, email, password) => {
    e.preventDefault();
    Axios.post("/register", { name, email, password })
      .then((response) => {
        // console.log(name, email, password);
        console.log(response.data);
        setJwt(response.data.token);
        localStorage.setItem("token", response.data.token);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCloseBtnClick = () => {
    setModalIsOpen(false);
    let path = "/";
    history.push(path);
  };

  return (
    <div>
      <button className="buttons" onClick={() => setModalIsOpen(true)}>
        Open modal
      </button>
      <Modal
        isOpen={modalIsOpen}
        style={{
          overlay: {
            backgroundColor: "#e8d3c4",
          },
          content: {
            color: "#46483b",
            top: "40px",
            left: "40px",
            right: "40px",
            bottom: "40px",
            border: "1px solid #46483b",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "10px",
            outline: "none",
            padding: "50px",
          },
        }}
      >
        <h2>Signup</h2>
        <hr />
        <form>
          <div className="form-group">
            <label>Name</label>
            <input
              type="name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="buttons"
            type="submit"
            onClick={(e) => {
              handleToken(e, name, email, password);
            }}
          >
            Submit
          </button>
          <button className="buttons" onClick={handleCloseBtnClick}>
            Close
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Signup;
