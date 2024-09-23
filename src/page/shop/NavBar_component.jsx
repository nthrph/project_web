// export default NavBar;

// NavBar.js
import React from 'react';
import { FaBirthdayCake, FaCookie, FaCoffee, FaClipboardCheck } from 'react-icons/fa';
import './NavBar.css';
import { Link } from 'react-router-dom';
import CakeList from './Cake';
// import CookieList from './Cookie';
// import DrinkList from './Drink';
// import Status from './Status';


const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <a href="/shop/Cake">  
            <FaBirthdayCake className="icon" />
            <span>Cake</span>
            {/* < CakeList /> */}
          </a>
        </li>
        <li>
          <a href="/shop/Cookie">
            <FaCookie className="icon" />
            <span>Cookie</span>
            {/* < CookieList /> */}
          </a>
        </li>
        <li>
          <a href="/shop/Drink">
            <FaCoffee className="icon" />
            <span>Drink</span>
            {/* <DrinkList /> */}
          </a>
        </li>
        <li>
          <a href="/shop/Status">
            <FaClipboardCheck className="icon" />
            <span>Status</span>
            {/* <Status /> */}
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
