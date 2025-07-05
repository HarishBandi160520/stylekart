import React, { useEffect, useState } from 'react';
import API from '../services/api'; // Path from src/pages/ to src/services/
import ProductCard from '../components/ProductCard'; // Assuming ProductCard is now in src/components/

function ProductList({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null);   // State for error messages

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Set loading to true when fetching starts
        setError(null);   // Clear any previous errors

        const res = await API.get('/products'); // Make the API call
        setProducts(res.data); // Update products state with fetched data
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later."); // Set an error message
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this effect runs only once after the initial render

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48 text-gray-700">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        <p className="ml-4 text-lg">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-48 text-red-600">
        <p className="text-lg">{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center h-48 text-gray-500">
        <p className="text-lg">No products found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 py-8">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10">Our Latest Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(p => (
          <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
