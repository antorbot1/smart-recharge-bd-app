import React, { useState } from "react";
import { Lock, Phone, Zap } from "lucide-react";

export default function Login({ go, login }) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    if (!phone || !password) {
      alert("মোবাইল নাম্বার ও পাসওয়ার্ড দিন");
      return;
    }

    const result = login(phone, password);

    if (!result.ok) {
      alert(result.message);
    }
  }

  return (
    <div className="authPage">
      <div className="authCard">
        <div className="brandLogo">
          <Zap size={44} />
        </div>

        <h1>Smart Recharge BD</h1>
        <p>Recharge • MB • Minute • Bundle</p>

        <form onSubmit={handleLogin}>
          <div className="inputGroup">
            <Phone size={20} />
            <input
              type="tel"
              placeholder="মোবাইল নাম্বার"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="inputGroup">
            <Lock size={20} />
            <input
              type="password"
              placeholder="পাসওয়ার্ড"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="primaryButton" type="submit">
            লগইন করুন
          </button>
        </form>

        <button className="textButton" onClick={() => go("register")}>
          নতুন একাউন্ট খুলুন
        </button>

        <small className="poweredText">Powered by Smart Recharge BD</small>
      </div>
    </div>
  );
}
