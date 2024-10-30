// Cart.js
import React from 'react';
import { useCart } from './CartContext';
import NavBar_customer from '../customer/NavBar_customer';
import './Cart.css';
import { RiDeleteBin7Fill } from "react-icons/ri";
const Cart = () => {
  const { cartItems, OrderAll, removeFromCart, getTotalPrice, addToCart , customerInfo,priceperitem  } = useCart();

  const handleIncreaseQuantity = (item) => {
    if (item.quantity < item.stock) {
      addToCart({ ...item, quantity: 1 });
    } else {
      alert("จำนวนสินค้าเกินสต็อกที่มีอยู่");
    }
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      addToCart({ ...item, quantity: -1 });
    }
  };

  return (
    <div>
      <NavBar_customer />
      {/* <h2>Welcome, {customerInfo.name}</h2> เพิ่มการแสดงชื่อผู้ใช้ */}
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
        <img src="https://cdn-icons-png.freepik.com/512/7712/7712328.png" alt="Empty Cart" className="empty-cart-image" />
        <h3>Your Cart is Empty</h3>
        <button className="go-home-button" onClick={() => window.location.href = "/customer/Home"}>Shopping</button>
      </div>
    
      ) : (
        <div className="cart-container">
          <ul>
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <img src={item.img} alt={item.name} className="cart-item-image" />
                <div >
                  <h2 className="cart-item-title">{item.name} </h2>
                  <p className="cart-item-description">{item.ingredients}</p>
                  <p>Unit Price:{item.price} THB </p>
                </div>
                <div className="cart-item-quantity">
                  <label>Quantity</label>
                  <div className="quantity-controls">
                    <button onClick={() => handleDecreaseQuantity(item)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncreaseQuantity(item)}>+</button>
                  </div>
                </div>
                <div>
                <h2 className="cart-item-price">{priceperitem(item)} THB</h2>
                
                </div>
                
                <button className="cart-item-delete" onClick={() => removeFromCart(item)}>
                <RiDeleteBin7Fill />
                </button>
              </li>
            ))}
          </ul>
          <div className="cart-footer">
            <h3>Total: {getTotalPrice()} THB</h3>
            <button className="order-all-button" onClick={() => OrderAll()}>Order All</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
