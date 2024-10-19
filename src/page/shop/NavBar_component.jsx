// export default NavBar;

// NavBar.js
import React from 'react';
import { FaBirthdayCake, FaCookie, FaCoffee, FaClipboardCheck, FaHome } from 'react-icons/fa';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <a href="../">
            <FaHome className='icon' />
            <span>Home</span>
          </a>
        </li>
        <li>
          <a href="/shop/Cake">
            <FaBirthdayCake className="icon" />
            <span>Cake</span>
          </a>
        </li>
        <li>
          <a href="/shop/Cookie">
            <FaCookie className="icon" />
            <span>Cookie</span>
          </a>
        </li>
        <li>
          <a href="/shop/Drink">
            <FaCoffee className="icon" />
            <span>Drink</span>
          </a>
        </li>
        <li>
          <a href="/shop/Status">
            <FaClipboardCheck className="icon" />
            <span>Status</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
