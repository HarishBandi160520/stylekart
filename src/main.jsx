import React from 'react';
import ReactDOM from 'react-dom/client';
// ✅ THIS IS THE CORRECT PATH based on your screenshot!
import App from './App.jsx'; // From src/ go into pages/ and find App.js
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
