import { useEffect } from "react";

function Dashboard({ user, setUser }) {
  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>Welcome {user.email}</h2>

      <button onClick={() => {
        localStorage.removeItem("token");
        setUser(null);
      }}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;