import React from 'react';
import { FaHome, FaShoppingCart, FaListAlt } from 'react-icons/fa';
import './NavBar_customer.css'; // แก้เส้นทางให้ถูกต้อง

const NavBar_customer = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <a href="/customer/Home">  
            <FaHome className="icon" />
            <span>Home</span>
          </a>
        </li>
        <li>
          <a href="/customer/Cart">
            <FaShoppingCart className="icon" />
            <span>Cart</span>
          </a>
        </li>
        <li>
          <a href="/customer/Order">
            <FaListAlt className="icon" />
            <span>Order</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};
export default NavBar_customer;
