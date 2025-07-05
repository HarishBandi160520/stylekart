// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminUpload from './pages/AdminUpload';
import AdminAddProduct from './pages/AdminAddProduct';
import Footer from './components/Footer';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const checkTokenExpiry = () => {
      if (token) {
        try {
          const decoded = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          if (decoded.exp < currentTime) {
            console.warn('JWT expired');
            localStorage.removeItem('token');
           <Navbar token={token} setToken={setToken} />
          }
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      }
    };

    checkTokenExpiry();
  }, [token]);

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const handleRemoveFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
  };
<BrowserRouter future={{ v7_relativeSplatPath: true }}>
  {/* your routes here */}
</BrowserRouter>
  return (
    <Router>
      <Navbar token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop onAddToCart={handleAddToCart} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />} />
        <Route path="/login" element={!token ? <Login setToken={setToken} /> : <Navigate to="/" />} />
        <Route path="/register" element={!token ? <Register /> : <Navigate to="/" />} />
        <Route path="/admin/upload" element={token ? <AdminUpload /> : <Navigate to="/login" />} />
        <Route path="/admin/add-product" element={token ? <AdminAddProduct /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
       <Footer />
    </Router>
    
  );
}

export default App;
