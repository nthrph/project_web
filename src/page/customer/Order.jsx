import React, { useEffect, useState } from 'react';
import NavBar_customer from '../customer/NavBar_customer';
import './Order.css';  // For custom styles
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const location = useLocation(); 
  const { name } = location.state || {};

  // Fetch orders from the backend
  useEffect(() => {
    axios
      .get('http://localhost:5000/orders', {
        params: { name_customer: name }  // Sending name_customer as a query parameter
      })  // Replace with actual API endpoint
      .then(response => {
        setOrders(response.data);  // Axios directly returns the data from the response
      })
      .catch(error => console.error('Error fetching orders:', error));
  }, [name]);  // Add name to dependency array if it may change
  

  return (
    <div>
      <NavBar_customer />
      <h1 className="h1">MY ORDER</h1>
      <div className="order-container">
        {orders.map((order, index) => (
          <div className="order" key={index}>
            <img src={order.img} alt={order.name_menu} className="order-img" />
            <div className="order-details">
              <div className="order-name">{order.name_menu}</div>
              <div className="order-quantity">x {order.quantity}</div>
            </div>
            <div className="order-status">
              <div className={`status-indicator status-${order.status.toLowerCase()}`}></div>
              {order.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;