// Import necessary modules and styles
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import "./admin.scss";

const Auth = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/admin");
    }
  }, [router]);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default Auth;
