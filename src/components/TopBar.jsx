import React from "react";
import { Bell, Grid2X2 } from "lucide-react";

export default function TopBar({ currentUser, go }) {
  return (
    <div className="topBar">
      <button className="profileMini" onClick={() => go("profile")}>
        <div className="avatar">
          {currentUser?.name?.charAt(0)?.toUpperCase() || "U"}
        </div>

        <div className="profileText">
          <small>{currentUser?.phone}</small>
          <h2>{currentUser?.name}</h2>
        </div>
      </button>

      <div className="topIcons">
        <button>
          <Bell size={28} />
        </button>

        <button>
          <Grid2X2 size={28} />
        </button>
      </div>
    </div>
  );
}
