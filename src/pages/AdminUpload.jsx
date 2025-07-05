import React, { useState } from 'react';
import API from '../services/api'; // Axios instance with token

function AdminUpload() {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
  });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setMessage('Uploading...');
    setIsError(false);

    try {
      await API.post('/products', {
        ...product,
        price: parseFloat(product.price),
      });

      setMessage('✅ Product uploaded successfully!');
      setProduct({ name: '', description: '', price: '', imageUrl: '' });
    } catch (error) {
      setIsError(true);
      if (error.response && error.response.status === 403) {
        setMessage('❌ You are not authorized to upload products.');
      } else {
        setMessage('❌ Upload failed. Please try again.');
      }
      console.error('Upload Error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleUpload}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">📦 Upload Product</h2>

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          name="description"
          placeholder="Product Description"
          value={product.description}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          name="price"
          placeholder="Price (₹)"
          value={product.price}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={product.imageUrl}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition duration-300"
        >
          Upload Product
        </button>

        {message && (
          <div
            className={`text-center p-2 rounded font-medium ${
              isError ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'
            }`}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
}

export default AdminUpload;
