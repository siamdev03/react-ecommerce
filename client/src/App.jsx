// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/MyOrders";

// Components
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
//Footer//
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
const App = () => {
  // Cart state
  const [cartItems, setCartItems] = useState([]);

  // User placeholder (replace with real auth in future)
  const user = { token: "user_jwt_token_here", email: "user@example.com" };

  return (
    <>
    <Router>
      {/* Navbar */}
      <Navbar />
      <nav className="bg-gray-200 p-4 flex justify-between">
        <Link to="/" className="font-bold">ShopMini</Link>
        <Link to="/checkout" className="font-semibold">Checkout ({cartItems.length})</Link>
      </nav>

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />

        {/* Admin protected route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* User protected routes */}
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout cartItems={cartItems} user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order-success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
      <WhatsAppButton />
    </Router>
    
    </>
  );
};

export default App;
