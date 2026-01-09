
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const style = document.createElement('style');
style.textContent = `
  :root {
    --color-primary: #14746F; /* Teal */
    --color-primary-hover: #105C58;
    --color-secondary: #4338CA; /* Indigo */
    --color-secondary-hover: #3730A3;
    --color-danger: #D9534F; /* Red */
    --color-danger-hover: #C9302C;
    --color-border: #D1D5DB;
    --color-text-dark: #374151;
    --color-text-light: #6B7280;
    --color-facebook: #1877F2;
    --color-whatsapp: #25D366;
  }

  .input-control {
    @apply block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500;
  }
  
  /* --- BASE BUTTONS --- */
  .btn {
     @apply w-full inline-flex items-center justify-center border font-medium rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2;
  }
  .btn-lg { @apply px-4 py-3 text-base; }
  .btn-md { @apply px-4 py-2 text-sm; }
  .btn-sm { @apply px-3 py-2 text-sm; }
  
  /* --- COLOR VARIANTS --- */
  .btn-primary {
     @apply btn-lg text-white border-transparent;
     background-color: var(--color-primary);
  }
  .btn-primary:hover { background-color: var(--color-primary-hover); }

  .btn-secondary {
     @apply btn-md text-gray-700 bg-white border-gray-300;
  }
  .btn-secondary:hover { @apply bg-gray-50 text-gray-800 border-gray-400; }

  .btn-action-secondary {
    @apply btn-md text-white border-transparent;
    background-color: var(--color-secondary);
  }
  .btn-action-secondary:hover { background-color: var(--color-secondary-hover); }

  .btn-danger {
    @apply btn-md text-white border-transparent;
    background-color: var(--color-danger);
  }
  .btn-danger:hover { background-color: var(--color-danger-hover); }

  /* --- SOCIAL BUTTONS --- */
   .btn-facebook {
    @apply btn-md text-white border-transparent;
    background-color: var(--color-facebook);
  }
  .btn-facebook:hover { opacity: 0.9; }

  .btn-whatsapp {
    @apply btn-md text-white border-transparent;
    background-color: var(--color-whatsapp);
  }
  .btn-whatsapp:hover { opacity: 0.9; }

  /* --- EDITOR TOGGLE --- */
  .btn-toggle {
    @apply p-2 rounded-lg transition-colors;
  }
  .btn-toggle-active {
    background-color: var(--color-secondary);
    @apply text-white;
  }
  .btn-toggle-inactive {
    @apply bg-gray-200 hover:bg-gray-300 text-gray-800;
  }
`;
document.head.append(style);


const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
