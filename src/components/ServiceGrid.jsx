import React from "react";
import {
  Smartphone,
  Wifi,
  Phone,
  Package,
  Wallet,
  FileText,
  Bot,
  User,
} from "lucide-react";
import { services } from "../data/demoData";

const iconMap = {
  recharge: Smartphone,
  internet: Wifi,
  minute: Phone,
  bundle: Package,
  addMoney: Wallet,
  statement: FileText,
  help: Bot,
  profile: User,
};

export default function ServiceGrid({ go }) {
  return (
    <div className="serviceGrid">
      {services.map((item) => {
        const Icon = iconMap[item.id];

        return (
          <button
            key={item.id}
            className="serviceItem"
            onClick={() => go(item.id)}
          >
            <div className="serviceIcon">
              <Icon size={28} />
            </div>

            <span>{item.name}</span>
          </button>
        );
      })}
    </div>
  );
}
