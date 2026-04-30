import React, { useState } from "react";
import { LogOut, Save, User } from "lucide-react";
import PageHeader from "../components/PageHeader";
import BottomNav from "../components/BottomNav";
import { districtMap, districts } from "../data/demoData";

export default function Profile({ page, go, currentUser, updateUser, logout }) {
  const [form, setForm] = useState({
    name: currentUser.name || "",
    email: currentUser.email || "",
    district: currentUser.district || "",
    thana: currentUser.thana || "",
  });

  const thanas = form.district ? districtMap[form.district] || [] : [];

  function update(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "district" ? { thana: "" } : {}),
    }));
  }

  function saveProfile(e) {
    e.preventDefault();

    if (!form.name || !form.district || !form.thana) {
      alert("নাম, জেলা ও থানা সিলেক্ট করুন");
      return;
    }

    updateUser(form);
    alert("Profile update হয়েছে");
    go("home");
  }

  return (
    <div className="mobileApp">
      <PageHeader title="প্রোফাইল" go={go} />

      <div className="profileCard">
        <div className="profileAvatar">
          <User size={42} />
        </div>

        <h2>{currentUser.name}</h2>
        <p>{currentUser.phone}</p>
      </div>

      <form className="simplePageCard" onSubmit={saveProfile}>
        <label>নাম</label>
        <input
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="আপনার নাম"
        />

        <label>ই-মেইল</label>
        <input
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="ই-মেইল"
        />

        <label>জেলা</label>
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

        <label>থানা/উপজেলা</label>
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

        <button className="primaryButton" type="submit">
          <Save size={18} />
          Save Profile
        </button>

        <button className="logoutButton" type="button" onClick={logout}>
          <LogOut size={18} />
          Logout
        </button>
      </form>

      <BottomNav page={page} go={go} />
    </div>
  );
}
