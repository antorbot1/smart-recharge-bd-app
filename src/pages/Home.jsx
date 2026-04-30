import React from "react";
import { ShieldCheck } from "lucide-react";
import TopBar from "../components/TopBar";
import BalanceCard from "../components/BalanceCard";
import ServiceGrid from "../components/ServiceGrid";
import BottomNav from "../components/BottomNav";

export default function Home({ page, go, currentUser }) {
  return (
    <div className="mobileApp">
      <TopBar currentUser={currentUser} go={go} />

      <div className="noticeCard">
        <ShieldCheck size={20} />
        <span>অভিনন্দন! আপনার একাউন্টটি অনুমোদিত হয়েছে</span>
      </div>

      <BalanceCard currentUser={currentUser} go={go} />

      <div className="promoCard">
        <div>
          <small>Smart Recharge BD</small>
          <h2>Recharge, MB, Minute এখন আরও সহজ</h2>
          <p>আপনার একাউন্ট ব্যালেন্স থেকে দ্রুত সার্ভিস কিনুন</p>
        </div>
      </div>

      <ServiceGrid go={go} />

      <div className="homeInfoCard">
        <h3>আজকের নোটিশ</h3>
        <p>
          রিচার্জ, এমবি, মিনিট বা বান্ডেল কিনতে হলে আপনার ৪ সংখ্যার PIN দিতে হবে।
          ভুল নাম্বারে রিচার্জ হলে কর্তৃপক্ষ দায়ী থাকবে না।
        </p>
      </div>

      <BottomNav page={page} go={go} />
    </div>
  );
}
