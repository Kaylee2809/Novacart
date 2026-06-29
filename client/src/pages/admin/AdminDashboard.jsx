import { useEffect, useState } from "react";
import api from "../../api/axios";
import {LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer} from "recharts";
export default function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
  const fetchOrders = async () => {
    try {
      let url = "/orders/my-orders";
      if (user?.isAdmin === true) {
        url = "/orders";
      }
      const res = await api.get(url, {
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      });
      console.log("ORDERS RECEIVED:", res.data);
      setOrders(res.data);
    } catch(err){
      console.log(err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      console.log("PRODUCTS RECEIVED:", res.data);
      setProducts(res.data);
    } catch(err){
      console.log("PRODUCT ERROR:", err);
    }
  };
  fetchOrders();
  fetchProducts();
}, []);

  const safeProducts = Array.isArray(products) ? products : [];
  const safeOrders = Array.isArray(orders) ? orders : [];

  const totalProducts = safeProducts.length;
  const totalOrders = safeOrders.length;
  const totalRevenue = safeOrders.reduce(
    (sum, o) => sum + (o.total || 0),
    0
  );

  // ---------------- CHART COMPONENTS ----------------

  function ChartOrders({ data }) {
  const chartData = Object.values(
    data.reduce((acc, order) => {
      const date = new Date(order.createdAt).toLocaleDateString();

      acc[date] = acc[date] || { date, orders: 0 };
      acc[date].orders += 1;

      return acc;
    }, {})
  );

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="orders" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}

  function ChartRevenue({ data }) {
  const chartData = Object.values(
    data.reduce((acc, order) => {
      const date = new Date(order.createdAt).toLocaleDateString();

      acc[date] = acc[date] || { date, revenue: 0 };
      acc[date].revenue += order.total || 0;

      return acc;
    }, {})
  );

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="revenue" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}

  // ---------------- UI ----------------

  return (
    <div className="dashboard">

      <h1>Admin Dashboard</h1>

      {/* STATS */}
      <div className="stats-grid">

        <div className="stat-card">
          <h3>Products</h3>
          <p>{totalProducts}</p>
        </div>

        <div className="stat-card">
          <h3>Orders</h3>
          <p>{totalOrders}</p>
        </div>

        <div className="stat-card">
          <h3>Revenue</h3>
          <p>R {totalRevenue}</p>
        </div>

      </div>

      {/* CHARTS */}
      <div className="charts">

        <div className="chart-box">
          <h3>Orders Trend</h3>
          <ChartOrders data={safeOrders} />
        </div>

        <div className="chart-box">
          <h3>Revenue Trend</h3>
          <ChartRevenue data={safeOrders} />
        </div>

      </div>

    </div>
  );
}