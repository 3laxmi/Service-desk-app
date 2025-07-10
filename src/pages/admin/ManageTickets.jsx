import React, { useEffect, useState } from "react";
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";
const ManageTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "tickets"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTickets(data);
    });
    return () => unsub();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    const ticketRef = doc(db, "tickets", id);
    await updateDoc(ticketRef, { status: newStatus });
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>Manage Tickets</h2>
      <div style={styles.table}>
        {tickets.map((ticket) => (
          <div key={ticket.id} style={styles.card}>
            <p><strong>User:</strong> {ticket.email}</p>
            <p><strong>Description:</strong> {ticket.description}</p>
            <p><strong>Priority:</strong> {ticket.priority}</p>
            <p><strong>Category:</strong> {ticket.category}</p>
            <p><strong>Status:</strong> {ticket.status}</p>
            <select
              value={ticket.status}
              onChange={(e) => handleStatusChange(ticket.id, e.target.value)}
              style={styles.select}
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
                <option value="Rejected">Rejected</option>
            </select>
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
  select: {
    padding: "8px",
    marginTop: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
};

export default ManageTickets;

