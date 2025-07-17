import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Global error handler for unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  console.error('Promise rejection stack:', event.reason?.stack);
  
  // Check if it's a fetch-related error or network error
  if (event.reason?.name === 'TypeError' && event.reason?.message?.includes('fetch')) {
    console.log('Network/fetch error handled');
  }
  
  event.preventDefault(); // Prevent the default browser behavior
});

// Global error handler for uncaught exceptions
window.addEventListener('error', (event) => {
  console.error('Uncaught error:', event.error);
});

createRoot(document.getElementById("root")!).render(<App />);
