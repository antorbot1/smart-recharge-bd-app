import React, { useMemo, useState } from "react";
import { ArrowLeft, Lock, Mail, MapPin, Phone, User } from "lucide-react";
import { districtMap, districts } from "../data/demoData";

export default function Register({ go, register }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    district: "",
    thana: "",
    password: "",
    confirmPassword: "",
    pin: "",
    confirmPin: "",
  });

  const thanas = useMemo(() => {
    return form.district ? districtMap[form.district] || [] : [];
  }, [form.district]);

  function update(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "district" ? { thana: "" } : {}),
    }));
  }

  function handleRegister(e) {
    e.preventDefault();

    if (!form.name || !form.phone || !form.district || !form.thana || !form.password || !form.pin) {
      alert("সব প্রয়োজনীয় তথ্য পূরণ করুন");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("পাসওয়ার্ড মিলছে না");
      return;
    }

    if (!/^\d{4}$/.test(form.pin)) {
      alert("PIN অবশ্যই ৪ সংখ্যার হতে হবে");
      return;
    }

    if (form.pin !== form.confirmPin) {
      alert("PIN মিলছে না");
      return;
    }

    const result = register(form);

    if (!result.ok) {
      alert(result.message);
    }
  }

  return (
    <div className="authPage">
      <div className="authCard wide">
        <button className="authBack" onClick={() => go("login")}>
          <ArrowLeft size={22} />
        </button>

        <h1>নতুন একাউন্ট</h1>
        <p>আপনার তথ্য দিয়ে Smart Recharge BD একাউন্ট খুলুন</p>

        <form onSubmit={handleRegister}>
          <div className="registerGrid">
            <div className="inputGroup">
              <User size={20} />
              <input
                placeholder="আপনার নাম"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
              />
            </div>

            <div className="inputGroup">
              <Phone size={20} />
              <input
                type="tel"
                placeholder="মোবাইল নাম্বার"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
              />
            </div>

            <div className="inputGroup">
              <Mail size={20} />
              <input
                type="email"
                placeholder="ই-মেইল"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
              />
            </div>

            <div className="inputGroup">
              <MapPin size={20} />
              <select
                value={form.district}
                onChange={(e) => update("district", e.target.value)}
              >
                <option value="">জেলা সিলেক্ট করুন</option>
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            <div className="inputGroup">
              <MapPin size={20} />
              <select
                value={form.thana}
                onChange={(e) => update("thana", e.target.value)}
                disabled={!form.district}
              >
                <option value="">থানা/উপজেলা সিলেক্ট করুন</option>
                {thanas.map((thana) => (
                  <option key={thana} value={thana}>
                    {thana}
                  </option>
                ))}
              </select>
            </div>

            <div className="inputGroup">
              <Lock size={20} />
              <input
                type="password"
                placeholder="পাসওয়ার্ড"
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
              />
            </div>

            <div className="inputGroup">
              <Lock size={20} />
              <input
                type="password"
                placeholder="পাসওয়ার্ড আবার দিন"
                value={form.confirmPassword}
                onChange={(e) => update("confirmPassword", e.target.value)}
              />
            </div>

            <div className="inputGroup">
              <Lock size={20} />
              <input
                type="password"
                inputMode="numeric"
                maxLength="4"
                placeholder="৪ সংখ্যার PIN"
                value={form.pin}
                onChange={(e) => update("pin", e.target.value.replace(/\D/g, ""))}
              />
            </div>

            <div className="inputGroup">
              <Lock size={20} />
              <input
                type="password"
                inputMode="numeric"
                maxLength="4"
                placeholder="PIN আবার দিন"
                value={form.confirmPin}
                onChange={(e) => update("confirmPin", e.target.value.replace(/\D/g, ""))}
              />
            </div>
          </div>

          <button className="primaryButton" type="submit">
            একাউন্ট তৈরি করুন
          </button>
        </form>

        <button className="textButton" onClick={() => go("login")}>
          আগে একাউন্ট আছে? লগইন করুন
        </button>
      </div>
    </div>
  );
}
