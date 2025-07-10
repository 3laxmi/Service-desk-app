import React, { useEffect, useState } from "react";
import { collection, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "users"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(data);
    });
    return () => unsub();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this user?")) {
      await deleteDoc(doc(db, "users", id));
    }
  };

  const handleRoleChange = async (id, newRole) => {
    await updateDoc(doc(db, "users", id), { role: newRole });
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>User Management</h2>
      <div style={styles.table}>
        {users.map((user) => (
          <div key={user.id} style={styles.card}>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <div style={styles.actions}>
  <select
    value={user.role}
    onChange={(e) => handleRoleChange(user.id, e.target.value)}
    style={styles.select}
  >
    <option value="admin">Admin</option>
    <option value="user">User</option>
  </select>

  <button onClick={() => handleDelete(user.id)} style={styles.deleteButton}>
    Delete
  </button>
</div>
</div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    padding: "20px",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  table: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
  card: {
    flex: "1 1 300px",
    padding: "20px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },

  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
  select: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  deleteButton: {
    backgroundColor: "#e53935",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
  },

};

export default UserManagement;
