import NavBar_customer from '../customer/NavBar_customer';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cart.css';  // Import the CSS file

const Cart = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [pieces, setPieces] = useState({}); // State สำหรับจัดการ piece ของแต่ละ item

  useEffect(() => {
    axios.get(`http://localhost:5000/menu`)
      .then(response => {
        setMenuItems(response.data);
        const initialPieces = {};
        response.data.forEach(item => {
          initialPieces[item.id] = item.piece || 1; // กำหนดค่า piece เริ่มต้น
        });
        setPieces(initialPieces); // ตั้งค่า pieces
      })
      .catch(error => {
        console.error('Error fetching menu!', error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/menu/delete/${id}`)
      .then(response => {
        console.log('Item deleted successfully:', response.data);
        const updatedItems = menuItems.filter(item => item.id !== id);
        setMenuItems(updatedItems);
        const updatedPieces = { ...pieces };
        delete updatedPieces[id]; // ลบ piece ของ item ที่ถูกลบ
        setPieces(updatedPieces);
      })
      .catch(error => {
        console.error('Error deleting item:', error.response.data);
      });
  };

  const handlePieceChange = (id, value) => {
    setPieces(prevPieces => ({
      ...prevPieces,
      [id]: value // อัปเดตค่า piece ของ item ที่ถูกเปลี่ยน
    }));
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
              <select 
                value={pieces[item.id] || 1} 
                onChange={(e) => handlePieceChange(item.id, e.target.value)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                {/* คุณสามารถเพิ่ม option ตามที่ต้องการ */}
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
