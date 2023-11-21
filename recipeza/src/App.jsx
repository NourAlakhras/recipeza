//import { useState } from "react";

import "./App.css";

function App() {
  const navbarStyle = {
    display: "flex",
    alignItems: "top",
    justifyContent: "space-between",
  };
  return (
    <>
      <nav style={navbarStyle}>
        <div className="logo">
          <img
            src="src\\assets\\web-logo.png"
            alt="Recipeza Logo"
            width={180}
          />
        </div>
        <div className="search-bar">
          <input type="search" placeholder="Search..." />
          <button>Search</button>
        </div>
        <div className="signup">
          <button>Sign Up</button>
        </div>
      </nav>
      <div>
        <h1>kjhgg</h1>
      </div>
    </>
  );
}

export default App;
