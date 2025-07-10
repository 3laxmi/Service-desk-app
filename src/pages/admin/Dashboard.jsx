import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";

const Dashboard = () => {
  const [ticketStats, setTicketStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    resolved: 0,
    rejected: 0,
  });

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "tickets"), (snapshot) => {
      const counts = {
        total: snapshot.size,
        open: 0,
        inProgress: 0,
        resolved: 0,
        rejected: 0,
      };

      snapshot.docs.forEach((doc) => {
        const raw = doc.data().status || "";
        const key = normaliseStatus(raw);   

        if (key && key in counts) counts[key]++;
      });

      setTicketStats(counts);
    });

    return () => unsub();
  }, []);

  return (
    <div>
      <h2>Ticket Overview</h2>
      <div style={styles.grid}>
        {Object.entries(ticketStats).map(([key, val]) => (
          <div key={key} style={styles.card}>
            <h3>{formatLabel(key)}</h3>
            <p>{val}</p>
          </div>
        ))}
      </div>
    </div>
  );
};



// Convert "Open", "open", "OPEN" → "open"
// Convert "In Progress", "in-progress" → "inProgress"
const normaliseStatus = (str) => {
  const s = str.toLowerCase().replace(/\s+/g, ""); 
  if (s === "open") return "open";
  if (s === "inprogress" || s === "in-progress") return "inProgress";
  if (s === "resolved") return "resolved";
  if (s === "rejected") return "rejected";
  return null; // unknown status
};

const formatLabel = (key) =>
  key === "inProgress"
    ? "IN PROGRESS"
    : key.toUpperCase();

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
    textAlign: "center",
  },
};

export default Dashboard;
