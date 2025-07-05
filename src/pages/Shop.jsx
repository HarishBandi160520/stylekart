import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import API from '../services/api';
import ProductCard from '../components/ProductCard';

function Shop({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  // Redirect to login if no token
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get('/products');
        setProducts(response.data);
      } catch (error) {
        if (error.response) {
          if (error.response.status === 403) {
            setError("Access Denied. Please log in to view products.");
          } else {
            setError("An error occurred while fetching products.");
          }
        } else {
          setError("Server not responding.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Moved outside of the useEffect
  const handleDeleteProduct = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      setProducts(products.filter(product => product.id !== id));
      alert("🗑️ Product deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      alert("❌ Failed to delete product.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-700">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        <p className="ml-4 text-lg">Loading shop items...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-600">
        <p className="text-lg">{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-500">
        <p className="text-lg">No products available in the shop yet.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 py-8 font-sans">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10">🛍️ Our Shop</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onDelete={handleDeleteProduct} // ✅ Added delete support
            isAdmin={true} // ✅ Make dynamic later
          />
        ))}
      </div>
    </div>
  );
}

export default Shop;
