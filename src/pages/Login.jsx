import React, { useState } from 'react';
import axios from 'axios';

function Login({ setToken }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(
        'http://localhost:1010/api/auth/login',
        {
          username: form.username.trim(), // ✅ Prevent extra spaces
          password: form.password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const token = response.data.token;
      localStorage.setItem("token", token);
      setToken(token);
      alert('✅ Login successful!');
    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        if (error.response.status === 401 || error.response.status === 403) {
          setError('❌ Invalid username or password.');
        } else {
          setError(`❌ Server error: ${error.response.status}`);
        }
      } else {
        setError('❌ Network error or server not responding.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
          className="w-full p-2 mb-3 border rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full p-2 mb-4 border rounded"
        />

        {error && <p className="text-red-600 mb-2 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
