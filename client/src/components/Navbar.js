import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AwesomeButton } from "react-awesome-button";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            OZER <div class="space"></div>
            <FontAwesomeIcon icon={faWallet} />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/how-to-use"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                How To Use
              </Link>
            </li>
          </ul>
          <Link to="/send-add-money">
            <AwesomeButton type="secondary">Send/Add Money</AwesomeButton>
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
