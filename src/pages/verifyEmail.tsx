import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

import logo from "../assets/logo.png";

const baseURL = import.meta.env.VITE_API_URL;

const VerifyEmail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      setMessage("Missing token.");
      return;
    }

    const verify = async () => {
      try {
        const res = await axios.get(
          `${baseURL}/api/auth/verify-email?token=${token}`
        );
        alert(res.data?.message);
        setStatus("success");
        setMessage(
          "✅ Your email has been verified. You can now return to the app and log in."
        );
      } catch (err) {
        console.log(err);
        setStatus("error");
        if (axios.isAxiosError(err)) {
          setMessage(
            err.response?.data?.message ||
              "❌ Server Error!! Please Verify Email Again"
          );
        } else {
          setMessage("❌ An unexpected error occurred.");
        }
      }
    };

    verify();
  }, [searchParams]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img
          src={logo}
          alt="App Logo"
          style={styles.logo}
        />
        <h2>Email Verification</h2>
        <p
          style={{
            ...styles.message,
            color:
              status === "success"
                ? "green"
                : status === "error"
                ? "crimson"
                : "#333",
          }}>
          {message}
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: "#6C63FF",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: "1rem",
    paddingRight: "1rem",
  },
  card: {
    backgroundColor: "white",
    padding: "2rem 2.5rem",
    borderRadius: "10px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
    maxWidth: "400px",
    width: "100%",
    textAlign: "center",
  },
  logo: {
    width: "120px",
    height: "120px",
  },
  message: {
    fontSize: "1.1rem",
    marginTop: "1rem",
  },
};
