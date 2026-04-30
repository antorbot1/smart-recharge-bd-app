import React, { useMemo, useState } from "react";
import { CreditCard, Send } from "lucide-react";
import PageHeader from "../components/PageHeader";
import BottomNav from "../components/BottomNav";
import { PAYMENT_NUMBER } from "../data/demoData";
import { money } from "../utils/storage";

export default function AddMoney({ page, go, createMoneyRequest }) {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("bKash");
  const [sender, setSender] = useState("");
  const [trxid, setTrxid] = useState("");

  const commission = useMemo(() => 0, []);
  const total = Number(amount || 0) + commission;

  function nextStep(e) {
    e.preventDefault();

    if (!amount || Number(amount) < 10) {
      alert("কমপক্ষে ১০ টাকা লিখুন");
      return;
    }

    setStep(2);
  }

  function submitRequest(e) {
    e.preventDefault();

    if (!sender || !trxid) {
      alert("Sender number এবং Transaction ID দিন");
      return;
    }

    createMoneyRequest({
      amount: Number(amount),
      commission,
      total,
      method,
      sender,
      trxid,
    });

    alert("Add Money request পাঠানো হয়েছে। Admin approve করলে balance যোগ হবে।");
    go("home");
  }

  return (
    <div className="mobileApp">
      <PageHeader title="ব্যালেন্স যোগ করুন" go={go} />

      {step === 1 ? (
        <form className="simplePageCard" onSubmit={nextStep}>
          <div className="twoColumnBox">
            <div>
              <label>পরিমাণ</label>
              <input
                type="number"
                placeholder="পরিমাণ দিন"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div>
              <label>আপনার কমিশন</label>
              <div className="commissionBox">{money(commission)}</div>
            </div>
          </div>

          <div className="quickAmount">
            {[50, 100, 200, 500, 1000].map((item) => (
              <button type="button" key={item} onClick={() => setAmount(item)}>
                ৳{item}
              </button>
            ))}
          </div>

          <button className="primaryButton" type="submit">
            নিশ্চিত করুন
          </button>
        </form>
      ) : (
        <form className="simplePageCard" onSubmit={submitRequest}>
          <div className="paymentBox">
            <CreditCard size={28} />
            <h3>{method} Send Money</h3>
            <p>এই নাম্বারে টাকা পাঠান</p>
            <b>{PAYMENT_NUMBER}</b>
          </div>

          <div className="summaryBox">
            <p>
              Amount <b>{money(amount)}</b>
            </p>
            <p>
              Commission <b>{money(commission)}</b>
            </p>
            <p>
              Total Payable <b>{money(total)}</b>
            </p>
          </div>

          <label>Payment Method</label>
          <select value={method} onChange={(e) => setMethod(e.target.value)}>
            <option>bKash</option>
            <option>Nagad</option>
          </select>

          <label>Sender Number</label>
          <input
            type="tel"
            placeholder="যে নাম্বার থেকে টাকা পাঠিয়েছেন"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
          />

          <label>Transaction ID</label>
          <input
            placeholder="Transaction ID লিখুন"
            value={trxid}
            onChange={(e) => setTrxid(e.target.value)}
          />

          <button className="primaryButton" type="submit">
            <Send size={18} />
            Request Submit
          </button>
        </form>
      )}

      <BottomNav page={page} go={go} />
    </div>
  );
}
