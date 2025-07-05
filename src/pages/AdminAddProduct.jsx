import React, { useState } from 'react';
import API from '../services/api'; // Ensure this path is correct: stylekart/src/services/api.js

function AdminAddProduct() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: ''
  });

  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false); // To style success/error messages

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('Uploading product...'); // Provide immediate feedback
    setIsError(false); // Reset error state

    try {
      const token = localStorage.getItem('token');

      // Basic validation for token existence
      if (!token) {
        setMessage('❌ Please log in to upload products.');
        setIsError(true);
        return;
      }

      await API.post('/products', {
        ...formData,
        price: parseFloat(formData.price) // Ensure price is a number
      }, {
        headers: {
          // ✅ Corrected: Using backticks for template literal
          Authorization: `Bearer ${token}`
        }
      });

      setMessage('✅ Product uploaded successfully!');
      setIsError(false);
      // Clear form after successful upload
      setFormData({ name: '', description: '', price: '', imageUrl: '' });

    } catch (err) {
      setMessage('❌ Error uploading product. Check console for details.');
      setIsError(true);
      console.error("Product upload error:", err.response ? err.response.data : err.message);
      // More specific error messages for the user
      if (err.response && err.response.status === 401) {
        setMessage('❌ Unauthorized. Please log in again.');
      } else if (err.response && err.response.data && err.response.data.message) {
        setMessage(`❌ Error: ${err.response.data.message}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        {/* Debugging H1 - keep this inside the component's return */}
        <h1 className="text-xl font-semibold text-green-600 mb-4 text-center rounded-md p-2 bg-green-50">
          ✅ Admin Add Product Page Loaded
        </h1>

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Upload New Product</h2>

        <div className="mb-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>
        <div className="mb-4">
          <textarea
            name="description"
            placeholder="Product Description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 resize-y"
          ></textarea>
        </div>
        <div className="mb-4">
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>
        <div className="mb-6">
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={formData.imageUrl}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
        >
          Upload Product
        </button>

        {message && (
          <p className={`mt-4 text-center text-sm font-medium ${isError ? 'text-red-600' : 'text-green-600'} rounded-md p-2 ${isError ? 'bg-red-50' : 'bg-green-50'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default AdminAddProduct;
