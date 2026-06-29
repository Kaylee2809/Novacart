import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Auth from "./pages/Auth";
import Checkout from "./pages/Checkout";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import AddProduct from "./pages/admin/AddProduct";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminProducts from "./pages/admin/AdminProduct.jsx";
import Footer from "./components/Footer";
import FloatingCart from "./components/FloatingCart";
import Orders from "./pages/Orders";
import Success from "./pages/Success";
import MyAccount from "./pages/MyAccount";

export default function App() {
  return (
<BrowserRouter>
  <div className="app-wrapper">

      <Navbar />

      <div className="page-content">

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/success" element={<Success />} />
        <Route path="/account" element={<MyAccount/>} />
        <Route path="/checkout"element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
           <Route path="add-product" element={<AddProduct />} />
        </Route>
      </Routes>

      </div>

       <FloatingCart />
       <Footer />

    </div>
</BrowserRouter>
  );

}