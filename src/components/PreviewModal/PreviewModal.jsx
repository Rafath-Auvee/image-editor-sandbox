"use client";
import Toast from "@/components/Toast/Toast";
import { useState } from "react";

const PreviewModal = ({ previewData, onClose }) => {
  const [showToast, setShowToast] = useState(false);

  const handleCopyToClipboard = () => {
    // Convert the JSON data to a formatted string
    const jsonString = JSON.stringify(previewData, null, 2);

    // Create a new text area element and set its value to the JSON string
    const textarea = document.createElement("textarea");
    textarea.value = jsonString;
    textarea.style.position = "fixed"; // Make it invisible
    document.body.appendChild(textarea);

    // Select and copy the text in the text area to clipboard
    textarea.select();
    document.execCommand("copy");

    // Remove the text area element from the DOM
    document.body.removeChild(textarea);
    setShowToast(true);
  };

  const handleToastClose = () => {
    setShowToast(false);
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-3xl">
        <div className="relative w-full my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-1xl font-semibold">Card Data</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={onClose}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>

            <div className="p-6 max-h-80 overflow-y-auto">
              <h2>Preview Data:</h2>
              <pre className="text-sm">
                {JSON.stringify(previewData, null, 2)}
              </pre>
            </div>

            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={onClose}
              >
                Close
              </button>
              <button
                className="bg-[#23272A] text-white active:bg-[#23272A] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleCopyToClipboard}
              >
                Copy To Clipboard
              </button>
            </div>
            {showToast && (
              <Toast message="Copy Done" onClose={handleToastClose} />
            )}
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default PreviewModal;
