import { useState } from "react";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.msg);
        return;
      }

      localStorage.setItem("token", data.token);
      setUser({ email });

      alert("Login successful");

    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div className="auth-card">
      <h3 className="form-title">Welcome Back</h3>
      <p className="form-subtitle">Log in to access your dashboard.</p>

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

      <button className="form-button" onClick={login}>
        Login
      </button>
    </div>
  );
}

export default Login;