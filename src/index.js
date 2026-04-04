// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/global.css';
import { WindowProvider } from './contexts/WindowContext';

// Create a root.
const root = createRoot(document.getElementById('root'));

// Initial render: Render an element to the root.
root.render(
  <React.StrictMode>
    <WindowProvider>
      <App />
    </WindowProvider>
  </React.StrictMode>
);
