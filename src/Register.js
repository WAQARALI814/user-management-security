import { useState } from "react";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      let data = {};
      try {
        data = await res.json();
      } catch (parseError) {
        data = { msg: "Unexpected server response" };
      }

      alert(data.msg || "Registration failed");

    } catch (err) {
      alert(`Server error: ${err.message}`);
    }
  };

  return (
    <div className="auth-card">
      <h3 className="form-title">Create Account</h3>
      <p className="form-subtitle">Register with your email and password.</p>

      <input
        className="form-input"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="form-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="form-button" onClick={register}>
        Register
      </button>
    </div>
  );
}

export default Register;