import React from "react";
import { Clock, Wallet } from "lucide-react";
import PageHeader from "../components/PageHeader";
import BottomNav from "../components/BottomNav";
import { money } from "../utils/storage";

export default function Statement({ page, go, orders, moneyRequests, currentUser }) {
  const userOrders = orders.filter((item) => item.userPhone === currentUser.phone);
  const userMoneyRequests = moneyRequests.filter(
    (item) => item.userPhone === currentUser.phone
  );

  const history = [
    ...userMoneyRequests.map((item) => ({
      id: "m" + item.id,
      title: "Balance Add Request",
      details: `${item.method} • TrxID: ${item.trxid}`,
      amount: item.amount,
      status: item.status,
      time: item.createdAt,
      type: "money",
    })),
    ...userOrders.map((item) => ({
      id: "o" + item.id,
      title: item.title,
      details: `${item.operator} • ${item.number} • ${item.details}`,
      amount: item.amount,
      status: item.status,
      time: item.createdAt,
      type: "order",
    })),
  ].sort((a, b) => Number(b.id.slice(1)) - Number(a.id.slice(1)));

  return (
    <div className="mobileApp">
      <PageHeader title="স্টেটমেন্ট" go={go} />

      <div className="statementBalance">
        <p>বর্তমান ব্যালেন্স</p>
        <h2>{money(currentUser.balance)}</h2>
      </div>

      <div className="historyList">
        {history.length === 0 ? (
          <div className="emptyBox">এখনো কোনো স্টেটমেন্ট নেই</div>
        ) : (
          history.map((item) => (
            <div className="historyItem" key={item.id}>
              <div className="historyIcon">
                {item.type === "money" ? <Wallet size={22} /> : <Clock size={22} />}
              </div>

              <div className="historyText">
                <h3>{item.title}</h3>
                <p>{item.details}</p>
                <small>{item.time}</small>
              </div>

              <div className="historyAmount">
                <b>{item.type === "money" ? "+" : "-"}{money(item.amount)}</b>
                <span className={`status ${item.status.toLowerCase()}`}>
                  {item.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <BottomNav page={page} go={go} />
    </div>
  );
}
