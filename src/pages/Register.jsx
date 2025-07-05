import React, { useState } from 'react';
// ✅ CORRECTED PATH: Go up one level to src/, then into services/
import API from '../services/api';

function Register() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('Registering...');
    setIsError(false);

    try {
      const response = await API.post('/auth/register', form);
      setMessage('✅ Registration successful!');
      setIsError(false);
      setForm({ username: '', password: '' });
      console.log('Registration Response:', response.data);
    } catch (error) {
      setMessage('❌ Registration failed. Please try again.');
      setIsError(true);
      console.error('Registration error:', error.response ? error.response.data : error.message);
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(`❌ Registration failed: ${error.response.data.message}`);
      } else if (error.response && error.response.status === 409) {
        setMessage('❌ Registration failed: Username already exists.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Register</h2>

        <div className="mb-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>

        <button
  type="submit"
  disabled={message === 'Registering...'}
  className={`w-full bg-blue-600 text-white p-3 rounded-md font-semibold ${
    message === 'Registering...' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
  } transition duration-300 ease-in-out transform hover:scale-105 shadow-md`}
>
  {message === 'Registering...' ? 'Please wait...' : 'Register'}
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

export default Register;
