import React, { useState } from "react";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="app-container">
      <div className="auth-wrapper">
        <h1 className="app-title">User Management System</h1>

        {!user ? (
          <div className="forms-grid">
            <Register />
            <Login setUser={setUser} />
          </div>
        ) : (
          <div className="dashboard-card">
            <Dashboard user={user} setUser={setUser} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;