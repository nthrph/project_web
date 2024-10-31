import React, { useState, useEffect } from 'react';
import './status.css';
import NavBar_component from './NavBar_component';

const OrderComponent = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/customer');
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

  const updateOrderStatus = async (id, newStatus) => {
    const url = newStatus === 'done'
      ? `http://localhost:5000/api/updatestatus_done/${id}`
      : `http://localhost:5000/api/updatestatus_cancel/${id}`;

    try {
      await fetch(url, {
        method: 'PUT', // Assuming it's a PUT request for updating
        headers: {
          'Content-Type': 'application/json',
        }
      });

      // Update local state after successful API call
      const updatedOrders = orders.map(order =>
        order.id === id ? { ...order, status: newStatus } : order
      );

      // Sort orders after the status is updated
      const sortedOrders = updatedOrders.sort((a, b) => {
        if (a.status === 'wait' && b.status !== 'wait') return -1;
        if (a.status !== 'wait' && b.status === 'wait') return 1;
        return 0;
      });

      setOrders(sortedOrders);

    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div>
      <NavBar_component />
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
              <th>Price</th>
              <th>Note</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id} style={{ backgroundColor: '#ffecec', border: '1px solid #ffcccc' }}>
                <td>{index + 1}</td> {/* แสดงหมายเลขลำดับที่จัดเรียงใน frontend */}
                <td>{order.name_customer}</td>
                <td>{order.name_menu}</td>
                <td>{order.quantity}</td>
                <td>{order.price}</td>
                <td>{order.note}</td>
                <td>
                  <span style={{ color: order.status === 'done' ? 'green' : order.status === 'cancel' ? 'red' : 'orange' }}>
                    {order.status}
                  </span>
                </td>
                <td>
                  {order.status === 'wait' && (
                    <>
                      <button
                        style={{ backgroundColor: 'green', color: 'white', marginRight: '10px' }}
                        onClick={() => updateOrderStatus(order.id, 'done')}
                      >
                        Done
                      </button>
                      <button
                        style={{ backgroundColor: 'red', color: 'white' }}
                        onClick={() => updateOrderStatus(order.id, 'cancel')}
                      >
                        Cancel
                      </button>
                    </>
                  )}
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
