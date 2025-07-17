import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Global error handler for unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  console.error('Promise rejection stack:', event.reason?.stack);
  
  // Handle specific error types gracefully
  if (event.reason?.name === 'TypeError' && event.reason?.message?.includes('fetch')) {
    console.log('Network/fetch error handled');
  }
  
  // Handle WebSocket errors from Vite HMR or Eruda
  if (event.reason?.message?.includes('WebSocket') || 
      event.reason?.message?.includes('localhost:undefined') ||
      event.reason?.message?.includes('Failed to construct \'WebSocket\'') ||
      event.reason?.name === 'SyntaxError' && event.reason?.message?.includes('WebSocket') ||
      event.reason?.stack?.includes('eruda.js') ||
      event.reason?.stack?.includes('setupWebSocket') ||
      event.reason?.stack?.includes('@vite/client')) {
    console.log('Vite HMR WebSocket error handled - this is expected during development');
  }
  
  event.preventDefault(); // Prevent the default browser behavior
});

// Global error handler for uncaught exceptions
window.addEventListener('error', (event) => {
  // Suppress Vite HMR configuration warnings that don't affect functionality
  if (event.error?.message?.includes('failed to connect to websocket') ||
      event.message?.includes('failed to connect to websocket') ||
      event.error?.message?.includes('localhost:undefined') ||
      event.message?.includes('localhost:undefined')) {
    console.log('Vite HMR notice suppressed - connection working via URL fix');
    event.preventDefault();
    return;
  }
  console.error('Uncaught error:', event.error);
});

createRoot(document.getElementById("root")!).render(<App />);
