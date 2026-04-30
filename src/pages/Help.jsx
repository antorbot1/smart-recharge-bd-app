import React, { useState } from "react";
import { Bot, MessageCircle, Send } from "lucide-react";
import PageHeader from "../components/PageHeader";
import BottomNav from "../components/BottomNav";
import { WHATSAPP_NUMBER } from "../data/demoData";

export default function Help({ page, go }) {
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "আসসালামু আলাইকুম, আমি Smart Recharge BD AI Help Robot। কী সমস্যা বলুন?",
    },
  ]);

  const [text, setText] = useState("");

  function sendMessage(e) {
    e.preventDefault();

    if (!text.trim()) return;

    const question = text.toLowerCase();
    let answer = "আপনার সমস্যাটি বুঝেছি। বেশি সমস্যা হলে WhatsApp Support এ যোগাযোগ করুন।";

    if (question.includes("টাকা") || question.includes("balance") || question.includes("add")) {
      answer = "ব্যালেন্স যোগ করতে Add Money পেজে গিয়ে পরিমাণ দিন, তারপর bKash/Nagad নাম্বারে টাকা পাঠিয়ে Transaction ID submit করুন।";
    }

    if (question.includes("রিচার্জ") || question.includes("recharge")) {
      answer = "রিচার্জ করতে আপনার একাউন্টে ব্যালেন্স থাকতে হবে। তারপর Recharge পেজে নাম্বার, অপারেটর, টাকা এবং ৪ সংখ্যার PIN দিন।";
    }

    if (question.includes("pin")) {
      answer = "PIN হলো আপনার ৪ সংখ্যার নিরাপত্তা কোড। রিচার্জ, MB, মিনিট বা বান্ডেল কিনতে PIN লাগবে।";
    }

    if (question.includes("pending")) {
      answer = "Pending মানে আপনার request admin দেখছে। কাজ শেষ হলে status Complete বা Approved হবে।";
    }

    setMessages([
      ...messages,
      { from: "me", text },
      { from: "bot", text: answer },
    ]);

    setText("");
  }

  return (
    <div className="mobileApp">
      <PageHeader title="AI Help Center" go={go} />

      <div className="helpRobotCard">
        <div className="robotIcon">
          <Bot size={44} />
        </div>

        <h2>Smart AI Robot</h2>
        <p>রিচার্জ, ব্যালেন্স, PIN বা অর্ডার সমস্যা হলে এখানে লিখুন</p>
      </div>

      <div className="chatBox">
        {messages.map((item, index) => (
          <div
            key={index}
            className={item.from === "bot" ? "botMessage" : "userMessage"}
          >
            {item.text}
          </div>
        ))}
      </div>

      <form className="chatForm" onSubmit={sendMessage}>
        <input
          placeholder="আপনার সমস্যা লিখুন"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button type="submit">
          <Send size={20} />
        </button>
      </form>

      <a
        className="whatsappButton"
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noreferrer"
      >
        <MessageCircle size={22} />
        WhatsApp Support
      </a>

      <BottomNav page={page} go={go} />
    </div>
  );
}
