import React from 'react';
import {Link} from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <Link to="/" className="navbar-brand">AllHues</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                <li className="nav-item active">
                    <Link to="/viewall" className="nav-link">ViewAll<span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item">
                    <Link to="viewone" className="nav-link">ViewOne</Link>
                </li>
                <li className="nav-item">
                    <Link to="/upload" className="nav-link">Upload</Link>
                </li>
                <li className="nav-item">
                    <Link to="/portal" className="nav-link">Portal</Link>
                </li>
                <li className="nav-item">
                    <Link to="/signup" className="nav-link">Signup</Link>
                </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;