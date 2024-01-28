"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./login.scss";
import axios from "axios";
import Spinner from "@/components/spinner/spinner";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.push("/admin/teams");
    }
  }, [router]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/user/login", {
        username,
        password,
      });

      if (response.data.message === "Invalid credentials") {
        return  setError(response.data.message)
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("token", response.data.token);
      }

      router.push("/admin/teams");
    } catch (error) {
      console.error("Error during login:", error);
    } finally{
    setLoading(false);

    }
  };

  return (
    <div className="loginWrapper">
      <div className="loginContainer">
        <h1>Login</h1>
        <label>
          Username:
          <input
            autoComplete="off"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
        </label>
        {loading ? <Spinner /> : <button onClick={handleLogin}>Login</button>}
        {error ? <p style={{color:"red",marginTop:"1rem"}}>{error}</p> :null}
      </div>
    </div>
  );
};

export default Login;
