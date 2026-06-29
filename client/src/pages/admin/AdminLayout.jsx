import { Link, Outlet, useLocation } from "react-router-dom";

export default function AdminLayout() {
  const location = useLocation();

  return (
    <div className="admin-layout">

      {/* SIDEBAR */}
      <div className="admin-sidebar">
        <h2>NovaCart Admin</h2>

        <Link to="/admin" className={location.pathname === "/admin" ? "active" : ""}>
  📊 Dashboard
</Link>

<Link to="/admin/products" className={location.pathname === "/admin/products" ? "active" : ""}>
  📦 Products
</Link>

<Link to="/admin/orders" className={location.pathname === "/admin/orders" ? "active" : ""}>
  🧾 Orders
</Link>

<Link to="/admin/add-product" className={location.pathname === "/admin/add-product" ? "active" : ""}>
  ➕ Add Product
</Link>
      </div>

      {/* MAIN CONTENT */}
      <div className="admin-main">
        <Outlet />
      </div>

    </div>
  );
}