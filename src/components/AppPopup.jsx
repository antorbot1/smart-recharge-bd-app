import React from "react";
import { AlertCircle, CheckCircle, X } from "lucide-react";

export default function AppPopup({
  open,
  type = "info",
  title,
  message,
  children,
  onClose,
  onConfirm,
  confirmText = "ঠিক আছে",
  cancelText = "বন্ধ করুন",
}) {
  if (!open) return null;

  return (
    <div className="customPopupOverlay">
      <div className="customPopupBox">
        <button className="popupCloseBtn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className={`popupIcon ${type}`}>
          {type === "success" ? <CheckCircle size={34} /> : <AlertCircle size={34} />}
        </div>

        {title && <h2>{title}</h2>}
        {message && <p>{message}</p>}

        {children && <div className="popupContent">{children}</div>}

        <div className="popupActions">
          {onConfirm ? (
            <>
              <button className="popupCancel" onClick={onClose}>
                {cancelText}
              </button>
              <button className="popupConfirm" onClick={onConfirm}>
                {confirmText}
              </button>
            </>
          ) : (
            <button className="popupConfirm full" onClick={onClose}>
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
