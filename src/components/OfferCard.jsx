import React from "react";
import { ShoppingBag } from "lucide-react";
import { money } from "../utils/storage";

export default function OfferCard({ offer, onBuy }) {
  return (
    <div className="offerCard">
      <div className="offerTop">
        <span>{offer.operator}</span>
        <small>{offer.type}</small>
      </div>

      <h3>{offer.title}</h3>
      <p>{offer.details}</p>

      <div className="offerBottom">
        <b>{money(offer.price)}</b>

        <button onClick={() => onBuy(offer)}>
          <ShoppingBag size={18} />
          কিনুন
        </button>
      </div>
    </div>
  );
}
