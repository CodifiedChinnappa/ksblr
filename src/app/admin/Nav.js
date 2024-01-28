"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./admin.scss";

const Nav = () => {
  const router = useRouter();

  const handleLogOut = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    router.push("/admin");
  };

  return (
    <nav className="adminNav">
      <Link href="/admin/teams">Teams</Link>
      <Link href="/admin/scheduler">Schedule</Link>
      <Link href="/admin/score-update">Update</Link>
      <button type="button" onClick={handleLogOut}>
        Logout
      </button>
    </nav>
  );
};

export default Nav;
