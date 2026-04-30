import React, { useEffect, useMemo, useState } from "react";
import { ADMIN_PASSWORD, ADMIN_PHONE, demoOffers } from "./data/demoData";
import {
  clearCurrentUser,
  getCurrentUser,
  getPage,
  loadData,
  saveData,
  setCurrentUser,
  setPage,
} from "./utils/storage";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AddMoney from "./pages/AddMoney";
import Recharge from "./pages/Recharge";
import Internet from "./pages/Internet";
import Minute from "./pages/Minute";
import Bundle from "./pages/Bundle";
import Statement from "./pages/Statement";
import Help from "./pages/Help";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";

export default function App() {
  const [page, setCurrentPage] = useState(getPage());
  const [currentPhone, setCurrentPhoneState] = useState(getCurrentUser());

  const [users, setUsers] = useState(() => loadData("sr_users", []));
  const [offers, setOffers] = useState(() => loadData("sr_offers", demoOffers));
  const [orders, setOrders] = useState(() => loadData("sr_orders", []));
  const [moneyRequests, setMoneyRequests] = useState(() =>
    loadData("sr_money_requests", [])
  );

  const currentUser = useMemo(() => {
    return users.find((user) => user.phone === currentPhone);
  }, [users, currentPhone]);

  useEffect(() => {
    saveData("sr_users", users);
  }, [users]);

  useEffect(() => {
    saveData("sr_offers", offers);
  }, [offers]);

  useEffect(() => {
    saveData("sr_orders", orders);
  }, [orders]);

  useEffect(() => {
    saveData("sr_money_requests", moneyRequests);
  }, [moneyRequests]);

  function go(nextPage) {
    setCurrentPage(nextPage);
    setPage(nextPage);
  }

  function login(phone, password) {
    if (phone === ADMIN_PHONE && password === ADMIN_PASSWORD) {
      go("admin");
      return { ok: true };
    }

    const user = users.find(
      (item) => item.phone === phone && item.password === password
    );

    if (!user) {
      return {
        ok: false,
        message: "মোবাইল নাম্বার বা পাসওয়ার্ড ভুল",
      };
    }

    setCurrentUser(user.phone);
    setCurrentPhoneState(user.phone);
    go("home");

    return { ok: true };
  }

  function register(form) {
    if (users.some((user) => user.phone === form.phone)) {
      return {
        ok: false,
        message: "এই মোবাইল নাম্বারে আগে একাউন্ট আছে",
      };
    }

    const newUser = {
      id: Date.now(),
      name: form.name,
      phone: form.phone,
      email: form.email,
      district: form.district,
      thana: form.thana,
      password: form.password,
      pin: form.pin,
      balance: 0,
      approved: true,
      createdAt: new Date().toLocaleString("bn-BD"),
    };

    setUsers([newUser, ...users]);
    setCurrentUser(newUser.phone);
    setCurrentPhoneState(newUser.phone);
    go("home");

    return { ok: true };
  }

  function logout() {
    clearCurrentUser();
    setCurrentPhoneState("");
    go("login");
  }

  function updateUser(data) {
    setUsers((prev) =>
      prev.map((user) =>
        user.phone === currentPhone ? { ...user, ...data } : user
      )
    );
  }

  function checkPin(pin) {
    if (!currentUser) return false;
    return String(currentUser.pin) === String(pin);
  }

  function createMoneyRequest(data) {
    if (!currentUser) {
      return {
        ok: false,
        message: "আগে লগইন করুন",
      };
    }

    const request = {
      id: Date.now(),
      userPhone: currentUser.phone,
      userName: currentUser.name,
      amount: Number(data.amount),
      commission: Number(data.commission || 0),
      total: Number(data.total || data.amount),
      method: data.method,
      sender: data.sender,
      trxid: data.trxid,
      status: "Pending",
      createdAt: new Date().toLocaleString("bn-BD"),
    };

    setMoneyRequests([request, ...moneyRequests]);

    return { ok: true };
  }

  function createOrder(data) {
    if (!currentUser) {
      return {
        ok: false,
        message: "আগে লগইন করুন",
      };
    }

    if (!checkPin(data.pin)) {
      return {
        ok: false,
        message: "৪ সংখ্যার PIN ভুল হয়েছে",
      };
    }

    const price = Number(data.amount);

    if (Number(currentUser.balance) < price) {
      return {
        ok: false,
        message: "আপনার একাউন্টে পর্যাপ্ত ব্যালেন্স নেই",
      };
    }

    const order = {
      id: Date.now(),
      userPhone: currentUser.phone,
      userName: currentUser.name,
      service: data.service,
      operator: data.operator,
      number: data.number,
      title: data.title,
      details: data.details,
      amount: price,
      status: "Pending",
      createdAt: new Date().toLocaleString("bn-BD"),
    };

    setUsers((prev) =>
      prev.map((user) =>
        user.phone === currentUser.phone
          ? {
              ...user,
              balance: Number(user.balance) - price,
            }
          : user
      )
    );

    setOrders([order, ...orders]);

    return { ok: true };
  }

  function approveMoney(id) {
    const request = moneyRequests.find((item) => item.id === id);

    if (!request || request.status !== "Pending") return;

    setMoneyRequests((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "Approved" } : item
      )
    );

    setUsers((prev) =>
      prev.map((user) =>
        user.phone === request.userPhone
          ? {
              ...user,
              balance: Number(user.balance) + Number(request.amount),
            }
          : user
      )
    );
  }

  function rejectMoney(id) {
    setMoneyRequests((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "Rejected" } : item
      )
    );
  }

  function updateOrderStatus(id, status) {
    setOrders((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  }

  function addOffer(form) {
    const newOffer = {
      id: Date.now(),
      operator: form.operator,
      type: form.type,
      title: form.title,
      details: form.details,
      price: Number(form.price),
    };

    setOffers([newOffer, ...offers]);
  }

  function deleteOffer(id) {
    setOffers(offers.filter((item) => item.id !== id));
  }

  const commonProps = {
    page,
    go,
    currentUser,
    users,
    offers,
    orders,
    moneyRequests,
    logout,
    updateUser,
    createMoneyRequest,
    createOrder,
    approveMoney,
    rejectMoney,
    updateOrderStatus,
    addOffer,
    deleteOffer,
  };

  if (page === "login") {
    return <Login go={go} login={login} />;
  }

  if (page === "register") {
    return <Register go={go} register={register} />;
  }

  if (page === "admin") {
    return <Admin {...commonProps} />;
  }

  if (!currentUser) {
    return <Login go={go} login={login} />;
  }

  if (page === "addMoney") {
    return <AddMoney {...commonProps} />;
  }

  if (page === "recharge") {
    return <Recharge {...commonProps} />;
  }

  if (page === "internet") {
    return <Internet {...commonProps} />;
  }

  if (page === "minute") {
    return <Minute {...commonProps} />;
  }

  if (page === "bundle") {
    return <Bundle {...commonProps} />;
  }

  if (page === "statement") {
    return <Statement {...commonProps} />;
  }

  if (page === "help") {
    return <Help {...commonProps} />;
  }

  if (page === "profile") {
    return <Profile {...commonProps} />;
  }

  return <Home {...commonProps} />;
}
