import React, { useState } from "react";
import { Send, Smartphone } from "lucide-react";
import PageHeader from "../components/PageHeader";
import BottomNav from "../components/BottomNav";
import AppPopup from "../components/AppPopup";
import { operators } from "../data/demoData";
import { money } from "../utils/storage";

export default function Recharge({ page, go, createOrder }) {
  const [number, setNumber] = useState("");
  const [operator, setOperator] = useState("Grameenphone");
  const [simType, setSimType] = useState("Prepaid");
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");

  const [popup, setPopup] = useState({
    open: false,
    type: "info",
    title: "",
    message: "",
    action: null,
  });

  function showPopup(type, title, message, action = null) {
    setPopup({
      open: true,
      type,
      title,
      message,
      action,
    });
  }

  function closePopup() {
    setPopup({
      open: false,
      type: "info",
      title: "",
      message: "",
      action: null,
    });
  }

  function submitRecharge(e) {
    e.preventDefault();

    if (!number || !operator || !amount || !pin) {
      showPopup("error", "তথ্য অসম্পূর্ণ", "সব তথ্য পূরণ করুন");
      return;
    }

    if (!/^01\d{9}$/.test(number)) {
      showPopup("error", "নাম্বার ভুল", "সঠিক ১১ সংখ্যার মোবাইল নাম্বার দিন");
      return;
    }

    if (Number(amount) < 10) {
      showPopup("error", "পরিমাণ কম", "কমপক্ষে ১০ টাকা রিচার্জ করতে হবে");
      return;
    }

    if (!/^\d{4}$/.test(pin)) {
      showPopup("error", "PIN ভুল", "৪ সংখ্যার PIN দিন");
      return;
    }

    const result = createOrder({
      service: "Recharge",
      operator,
      number,
      title: `${operator} ${simType} Recharge`,
      details: `Mobile Recharge ${money(amount)}`,
      amount: Number(amount),
      pin,
    });

    if (!result.ok) {
      showPopup("error", "অর্ডার হয়নি", result.message, result.message.includes("ব্যালেন্স") ? "addMoney" : null);
      return;
    }

    showPopup("success", "অর্ডার হয়েছে", "Recharge order pending হয়েছে", "statement");
  }

  return (
    <div className="mobileApp">
      <PageHeader title="মোবাইল রিচার্জ" go={go} />

      <form className="simplePageCard" onSubmit={submitRecharge}>
        <div className="pageIcon">
          <Smartphone size={36} />
        </div>

        <label>মোবাইল নাম্বার</label>
        <input
          type="tel"
          placeholder="01XXXXXXXXX"
          value={number}
          onChange={(e) => setNumber(e.target.value.replace(/\D/g, ""))}
          maxLength="11"
        />

        <label>অপারেটর</label>
        <select value={operator} onChange={(e) => setOperator(e.target.value)}>
          {operators.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <label>সিম টাইপ</label>
        <div className="selectPills">
          <button
            type="button"
            className={simType === "Prepaid" ? "active" : ""}
            onClick={() => setSimType("Prepaid")}
          >
            প্রিপেইড
          </button>

          <button
            type="button"
            className={simType === "Postpaid" ? "active" : ""}
            onClick={() => setSimType("Postpaid")}
          >
            পোস্টপেইড
          </button>
        </div>

        <label>পরিমাণ</label>
        <input
          type="number"
          placeholder="কত টাকা রিচার্জ করবেন"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <div className="quickAmount">
          {[20, 50, 100, 200, 500, 1000].map((item) => (
            <button type="button" key={item} onClick={() => setAmount(item)}>
              ৳{item}
            </button>
          ))}
        </div>

        <div className="summaryBox">
          <p>
            Recharge Amount <b>{money(amount)}</b>
          </p>
          <p>
            Charge <b>{money(0)}</b>
          </p>
          <p>
            Total Cut <b>{money(amount)}</b>
          </p>
        </div>

        <label>৪ সংখ্যার PIN</label>
        <input
          type="password"
          inputMode="numeric"
          placeholder="PIN দিন"
          value={pin}
          onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
          maxLength="4"
        />

        <button className="primaryButton" type="submit">
          <Send size={18} />
          রিচার্জ নিশ্চিত করুন
        </button>
      </form>

      <AppPopup
        open={popup.open}
        type={popup.type}
        title={popup.title}
        message={popup.message}
        onClose={() => {
          const action = popup.action;
          closePopup();
          if (action) go(action);
        }}
        confirmText={popup.action === "addMoney" ? "Add Money করুন" : "ঠিক আছে"}
      />

      <BottomNav page={page} go={go} />
    </div>
  );
}
