import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
document.body.style.margin = '0';
document.body.style.padding = '0';
document.body.style.background = 'linear-gradient(145deg, #097c7f 0%, #326784 50%, #6bb0d6 100%)';
document.body.style.minHeight = '100vh';
// =============================================

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);