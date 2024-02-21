import React, { useState } from "react";
import { X } from "lucide-react";
import FontSelection from "/public/BottomNavigation/FontSelection.svg";

const FontSelectionModal = ({
  textStyles,
  selectedTextIndex,
  handleFontChange,
  fonts,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleFontSelect = (fontName) => {
    handleFontChange(selectedTextIndex, fontName);
    setDropdownOpen(false);
  };

  return (
    <div>
      <label
        className="flex flex-col justify-center items-center gap-y-1"
        htmlFor="FontSelectionModal"
      >
        <FontSelection />
        <span className="btm-nav-label font-thin">Font</span>
      </label>
      <input
        type="checkbox"
        id="FontSelectionModal"
        className="modal-toggle"
        checked={dropdownOpen}
        onChange={toggleDropdown}
      />
      <div
        className={`modal modal-bottom ${dropdownOpen ? "open" : ""}`}
        role="dialog"
      >
        <div className="modal-box min-w-full">
          <div className="flex justify-between h-6">
            <p className="w-full text-black font-bold text-1xl text-center">
              Font Size
            </p>

            <label htmlFor="FontSelectionModal" className="pr-5">
              <div className="p-1 bg-[#EDEDED]  rounded-full">
                <X size={20} absoluteStrokeWidth />
              </div>
            </label>
          </div>
          <div className={`divider`}></div>
          <div
            className={`mx-4 my-2 h-56 overflow-y-auto ${
              dropdownOpen ? "open" : ""
            }`}
          >
            <ul className="dropdown-list">
              {fonts.map((font, index) => (
                <li
                  key={index}
                  className="dropdown-item text-3xl font-bold capitalize"
                  onClick={() => handleFontSelect(font.name)}
                >
                  {font.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <label
          className="modal-backdrop"
          htmlFor="FontSelectionModal"
          onClick={toggleDropdown}
        >
          Close
        </label>
      </div>
    </div>
  );
};

export default FontSelectionModal;
