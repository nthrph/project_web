import React, { useEffect, useState } from 'react'; 
import NavBar_customer from '../customer/NavBar_customer';
import './Order.css';  // For custom styles
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [name, setName] = useState(localStorage.getItem('name') || ''); // ดึงค่า name จาก Local Storage
  const location = useLocation(); 
  console.log("Customer name from location:", name);

  // Fetch orders from the backend
  useEffect(() => {
    if (name) {
      axios.get('http://localhost:5000/orders', {
        params: { name_customer: name }
      })
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => console.error('Error fetching orders:', error));
    }
  }, [name]);  // ใช้ name เป็น dependency 

  return (
    <div>
      <NavBar_customer />
      <h1 className="h1">MY ORDER</h1>
      <div className="order-container">
        {orders.length === 0 ? (  // เช็คว่ามีคำสั่งซื้อหรือไม่
          <p>No orders found for {name}</p>
        ) : (
          orders.map((order, index) => (
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
          ))
        )}
      </div>
    </div>
  );
};

export default Order;
