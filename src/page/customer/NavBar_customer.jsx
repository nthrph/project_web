import React from 'react';
import './NavBar_customer.css'; // Import CSS file for styling
import { FaHome, FaShoppingCart, FaListAlt } from 'react-icons/fa';

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <a href="/home">
            <FaHome className="icon" />
            <span>HOME</span>
          </a>
        </li>
        <li>
          <a href="/cart">
            <FaShoppingCart className="icon" />
            <span>CART</span>
          </a>
        </li>
        <li>
          <a href="/order">
            <FaListAlt className="icon" />
            <span>ORDER</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;