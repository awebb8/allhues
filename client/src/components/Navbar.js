import React from 'react';
import {BrowserRouter, Link} from "react-router-dom";

const Navbar = () => {
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" class="navbar-brand">AllHues</Link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                <li class="nav-item active">
                    <Link to="/viewall" class="nav-link">ViewAll<span class="sr-only">(current)</span></Link>
                </li>
                <li class="nav-item">
                    <Link to="viewone" class="nav-link">ViewOne</Link>
                </li>
                <li class="nav-item">
                    <Link to="/upload" class="nav-link">Upload</Link>
                </li>
                <li class="nav-item">
                    <Link to="/portal" class="nav-link">Portal</Link>
                </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;