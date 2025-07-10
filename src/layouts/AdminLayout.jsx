import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/common/AdminSidebar";
import AdminNavbar from "../components/common/AdminNavbar";

const AdminLayout = () => {
  return (
    <div style={styles.container}>
      <AdminSidebar />
      <div style={styles.main}>
        <AdminNavbar />
        <div style={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', sans-serif",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  content: {
    padding: "20px",
    background: "linear-gradient(to right, #e3f2fd, #ffffff)",
    flex: 1,

  },
};

export default AdminLayout;

