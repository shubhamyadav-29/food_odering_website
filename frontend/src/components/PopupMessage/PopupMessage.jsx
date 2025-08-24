import React, { useEffect } from "react";
import "./PopupMessage.css";

const PopupMessage = ({ message, type, onClose }) => {
  // Auto-close after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={`popup-message ${type}`}>
      {message}
    </div>
  );
};

export default PopupMessage;
