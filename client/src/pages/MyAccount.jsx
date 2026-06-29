import { useState, useEffect } from "react";
import api from "../api/axios";

export default function MyAccount() {

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [edit, setEdit] = useState(false);
  const [password, setPassword] = useState("");
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    street: user?.address?.street || "",
    city: user?.address?.city || "",
    postalCode: user?.address?.postalCode || ""
  });

  useEffect(() => {
  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders/my-orders");
      console.log("MY ORDERS:", res.data);
      setOrders(res.data);
    } catch(err){
      console.log(
        "ORDER ERROR:",
        err.response?.data || err
      );
    }
  };
  fetchOrders();
}, []);
  const updateDetails = async () => {

  console.log("SAVE CLICKED");
  console.log(form);

  try {

    const res = await api.put("/user/update", {
      name: form.name,
      phone: form.phone,
      address: {
        street: form.street,
        city: form.city,
        postalCode: form.postalCode
      }
    });

    console.log("UPDATED USER:", res.data);

    localStorage.setItem(
      "user",
      JSON.stringify(res.data)
    );

    setUser(res.data);
    setEdit(false);

    alert("Details updated");

  } catch (err) {

    console.log(
      "UPDATE ERROR:",
      err.response?.data || err
    );

  }
};


  const changePassword = async () => {
    try {

      await api.put("/user/password", {
        password
      });

      alert("Password changed");

    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="account-container">

  <h1 className="page-title">My Account</h1>

  {/* DETAILS */}
  <div className="account-card">

    <h2>Account Details</h2>

    <div className="info-grid">
      <p><span>Name:</span> {user?.name}</p>
      <p><span>Email:</span> {user?.email}</p>
      <p><span>Phone:</span> {user?.phone || "Not added"}</p>
    </div>

    <div className="address-box">
      <h4>Delivery Address</h4>
      <p>{user?.address?.street}</p>
      <p>{user?.address?.city}</p>
      <p>{user?.address?.postalCode}</p>
    </div>

    <button className="btn" onClick={() => setEdit(!edit)}>
      Edit Details
    </button>

  </div>

  {/* EDIT */}
  {edit && (
    <div className="account-card">

      <h2>Edit Details</h2>

      <div className="form-grid">

        <input placeholder="Name" value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })} />

        <input placeholder="Phone" value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })} />

        <input placeholder="Street" value={form.street}
          onChange={e => setForm({ ...form, street: e.target.value })} />

        <input placeholder="City" value={form.city}
          onChange={e => setForm({ ...form, city: e.target.value })} />

        <input placeholder="Postal Code" value={form.postalCode}
          onChange={e => setForm({ ...form, postalCode: e.target.value })} />

      </div>

      <button className="btn primary" onClick={updateDetails}>
        Save Changes
      </button>

    </div>
  )}

  {/* ORDERS */}
  <div className="account-card">

    <h2>My Orders</h2>

    {orders.length === 0 ? (
      <p className="muted">No orders yet</p>
    ) : (

      <div className="orders-grid">

        {orders.map(order => (

          <div key={order._id} className="order-card">

            <div className="order-top">
              <h3>Order #{order._id.slice(-6)}</h3>
              <span className={`status ${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </div>

            <p className="total">R {order.total}</p>

            <div className="items">
              {order.items.map((item, i) => (
                <div key={i} className="item-row">
                  <span>{item.name}</span>
                  <span>x {item.qty}</span>
                </div>
              ))}
            </div>

          </div>

        ))}

      </div>

    )}

  </div>

  {/* SECURITY */}
  <div className="account-card">

    <h2>Security</h2>

    <input
      type="password"
      placeholder="New Password"
      value={password}
      onChange={e => setPassword(e.target.value)}
    />

    <button className="btn danger" onClick={changePassword}>
      Change Password
    </button>

  </div>

</div>
  );
}