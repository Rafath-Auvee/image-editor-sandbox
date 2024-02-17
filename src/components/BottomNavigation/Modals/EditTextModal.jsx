import React from "react";
import { X } from "lucide-react";
import FontSizeBottom from "/public/BottomNavigation/FontSizeBottom.svg";
import EditText from "/public/BottomNavigation/EditText.svg";
const EditTextModal = ({
  handleTextChange,
  textStyles,
  selectedTextIndex,
  handleUpdateButtonClick,
}) => {
  return (
    <div>
      <label
        className="flex flex-col justify-center items-center gap-y-1"
        htmlFor="EditTextModal"
      >
        <EditText />
        <span className="btm-nav-label font-thin">Edit Text</span>
      </label>
      <input type="checkbox" id="EditTextModal" className="modal-toggle" />
      <div className="modal modal-bottom  z-[1000] " role="dialog">
        <div className="modal-box min-w-full">
          <div className="flex justify-end h-6">
            <p className="w-full text-black font-bold text-1xl text-center">
              Font Size
            </p>

            <label htmlFor="EditTextModal" className="pr-5">
              <div className="p-1 bg-[#EDEDED]  rounded-full">
                <X size={20} absoluteStrokeWidth />
              </div>
            </label>
          </div>
          <div className="divider"></div>
          <div className=" my-2">
            <div className="relative  flex-auto">
              <textarea
                id={`textInput-${selectedTextIndex}`}
                value={textStyles[selectedTextIndex]?.text}
                onChange={(e) => handleTextChange(selectedTextIndex, e)}
                className="border border-gray-300 rounded px-2 py-1 mt-1 placeholder:text-black w-full resize-none"
                style={{ whiteSpace: "pre-wrap" }}
                rows={4} // Set the number of rows you want to display initially
              />
            </div>

            <div className="flex items-center justify-end py-3 border-t border-solid border-slate-200 rounded-b">
              <label
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                htmlFor="EditTextModal"
                // onClick={() => setShowModal(false)}
              >
                Close
              </label>
              <label
                className="bg-[#23272A] text-white active:bg-[#23272A] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleUpdateButtonClick}
                htmlFor="EditTextModal"
              >
                Update
              </label>
            </div>
          </div>
          <div className="mx-4 my-2"></div>
        </div>
        <label className="modal-backdrop" htmlFor="EditTextModal">
          Close
        </label>
      </div>
    </div>
  );
};

export default EditTextModal;
