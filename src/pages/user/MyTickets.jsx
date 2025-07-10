
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "../../firebase/config";

const MyTickets = () => {
  const [tickets, setTickets]   = useState([]);
  const [filter, setFilter]     = useState("All");
  const [editTicket, setEditTicket] = useState(null);
  const [updatedFields, setUpdatedFields] = useState({
    description: "",
    priority: "",
    category: "",
  });

  useEffect(() => {
    const cur = auth.currentUser;
    if (!cur) return;

    const q = query(
      collection(db, "tickets"),
      where("userId", "==", cur.uid),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {
      setTickets(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    return unsub;
  }, []);

  const handleDelete = async (id) => {
  if (window.confirm("Delete this ticket?")) {
    try {
      await deleteDoc(doc(db, "tickets", id));
      toast.success("Ticket deleted successfully");
    } catch (error) {
      toast.error("Error deleting ticket");
    }
  }
};


  const handleEditClick = (t) => {
    setEditTicket(t.id);
    setUpdatedFields({
      description: t.description,
      priority:     t.priority,
      category:     t.category,
    });
  };



  const handleUpdate = async () => {
  try {
    await updateDoc(doc(db, "tickets", editTicket), updatedFields);
    setEditTicket(null);
    toast.success("Ticket updated successfully");
  } catch (error) {
    toast.error("Failed to update ticket");
  }
};

  const displayTickets =
    filter === "All"
      ? tickets
      : tickets.filter(
          (t) => t.status.toLowerCase() === filter.toLowerCase()
        );


  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Tickets Detail</h2>
      <div style={styles.filterBar}>
        <span>Filter:</span>
        <select
          style={styles.select}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          {["All", "Open", "InProgress", "Resolved", "Rejected"].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      {displayTickets.length === 0 ? (
        <p style={styles.empty}>No tickets to show.</p>
      ) : (
        <div style={styles.ticketGrid}>
          {displayTickets.map((t) => (
            <div key={t.id} style={styles.card}>
              {editTicket === t.id ? (
                <>
                  <textarea
                    style={styles.textarea}
                    value={updatedFields.description}
                    onChange={(e) =>
                      setUpdatedFields({ ...updatedFields, description: e.target.value })
                    }
                  />
                  <select
                    value={updatedFields.priority}
                    onChange={(e) =>
                      setUpdatedFields({ ...updatedFields, priority: e.target.value })
                    }
                    style={styles.select}
                  >
                    <option>Low</option><option>Medium</option><option>High</option>
                  </select>
                  <select
                    value={updatedFields.category}
                    onChange={(e) =>
                      setUpdatedFields({ ...updatedFields, category: e.target.value })
                    }
                    style={styles.select}
                  >
                    <option>Technical</option>
                    <option>Billing</option>
                    <option>Account</option>
                    <option>Other</option>
                  </select>
                  <button onClick={handleUpdate} style={styles.saveBtn}>Save</button>
                </>
              ) : (
                <>
                  <p><strong>Description:</strong> {t.description}</p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span style={styles[t.status.toLowerCase()]}>
                      {t.status}
                    </span>
                  </p>
                  <p><strong>Priority:</strong> {t.priority}</p>
                  <p><strong>Category:</strong> {t.category}</p>
                  <p>
                    <strong>Created:</strong>{" "}
                    {t.createdAt?.toDate().toLocaleString()}
                  </p>

                  <div style={styles.actions}>
                    <button
                      onClick={() => handleEditClick(t)}
                      style={styles.editBtn}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(t.id)}
                      style={styles.deleteBtn}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  heading: {
    fontSize: "26px",
    fontWeight: 600,
    textAlign: "center",
    marginBottom: "10px",
  },
  filterBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "8px",
    margin: "16px 0 24px",
    fontSize: "14px",
  },
  select: {
    padding: "6px 12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    background: "#f9f9f9",
    fontSize: "14px",
  },
  ticketGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "18px",
  },
  card: {
    background: "#ffffff",
    padding: "18px 20px",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.07)",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    fontSize: "14px",
    lineHeight: 1.45,
  },
  open:       { color: "#d97706", fontWeight: 600 },
  inprogress: { color: "#3b82f6", fontWeight: 600 },
  resolved:   { color: "#10b981", fontWeight: 600 },
  rejected:   { color: "#ef4444", fontWeight: 600 },

  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "8px",
  },
  editBtn: {
    background: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "5px 14px",
    fontSize: "13px",
    cursor: "pointer",
  },
  deleteBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "5px 14px",
    fontSize: "13px",
    cursor: "pointer",
  },
  saveBtn: {
    background: "#10b981",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "6px 16px",
    fontSize: "14px",
    cursor: "pointer",
    alignSelf: "flex-start",
  },

  textarea: {
    width: "100%",
    height: "80px",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    resize: "vertical",
    fontSize: "14px",
    background: "#fafafa",
  },

  empty: {
    textAlign: "center",
    color: "#777",
    fontStyle: "italic",
    marginTop: "40px",
  },
};

export default MyTickets;
