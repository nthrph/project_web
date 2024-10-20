// Place all imports at the top level
import NavBar_customer from '../customer/NavBar_customer';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cart.css';  // Import the CSS file

const Cart = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/menu')
      .then(response => {
        setMenuItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching menu!', error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/menu/delete/${id}`)
      .then(response => {
        console.log('Item deleted successfully:', response.data);
        const updatedItems = menuItems.filter(item => item.id !== id);
        setMenuItems(updatedItems);
      })
      .catch(error => {
        console.error('Error deleting item:', error.response.data);
      });
  };
  
  

  return (
    <div>
      <NavBar_customer />
      <h1>My Cart</h1>
      {menuItems.map(item => (
        <div key={item.id} className="cart-item">
          <img 
            src={item.img_url} 
            alt={item.name} 
            className="cart-item-image"
          />
          <div className="cart-item-details">
            <h2 className="cart-item-title">{item.name}</h2>
            <div className="cart-item-quantity">
              <select>
                {/* Add the quantity options here */}
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
              <span>piece</span>
            </div>
          </div>
          {/* Attach the delete handler */}
          <button 
            className="cart-item-delete" 
            onClick={() => handleDelete(item.id)}
          >
            DELETE
          </button>
        </div>
      ))}
    </div>
  );
};

// Place export statements at the top level
export default Cart;
