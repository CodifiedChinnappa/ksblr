"use client";
import Image from "next/image";
import Sidebar from "../sidebar/Sidebar";
import "./navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      {/* Sidebar */}
      <Sidebar />
      <div className="wrapper">
        <div className="social">
          <Image
            className="image"
            src="/logo.png"
            width={100}
            height={80}
            alt="ksblr.in"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
