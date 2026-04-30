import React from "react";
import { ArrowLeft } from "lucide-react";

export default function PageHeader({ title, go, right }) {
  return (
    <div className="pageHeader">
      <button className="backButton" onClick={() => go("home")}>
        <ArrowLeft size={26} />
      </button>

      <h2>{title}</h2>

      <div className="headerRight">{right}</div>
    </div>
  );
}
