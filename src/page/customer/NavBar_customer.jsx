import React from 'react';
import './NavBar_customer.css';
import { FaHome, FaShoppingCart, FaListAlt } from 'react-icons/fa';

const NavBar_customer = ({ setCurrentPage }) => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
        <a onClick={() => setCurrentPage('home')}>
          <FaHome className="icon" />
          <span>HOME</span>
        </a>
        </li>
        <li>
        <a onClick={() => setCurrentPage('cart')}>
          <FaShoppingCart className="icon" />
          <span>CART</span>
          </a>
        </li>
        <li>
        <a onClick={() => setCurrentPage('order')}>
          <FaListAlt className="icon" />
          <span>ORDER</span>
        </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar_customer;
