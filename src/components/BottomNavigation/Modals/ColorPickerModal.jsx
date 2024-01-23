import { X } from "lucide-react";
import React from "react";
import FontColorBottom from "/public/BottomNavigation/FontColorBottom.svg";
import { ChromePicker } from "react-color";

const ColorPickerModal = ({
  setColorPickerVisible,
  colorPickerVisible,
  selectedTextIndex,
  handleFontColorChange,
  selectedImageTextStyles,
  textStyles,
}) => {
  return (
    <div>
      <div>
        <label
          className="flex flex-col justify-center items-center gap-y-1"
          htmlFor="color-picker-bottom"
          onClick={() => setColorPickerVisible(!colorPickerVisible)}
        >
          <FontColorBottom />
          <span className="btm-nav-label font-thin">Color</span>
        </label>
        <input
          type="checkbox"
          id="color-picker-bottom"
          className="modal-toggle"
        />
        <div className="modal modal-bottom  " role="dialog">
          <div className="modal-box min-w-full">
            <div className="flex justify-between h-6">
              <p className="w-full text-black font-bold text-1xl text-center">
                Solid Color
              </p>

              <label htmlFor="color-picker-bottom" className="pr-5">
                <div className="p-1 bg-[#EDEDED]  rounded-full">
                  <X size={20} absoluteStrokeWidth />
                </div>
              </label>
            </div>
            <div className="divider"></div>
            <div className="">
              <ChromePicker
                className="min-w-full"
                color={textStyles[selectedTextIndex].backgroundColor}
                onChange={handleFontColorChange}
              />
            </div>
          </div>
          <label className="modal-backdrop" htmlFor="color-picker-bottom">
            Close
          </label>
        </div>
      </div>
    </div>
  );
};

export default ColorPickerModal;
