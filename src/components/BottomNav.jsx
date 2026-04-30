import React from "react";
import { Home, Megaphone, Smartphone, FileText, User } from "lucide-react";

export default function BottomNav({ page, go }) {
  return (
    <div className="bottomNav">
      <button
        className={page === "home" ? "active" : ""}
        onClick={() => go("home")}
      >
        <Home size={22} />
        <span>হোম</span>
      </button>

      <button>
        <Megaphone size={22} />
        <span>ক্যাম্পেইন</span>
      </button>

      <button className="middleButton" onClick={() => go("recharge")}>
        <Smartphone size={32} />
      </button>

      <button
        className={page === "statement" ? "active" : ""}
        onClick={() => go("statement")}
      >
        <FileText size={22} />
        <span>স্টেটমেন্ট</span>
      </button>

      <button
        className={page === "profile" ? "active" : ""}
        onClick={() => go("profile")}
      >
        <User size={22} />
        <span>প্রোফাইল</span>
      </button>
    </div>
  );
}
