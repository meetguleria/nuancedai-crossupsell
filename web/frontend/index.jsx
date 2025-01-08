import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css';

// Select the DOM container where the React app will be mounted
const container = document.getElementById("app");

// Throw an error if the container is not found to prevent silent failures
if (!container) {
  throw new Error("Root container missing in HTML. Ensure there's an element with id 'app'.");
}

// Create a React root using React 18's createRoot
const root = ReactDOM.createRoot(container);

// Initialize i18n before rendering the app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
