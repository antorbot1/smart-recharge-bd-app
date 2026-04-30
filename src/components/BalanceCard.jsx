import React from "react";
import { Wallet } from "lucide-react";
import { money } from "../utils/storage";

export default function BalanceCard({ currentUser, go }) {
  return (
    <div className="balanceCard">
      <div>
        <p>আপনার ব্যালেন্স</p>
        <h1>{money(currentUser?.balance)}</h1>
        <span>Recharge, MB, Minute, Bundle কিনতে পারবেন</span>
      </div>

      <button onClick={() => go("addMoney")}>
        <Wallet size={20} />
        ব্যালেন্স যোগ
      </button>
    </div>
  );
}
