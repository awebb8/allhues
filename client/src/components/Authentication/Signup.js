import Axios from "axios";
import "./auth.css";
import React, { useState, useContext } from "react";
import Modal from "react-modal";
import AuthContext from "../../utils/AuthContext";
import UserContext from "../../utils/UserContext";
import { useHistory } from "react-router-dom";

Modal.setAppElement("#root");

const Signup = () => {
	const [modalIsOpen, setModalIsOpen] = useState(true);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [userName, setUserName] = useState("");
	const [role, setRole] = useState("");
	const [roleCheckBox, setRoleCheckBox] = useState(false);
	const history = useHistory();

	const { setJwt } = useContext(AuthContext);
	const { setId } = useContext(UserContext);

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
					// console.log(name, email, password);
					console.log(response.data);
					setJwt(response.data.token);
					setId(response.data.user.id);
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
		if (roleCheckBox == true) {
			setRole("Consumer");
		} else {
			setRole("Content Creator");
		}
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
							placeholder="First and last name"
							className="form-control"
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label>Username</label>
						<input
							type="userName"
							placeholder="Username"
							className="form-control"
							onChange={(e) => setUserName(e.target.value)}
						/>
					</div>

					<div className="form-group">
						<label>Email address</label>
						<input
							type="email"
							placeholder="example@email.com"
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
							placeholder="password"
							className="form-control"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div>
						<input type="checkbox" onChange={handleRoleCheckBox} />
						<label>Content Creator?</label>
					</div>
					<button
						className="buttons"
						type="submit"
						onClick={(e) => {
							handleToken(e, name, userName, email, password, role);
						}}
					>
						Submit
					</button>
					<button className="buttons" onClick={handleCloseBtnClick}>
						Close
					</button>
					{incompleteError && (
						<div className="alert alert-danger" role="alert">
							Please fill out all fields
						</div>
					)}
					{emailError && (
						<div className="alert alert-danger" role="alert">
							Please enter a valid email address.
						</div>
					)}
					{passwordError && (
						<div className="alert alert-danger" role="alert">
							Please enter a password that is at least six characters.
						</div>
					)}
					{accountExists && (
						<div className="alert alert-danger" role="alert">
							An account already exists for the email address you have entered.
						</div>
					)}
				</form>
			</Modal>
		</div>
	);
};

export default Signup;
