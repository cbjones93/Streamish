import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../modules/authManager";

const Header = ({ isLoggedIn }) => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-info">
      <Link to="/" className="navbar-brand">
        StreamISH
      </Link>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Feed
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/videos/add" className="nav-link">
            New Video
          </Link>
        </li>
        {isLoggedIn ?
          <li className="nav-item">
            <a aria-current="page" className="nav-link"
              style={{ cursor: "pointer" }} onClick={logout}>Logout</a> 
          </li> :
          <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>}

      </ul>
    </nav>
  );
};

export default Header;
