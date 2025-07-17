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
      event.reason?.stack?.includes('eruda.js')) {
    console.log('WebSocket/Eruda error handled - likely HMR connection issue');
  }
  
  event.preventDefault(); // Prevent the default browser behavior
});

// Global error handler for uncaught exceptions
window.addEventListener('error', (event) => {
  console.error('Uncaught error:', event.error);
});

createRoot(document.getElementById("root")!).render(<App />);
