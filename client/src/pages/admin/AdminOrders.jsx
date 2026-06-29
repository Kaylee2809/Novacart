import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await api.get("/admin/orders");
    setOrders(res.data);
  };

  const updateStatus = async (id, status) => {
    await api.put(`/admin/orders/${id}`, { status });
    fetchOrders();
  };

  const deleteOrder = async (id) => {
    await api.delete(`/admin/orders/${id}`);
    fetchOrders();
  };

  return (
    <div className="admin-main">
      <h1>Orders</h1>

      <div className="admin-orders">
        {orders.map((o) => (
          <div key={o._id} className="order-card">

            <p><b>User:</b> {o.user?.name}</p>
            <p><b>Total:</b> R {o.total}</p>

            {/* STATUS */}
            <p>
              <b>Status:</b> 
              <span className={`status ${o.status}`}>
                {o.status}
              </span>
            </p>

            {/* STATUS BUTTONS */}
            <div className="status-buttons">
              <button onClick={() => updateStatus(o._id, "Pending")}>Pending</button>
              <button onClick={() => updateStatus(o._id, "Shipped")}>Shipped</button>
              <button onClick={() => updateStatus(o._id, "Delivered")}>Delivered</button>
            </div>

            <div className="order-items">
              {o.items.map((i, idx) => (
                <span key={idx}>
                  {i.name} x {i.qty}
                </span>
              ))}
            </div>

            <button className="delete-btn" onClick={() => deleteOrder(o._id)}>
              Delete Order
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}