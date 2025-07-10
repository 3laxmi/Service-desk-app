
import React, { useState } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify"; 

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      let role = "user";

      if (!docSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          role: "user",
          createdAt: new Date(),
        });
      } else {
        role = docSnap.data().role;
      }

      localStorage.setItem(
        "user",
        JSON.stringify({ uid: user.uid, email: user.email, role })
      );

      toast.success("Logged in with Google!");
      role === "admin" ? navigate("/admin/dashboard") : navigate("/dashboard");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      toast.error("Google login failed: " + error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const role = docSnap.data().role;

        localStorage.setItem(
          "user",
          JSON.stringify({ uid: user.uid, email: user.email, role })
        );

        toast.success("Login successful!");
        role === "admin" ? navigate("/admin/dashboard") : navigate("/dashboard");
      } else {
        toast.warning("No user role found. Please contact support.");
      }
    } catch (error) {
      console.error("Login Error:", error.message);
      toast.error("Login failed: " + error.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.circle}></div>
        <h2 style={styles.title}>Log in</h2>

        <button style={styles.googleBtn} onClick={handleGoogleLogin}>
          <img
            src="https://img.icons8.com/color/16/000000/google-logo.png"
            alt="Google icon"
            style={{ marginRight: 8 }}
          />
          Continue with Google
        </button>

        <div style={styles.divider}>
          <hr style={styles.line} />
          <span style={styles.or}>OR</span>
          <hr style={styles.line} />
        </div>

        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />

          <div style={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
            <span
              style={styles.toggle}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <div style={styles.options}>
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#" style={styles.forgot}>
              Forgot password?
            </a>
          </div>

          <button type="submit" style={styles.loginBtn}>
            Log in
          </button>

          <p style={{ textAlign: "center", marginTop: "1rem" }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "#4CAF50", fontWeight: "bold" }}>
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    padding: "20px",
  },
  card: {
    background: "#fff",
    borderRadius: 12,
    padding: "30px 20px",
    maxWidth: 400,
    width: "100%",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    backgroundColor: "#ccc",
    margin: "0 auto 20px",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "600",
  },
  googleBtn: {
    width: "100%",
    padding: "10px",
    borderRadius: 24,
    border: "1px solid #ccc",
    background: "#fff",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  divider: {
    display: "flex",
    alignItems: "center",
    marginBottom: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
    border: "none",
  },
  or: {
    margin: "0 10px",
    fontSize: 12,
    color: "#888",
  },
  form: {
    width: "100%",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: 8,
    border: "1px solid #ccc",
    marginBottom: 15,
    fontSize: 14,
  },
  passwordWrapper: {
    position: "relative",
  },
  toggle: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    fontSize: 12,
    color: "#888",
  },
  options: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 12,
    marginBottom: 15,
  },
  forgot: {
    color: "#007bff",
    textDecoration: "none",
  },
  loginBtn: {
    width: "100%",
    padding: "10px",
    borderRadius: 24,
    backgroundColor: "#4CAF50",
    color: "#fff",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
  },
};

export default Login;
