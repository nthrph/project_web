import React, { useState, useEffect } from 'react';
import './status.css';

const OrderComponent = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:3001/status');
        const data = await response.json();
        
        const sortedOrders = data.sort((a, b) => {
          if (a.status === 'wait' && b.status !== 'wait') return -1; // wait ขึ้นก่อน
          if (a.status !== 'wait' && b.status === 'wait') return 1;  // wait ลงหลัง
          return 0; // รักษาลำดับเดิมสำหรับสถานะอื่น
        });

        setOrders(sortedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleUpdateStatus = (id, newStatus) => {
    const updatedOrders = orders.map(order =>
      order.id === id ? { ...order, status: newStatus } : order
    );

    const sortedOrders = updatedOrders.sort((a, b) => {
      if (a.status === 'wait' && b.status !== 'wait') return -1; // wait ขึ้นก่อน
      if (a.status !== 'wait' && b.status === 'wait') return 1;  // wait ลงหลัง
      return 0; // รักษาลำดับเดิมสำหรับสถานะอื่น
    });

    setOrders(sortedOrders);
  };

  return (
    <div>
      <h1>Order</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Menu</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} style={{ backgroundColor: '#ffecec', border: '1px solid #ffcccc' }}>
                <td>{order.id}</td>
                <td>{order.customer_name}</td>
                <td>{order.menu}</td>
                <td>{order.quantity}</td>
                <td>
                  <span style={{ color: order.status === 'done' ? 'green' : 'orange' }}>{order.status}</span>
                </td>
                <td>
                  <button
                    style={{ backgroundColor: 'green', color: 'white', marginRight: '10px' }}
                    onClick={() => handleUpdateStatus(order.id, 'done')}
                  >
                    Done
                  </button>
                  <button
                    style={{ backgroundColor: 'red', color: 'white' }}
                    onClick={() => handleUpdateStatus(order.id, 'cancelled')}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderComponent;
