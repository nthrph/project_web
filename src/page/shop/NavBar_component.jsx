// export default NavBar;

// NavBar.js
import React from 'react';
import { FaBirthdayCake, FaCookie, FaCoffee, FaClipboardCheck } from 'react-icons/fa';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <a href="/cake">
            <FaBirthdayCake className="icon" />
            <span>Cake</span>
          </a>
        </li>
        <li>
          <a href="/cookie">
            <FaCookie className="icon" />
            <span>Cookie</span>
          </a>
        </li>
        <li>
          <a href="/drink">
            <FaCoffee className="icon" />
            <span>Drink</span>
          </a>
        </li>
        <li>
          <a href="/status">
            <FaClipboardCheck className="icon" />
            <span>Status</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
