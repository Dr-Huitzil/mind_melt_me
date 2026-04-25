// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/global.css';
import { WindowProvider } from './contexts/WindowContext';
import posthog from 'posthog-js';

posthog.init(process.env.REACT_APP_PUBLIC_POSTHOG_KEY, {
  api_host: process.env.REACT_APP_PUBLIC_POSTHOG_HOST,
  person_profiles: 'identified_only',
});

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
