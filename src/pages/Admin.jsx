import React, { useState } from "react";
import { CheckCircle, LogOut, Plus, Trash2, XCircle } from "lucide-react";
import { money } from "../utils/storage";
import { operators } from "../data/demoData";

export default function Admin({
  users,
  offers,
  orders,
  moneyRequests,
  logout,
  approveMoney,
  rejectMoney,
  updateOrderStatus,
  addOffer,
  deleteOffer,
}) {
  const [form, setForm] = useState({
    operator: "Grameenphone",
    type: "internet",
    title: "",
    details: "",
    price: "",
  });

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function submitOffer(e) {
    e.preventDefault();

    if (!form.title || !form.details || !form.price) {
      alert("সব তথ্য দিন");
      return;
    }

    addOffer(form);

    setForm({
      operator: "Grameenphone",
      type: "internet",
      title: "",
      details: "",
      price: "",
    });

    alert("Offer add হয়েছে");
  }

  return (
    <div className="adminApp">
      <div className="adminHeader">
        <div>
          <h1>Admin Panel</h1>
          <p>Smart Recharge BD Control</p>
        </div>

        <button onClick={logout}>
          <LogOut size={18} />
          Logout
        </button>
      </div>

      <div className="adminStats">
        <div>
          <b>{users.length}</b>
          <span>Total Users</span>
        </div>

        <div>
          <b>{moneyRequests.filter((item) => item.status === "Pending").length}</b>
          <span>Add Money Pending</span>
        </div>

        <div>
          <b>{orders.filter((item) => item.status === "Pending").length}</b>
          <span>Order Pending</span>
        </div>

        <div>
          <b>{offers.length}</b>
          <span>Total Offers</span>
        </div>
      </div>

      <section className="adminSection">
        <h2>Add New Offer</h2>

        <form className="adminForm" onSubmit={submitOffer}>
          <select
            value={form.operator}
            onChange={(e) => update("operator", e.target.value)}
          >
            {operators.map((operator) => (
              <option key={operator} value={operator}>
                {operator}
              </option>
            ))}
          </select>

          <select value={form.type} onChange={(e) => update("type", e.target.value)}>
            <option value="internet">Internet / MB</option>
            <option value="minute">Minute</option>
            <option value="bundle">Bundle</option>
          </select>

          <input
            placeholder="Offer title"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
          />

          <input
            placeholder="Details, example: 5GB • 7 Days"
            value={form.details}
            onChange={(e) => update("details", e.target.value)}
          />

          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => update("price", e.target.value)}
          />

          <button type="submit">
            <Plus size={18} />
            Add Offer
          </button>
        </form>
      </section>

      <section className="adminSection">
        <h2>Add Money Requests</h2>

        {moneyRequests.length === 0 ? (
          <div className="adminEmpty">কোনো request নেই</div>
        ) : (
          moneyRequests.map((item) => (
            <div className="adminItem" key={item.id}>
              <div>
                <h3>{item.userName}</h3>
                <p>{item.userPhone}</p>
                <p>
                  {item.method} • Sender: {item.sender} • TrxID: {item.trxid}
                </p>
                <small>
                  {money(item.amount)} • {item.status} • {item.createdAt}
                </small>
              </div>

              {item.status === "Pending" && (
                <div className="adminActions">
                  <button className="approve" onClick={() => approveMoney(item.id)}>
                    <CheckCircle size={17} />
                    Approve
                  </button>

                  <button className="reject" onClick={() => rejectMoney(item.id)}>
                    <XCircle size={17} />
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </section>

      <section className="adminSection">
        <h2>All Orders</h2>

        {orders.length === 0 ? (
          <div className="adminEmpty">কোনো order নেই</div>
        ) : (
          orders.map((item) => (
            <div className="adminItem" key={item.id}>
              <div>
                <h3>{item.title}</h3>
                <p>
                  {item.userName} • {item.userPhone}
                </p>
                <p>
                  {item.operator} • {item.number} • {item.details}
                </p>
                <small>
                  {money(item.amount)} • {item.status} • {item.createdAt}
                </small>
              </div>

              {item.status === "Pending" && (
                <div className="adminActions">
                  <button
                    className="approve"
                    onClick={() => updateOrderStatus(item.id, "Complete")}
                  >
                    Complete
                  </button>

                  <button
                    className="reject"
                    onClick={() => updateOrderStatus(item.id, "Cancel")}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </section>

      <section className="adminSection">
        <h2>All Offers</h2>

        {offers.map((item) => (
          <div className="adminItem" key={item.id}>
            <div>
              <h3>{item.title}</h3>
              <p>
                {item.operator} • {item.type} • {item.details}
              </p>
              <small>{money(item.price)}</small>
            </div>

            <button className="deleteButton" onClick={() => deleteOffer(item.id)}>
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}
