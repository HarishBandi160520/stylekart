// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to StyleKart 👕🛍️</h1>
      <p className="text-lg text-gray-600 mb-6">Your one-stop shop for stylish fashion.</p>
      <Link to="/shop" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition">
        Go to Shop
      </Link>
    </div>
  );
}

export default Home;
