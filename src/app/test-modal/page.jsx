"use client";
import DaddyModal from "@/components/ModalForTextEdit/TastyModal";
import React, { useState } from "react";

const WTH = () => {
  const [modaldata, setModaldata] = useState({});
  const closeModal = () => {
    // console.log("here comes?");
    setModaldata(null);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <label  htmlFor="my-modal-6" className="p-6" onClick={() => setModaldata("service")}>
        Open Modal
      </label>
      {modaldata && <DaddyModal closeModal={closeModal} />}
    </div>
  );
};

export default WTH;
