import React, { useMemo, useState } from "react";
import { Wifi } from "lucide-react";
import PageHeader from "../components/PageHeader";
import BottomNav from "../components/BottomNav";
import OfferCard from "../components/OfferCard";
import AppPopup from "../components/AppPopup";
import { operators } from "../data/demoData";
import { money } from "../utils/storage";

export default function Internet({ page, go, offers, createOrder }) {
  const [operator, setOperator] = useState("Grameenphone");
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [orderNumber, setOrderNumber] = useState("");
  const [pin, setPin] = useState("");

  const [messagePopup, setMessagePopup] = useState({
    open: false,
    type: "info",
    title: "",
    message: "",
    action: null,
  });

  const internetOffers = useMemo(() => {
    return offers.filter(
      (item) => item.type === "internet" && item.operator === operator
    );
  }, [offers, operator]);

  function openOrderPopup(offer) {
    setSelectedOffer(offer);
    setOrderNumber("");
    setPin("");
  }

  function closeOrderPopup() {
    setSelectedOffer(null);
    setOrderNumber("");
    setPin("");
  }

  function showMessage(type, title, message, action = null) {
    setMessagePopup({
      open: true,
      type,
      title,
      message,
      action,
    });
  }

  function closeMessage() {
    const action = messagePopup.action;
    setMessagePopup({
      open: false,
      type: "info",
      title: "",
      message: "",
      action: null,
    });

    if (action) go(action);
  }

  function confirmOrder() {
    if (!orderNumber) {
      showMessage("error", "নাম্বার দিন", "যে নাম্বারে MB প্যাক নিবেন, সেই নাম্বার লিখুন");
      return;
    }

    if (!/^01\d{9}$/.test(orderNumber)) {
      showMessage("error", "নাম্বার ভুল", "সঠিক ১১ সংখ্যার মোবাইল নাম্বার দিন");
      return;
    }

    if (!/^\d{4}$/.test(pin)) {
      showMessage("error", "PIN ভুল", "৪ সংখ্যার PIN দিন");
      return;
    }

    const result = createOrder({
      service: "Internet",
      operator: selectedOffer.operator,
      number: orderNumber,
      title: selectedOffer.title,
      details: selectedOffer.details,
      amount: selectedOffer.price,
      pin,
    });

    closeOrderPopup();

    if (!result.ok) {
      showMessage(
        "error",
        "অর্ডার হয়নি",
        result.message,
        result.message.includes("ব্যালেন্স") ? "addMoney" : null
      );
      return;
    }

    showMessage("success", "অর্ডার হয়েছে", "MB Pack order pending হয়েছে", "statement");
  }

  return (
    <div className="mobileApp">
      <PageHeader title="এমবি প্যাক" go={go} />

      <div className="simplePageCard">
        <div className="pageIcon">
          <Wifi size={36} />
        </div>

        <label>অপারেটর সিলেক্ট করুন</label>
        <select value={operator} onChange={(e) => setOperator(e.target.value)}>
          {operators.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="offerList">
        {internetOffers.length === 0 ? (
          <div className="emptyBox">এই অপারেটরে এখন কোনো MB অফার নেই</div>
        ) : (
          internetOffers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} onBuy={openOrderPopup} />
          ))
        )}
      </div>

      <AppPopup
        open={!!selectedOffer}
        type="info"
        title="MB Pack Order"
        message={selectedOffer ? `${selectedOffer.title} • ${money(selectedOffer.price)}` : ""}
        onClose={closeOrderPopup}
        onConfirm={confirmOrder}
        confirmText="Confirm Order"
        cancelText="বন্ধ করুন"
      >
        <div>
          <label>মোবাইল নাম্বার</label>
          <input
            type="tel"
            placeholder="01XXXXXXXXX"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value.replace(/\D/g, ""))}
            maxLength="11"
          />
        </div>

        <div>
          <label>৪ সংখ্যার PIN</label>
          <input
            type="password"
            inputMode="numeric"
            placeholder="PIN দিন"
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
            maxLength="4"
          />
        </div>

        {selectedOffer && (
          <div className="popupMiniSummary">
            <p>
              Pack <b>{selectedOffer.details}</b>
            </p>
            <p>
              Price <b>{money(selectedOffer.price)}</b>
            </p>
          </div>
        )}
      </AppPopup>

      <AppPopup
        open={messagePopup.open}
        type={messagePopup.type}
        title={messagePopup.title}
        message={messagePopup.message}
        onClose={closeMessage}
        confirmText={messagePopup.action === "addMoney" ? "Add Money করুন" : "ঠিক আছে"}
      />

      <BottomNav page={page} go={go} />
    </div>
  );
}

