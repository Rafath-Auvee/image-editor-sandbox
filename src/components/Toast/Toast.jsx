"use client";

import React, { useState, useEffect } from "react";
import { MdCheck, MdClose } from "react-icons/md"; // Import the check icon from react-icons

const Toast = ({ message, onClose, type }) => {
  console.log("Auvee checkpoint", message);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 6000); // Hide the toast after 3 seconds (adjust as needed)

    return () => clearTimeout(timer);
  }, [onClose]);

  const toastClassName = `transition-opacity duration-300 ease-in-out fixed top-6 right-6 py-2 px-10 rounded shadow flex items-center text-white`;

  const toastIcon =
    type === "error" ? (
      <MdClose
        className="mr-2 text-white rounded-full border-2 border-white"
        onClick={onClose}
      />
    ) : (
      <MdCheck
        className="mr-2 text-white rounded-full border-2 border-white"
        onClick={onClose}
      />
    );

  const toastColor = type === "error" ? "bg-red-500" : "bg-green-500";

  return (
    <div
      className={`${
        visible ? "opacity-100 z-40" : "opacity-0"
      } ${toastClassName} ${toastColor}`}
    >
      {toastIcon}
      <span>{message || "Done..."}</span>
    </div>
  );
};

export default Toast;
