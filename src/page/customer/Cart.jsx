import React from 'react';
import { useCart } from './CartContext';
import NavBar_customer from '../customer/NavBar_customer';
import './Cart.css';
const Cart = () => {
  const { cartItems, removeFromCart, getTotalPrice } = useCart();

  return (
    <div>
      <NavBar_customer />
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div >
          <ul>
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <img src={item.img} alt={item.name} className="cart-item-image" />
                <h2 className="cart-item-title">{item.name}</h2>
                <div className="cart-item-quantity"> <select
                  value={[item.quantity] || 1}
                  onChange={(e) => (item.quantity, e.target.value)}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  {/* คุณสามารถเพิ่ม option ตามที่ต้องการ */}
                </select>
                  <span>piece</span>
                </div>
                <h2 className="cart-item-title">{item.price} THB</h2>

               
                <button className="cart-item-delete"  onClick={() => removeFromCart(item)}>delete</button>
              </li>
            ))}
          </ul>
          <h3>Total: {getTotalPrice()} THB</h3>
        </div>
      )}
    </div>
  );
};

export default Cart;
