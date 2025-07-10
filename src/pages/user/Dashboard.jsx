import React, { useEffect, useState } from "react";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { auth } from "../../firebase/config";

const Dashboard = () => {
  const [ticketStats, setTicketStats] = useState({
    open: 0,
    inProgress: 0,
    resolved: 0,
    rejected: 0,
  });

  const db = getFirestore();

  useEffect(() => {
    const fetchTickets = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const ticketsRef = collection(db, "tickets");
      const q = query(ticketsRef, where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);

      let open = 0,
        inProgress = 0,
        resolved = 0,
        rejected = 0;

      querySnapshot.forEach((doc) => {
        const raw = doc.data().status || "";
        const status = normalizeStatus(raw);
        if (status === "open") open++;
        else if (status === "inProgress") inProgress++;
        else if (status === "resolved") resolved++;
        else if (status === "rejected") rejected++;
      });

      setTicketStats({ open, inProgress, resolved, rejected });
    };

    fetchTickets();
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

const normalizeStatus = (str) => {
  const s = str.toLowerCase().replace(/\s+/g, "");
  if (s === "open") return "open";
  if (s === "inprogress" || s === "in-progress") return "inProgress";
  if (s === "resolved") return "resolved";
  if (s === "rejected") return "rejected";
  return null;
};

const formatLabel = (key) =>
  key === "inProgress" ? "IN PROGRESS" : key.toUpperCase();
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
