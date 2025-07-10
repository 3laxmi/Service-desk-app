
import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../firebase/config"; 
import { toast } from "react-toastify";

const RaiseTicket = () => {
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [category, setCategory] = useState("Technical");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = auth.currentUser;
      if (!user) return toast.error("User not logged in");

      const ticketData = {
        description,
        priority,
        category,
        status: "open",
        createdAt: serverTimestamp(),
        userId: user.uid,
      };

      await addDoc(collection(db, "tickets"), ticketData);

      setDescription("");
      setPriority("Low");
      setCategory("Technical");

      toast.success("Ticket Submitted!");
    } catch (error) {
      console.error("Error submitting ticket:", error);
      toast.error("Failed to submit ticket.");
    }
  };

  return (
    <div style={styles.wrapper}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.logo}>Raise Your Issue</h2>

        <textarea
          placeholder="Issue Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={styles.textarea}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={styles.select}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={styles.select}
        >
          <option>Technical</option>
          <option>Billing</option>
          <option>Account</option>
          <option>Other</option>
        </select>

        <button type="submit" style={styles.submitBtn}>
          Submit Ticket
        </button>
      </form>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    padding: "30px",
  },
  form: {
    width: "100%",
    maxWidth: "500px",
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  logo: {
    textAlign: "center",
    fontWeight: "600",
    marginBottom: "15px",
  },
  textarea: {
    width: "100%",
    height: "100px",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    resize: "none",
  },
  select: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  submitBtn: {
    backgroundColor: "#2a9d8f",
    color: "#fff",
    border: "none",
    padding: "12px",
    borderRadius: "25px",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default RaiseTicket;
