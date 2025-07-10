import React from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import welcomeAnimation from "../assets/animationns/welcom.json";

const Welcome = () => {
  return (
    <div style={{ fontFamily: "Segoe UI, sans-serif", backgroundColor: "#f9f9f9" }}>
      <header
        style={{
          background: "#fff",
          padding: "1rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <div style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#007bff" }}>
          ServiceDesk
        </div>
        <nav>
          <Link
            to="/login"
            style={{
              marginRight: "1rem",
              textDecoration: "none",
              fontWeight: 500,
              color: "#333",
            }}
          >
            Login
          </Link>
          <Link
            to="/register"
            style={{
              backgroundColor: "#4CAF50",
              color: "#fff",
              padding: "8px 16px",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            Register
          </Link>
        </nav>
      </header>
      <section
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "4rem 2rem",
          background: "linear-gradient(to right, #e3f2fd, #fff)",
        }}
      >
        <div style={{ flex: 1, minWidth: 300, marginRight: "2rem" }}>
          <h1 style={{ fontSize: "2.8rem", color: "#333", marginBottom: "1rem" }}>
            Smart IT Support<br />For Your Team
          </h1>
          <p style={{ fontSize: "1.1rem", color: "#555", marginBottom: "1.5rem" }}>
            Raise, track, and resolve support tickets in one smart service desk.
          </p>
          <div>
            <Link
              to="/login"
              style={{
                backgroundColor: "#007bff",
                color: "#fff",
                padding: "10px 20px",
                textDecoration: "none",
                marginRight: "1rem",
                borderRadius: "6px",
                fontWeight: "bold",
              }}
            >
              Get Started
            </Link>
            <Link
              to="/register"
              style={{
                backgroundColor: "#4CAF50",
                color: "#fff",
                padding: "10px 20px",
                textDecoration: "none",
                borderRadius: "6px",
                fontWeight: "bold",
              }}
            >
              Create Account
            </Link>
          </div>
        </div>
       <div style={{ flex: 1, minWidth: 300, textAlign: "center" }}>
  <Lottie
    animationData={welcomeAnimation}
    loop
    style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}
  />
</div>
      </section>
      <section style={{ padding: "3rem 2rem", backgroundColor: "#fff", textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "2rem", color: "#333" }}>
          Our Services
        </h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "1.5rem",
          }}
        >
          {[
            {
              title: "Raise Tickets",
              desc: "Submit your issue quickly and track progress in real time.",
            },
            {
              title: "Admin Dashboard",
              desc: "Assign, monitor and manage user tickets from one place.",
            },
            {
              title: "Track Status",
              desc: "Stay updated on the resolution progress of your tickets.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              style={{
                background: "#e3f2fd",
                padding: "1.5rem",
                borderRadius: "10px",
                width: "280px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              <h3 style={{ marginBottom: "0.5rem", color: "#007bff" }}>{feature.title}</h3>
              <p style={{ color: "#555", fontSize: "0.95rem" }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <footer
        style={{
          padding: "1.5rem 2rem",
          textAlign: "center",
          backgroundColor: "#222",
          color: "white",
        }}
      >
        &copy; {new Date().getFullYear()} ServiceDesk. All rights reserved.
      </footer>
    </div>
  );
};

export default Welcome;
