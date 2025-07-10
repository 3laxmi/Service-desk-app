// user sidebar
import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div style={styles.sidebar}>
      <h2 style={styles.logo}>User Desk</h2>
      <nav style={styles.nav}>
        {[
          { to: "/dashboard", label: "Dashboard" },
          { to: "/my-tickets", label: "My Tickets" },
          { to: "/raise-ticket", label: "Raise Ticket" },
        ].map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            style={({ isActive }) =>
              isActive ? { ...styles.link, ...styles.active } : styles.link
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "240px",
    backgroundColor: "#264653",
    color: "#fff",
    padding: "30px 20px",
    height: "100vh",
    position: "sticky",
    top: 0,
    flexShrink: 0,
  },
  logo: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "40px",
    color: "#fff",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  link: {
    textDecoration: "none",
    color: "#ffffffcc",
    fontSize: "16px",
    padding: "10px 16px",
    borderRadius: "8px",
    transition: "all 0.3s ease",
  },
  active: {
    backgroundColor: "#2a9d8f",
    color: "#fff",
    fontWeight: "bold",
  },
};

export default Sidebar;
