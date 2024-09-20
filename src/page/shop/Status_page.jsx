import React, { useState } from 'react';
import './Style.css'; // สร้างไฟล์ CSS เพื่อจัดการรูปแบบของหน้า

function App() {
  const [orderStatus, setOrderStatus] = useState('wait');

  const handleDone = () => {
    setOrderStatus('done');
  };

  const handleCancel = () => {
    setOrderStatus('cancel');
  };

  return (
    <div className="container">
      <header>
        <nav>
          <ul>
            <li>Cake</li>
            <li>Cookie</li>
            <li>Drink</li>
            <li>Status</li>
          </ul>
        </nav>
      </header>

      <main>
        <table>
          <thead>
            <tr>
              <th>Order</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="order-details">
                  <span>1</span>
                  <div className="order-items">
                    <p>บลูเบอร์รี่คัพเค้ก</p>
                    <p>Strawberry Milkshakes</p>
                  </div>
                  <div className="quantity">
                    <span>2</span>
                    <span>1</span>
                  </div>
                </div>
              </td>
              <td>
                <div className="status-buttons">
                  {orderStatus === 'wait' && <span className="status-wait">● wait</span>}
                  <button onClick={handleDone} className="btn-done">Done</button>
                  <button onClick={handleCancel} className="btn-cancel">Cancel</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </main>

      <footer>
        <div className="contact">
          <p>Contact</p>
          <p>Address: 123 Street, Chiang Mai</p>
          <p>Phone: +66 123 4567</p>
        </div>
        <div className="open-close">
          <p>Open: 9:00 AM - 8:00 PM</p>
          <p>Mon - Sun</p>
        </div>
        <div className="map">
          <img src="map.png" alt="Map" />
        </div>
      </footer>
    </div>
  );
}

export default App;
