import React, { useEffect, useState } from 'react'; 
import NavBar_customer from '../customer/NavBar_customer';
import './Order.css';  // For custom styles
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [name, setName] = useState(localStorage.getItem('name') || ''); // Fetch name from Local Storage
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
  }, [name]);  // Use name as a dependency 

  return (
    <div>
      <NavBar_customer />
      <h2>YOUR ORDER</h2>
      
        {orders.length === 0 ? (  // Check if there are any orders
          <div className="empty-order"> 
            <img src="https://cdn.vectorstock.com/i/preview-1x/98/59/slice-cake-with-drink-coffee-kawaii-style-vector-26769859.jpg" alt="Empty Cart" className="empty-order-image" />
            <h3>No Order</h3>
            <p>Looks like you haven't ordered anything yet.</p>
        </div>  

        ) : (
        <div className="order-container">
         { orders.map((order, index) => (
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
        )}
      
    </div>
  );
};

export default Order;
