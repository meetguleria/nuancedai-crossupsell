import React from "react"; // Make sure React is explicitly imported
console.log("DEBUG: Entering App.jsx (file-level)...");

export default function App() {
  console.log("DEBUG: Inside App() function..."); // (2)

  return (
    <div style={{ margin: "100px" }}>
      <h1>Hello from minimal App.jsx!</h1>
    </div>
  );
}