import React, { useEffect, useState } from 'react';
import NavBar_customer from '../customer/NavBar_customer';
import './Order.css';  // For custom styles
import axios from 'axios';

const Order = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/orders')  // Replace with actual API endpoint
      .then(response => {
        setOrders(response.data);  // Axios directly returns the data from the response
      })
      .catch(error => console.error('Error fetching orders:', error));
  }, []);

  return (
    <div>
      <NavBar_customer />
      <h1 className="h1">MY ORDER</h1>
      <div className="order-container">
        {orders.map((order, index) => (
          <div className="order" key={index}>
            <img src={order.img_url} alt={order.name} className="order-img" />
            <div className="order-details">
              <div className="order-name">{order.name}</div>
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
