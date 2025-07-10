// user navbar
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../firebase/config";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await auth.signOut();
    localStorage.removeItem("user");
    navigate("/login");
  };

  const getTitle = (pathname) => {
    if (pathname.includes("dashboard")) return "Dashboard";
    if (pathname.includes("my-tickets")) return "My Tickets";
    if (pathname.includes("raise-ticket")) return "Raise Ticket";
    return "QuickServiceDesk";
  };

  const currentTitle = getTitle(location.pathname);

  return (
    <div style={styles.navbar}>
      <h3 style={styles.title}>{currentTitle}</h3>
      <button onClick={handleLogout} style={styles.logoutBtn}>
        Logout
      </button>
    </div>
  );
};

const styles = {
  navbar: {
    height: "60px",
    backgroundColor: "#f1f5f9",
    color: "#333",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 30px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },
  title: {
    fontSize: "18px",
    fontWeight: "600",
  },
  logoutBtn: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "500",
  },
};

export default Navbar;
