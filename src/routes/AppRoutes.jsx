import React from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 
import ProtectedRoute from "./ProtectedRoute";

import Welcome from "../pages/Welcome";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";

// User Pages
import UserDashboard from "../pages/user/Dashboard";
import MyTickets from "../pages/user/MyTickets";
import RaiseTicket from "../pages/user/RaiseTicket";

// Admin Pages
import AdminDashboard from "../pages/admin/Dashboard";
import ManageTickets from "../pages/admin/ManageTickets";
import UserManagement from "../pages/admin/UserManagement";

const AppRoutes = () => {
  const { user, role, loading } = useAuth(); 

  if (loading) return <div>Loading...</div>; 

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* User Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute user={user} role={role} allowedRole="user">
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="my-tickets" element={<MyTickets />} />
        <Route path="raise-ticket" element={<RaiseTicket />} />
      </Route>

      {/* Admin Protected Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute user={user} role={role} allowedRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="manage-tickets" element={<ManageTickets />} />
        <Route path="user-management" element={<UserManagement />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
