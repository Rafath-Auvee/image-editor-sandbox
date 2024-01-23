import React from "react";
import { X } from "lucide-react";
import FontSizeBottom from "/public/BottomNavigation/FontSizeBottom.svg";

const FontSizeModal = ({
  imageData,
  selectedImageTextStyles,
  selectedTextIndex,
  textStyles,
  handleFontSizeChange,
}) => {
  return (
    <div>
      <label
        className="flex flex-col justify-center items-center gap-y-1"
        htmlFor="FontSize"
      >
        <FontSizeBottom />
        <span className="btm-nav-label font-thin">Font Size</span>
      </label>
      <input type="checkbox" id="FontSize" className="modal-toggle" />
      <div className="modal modal-bottom  " role="dialog">
        <div className="modal-box min-w-full">
          <div className="flex justify-between h-6">
            <p className="w-full text-black font-bold text-1xl text-center">
              Font Size
            </p>

            <label htmlFor="FontSize" className="pr-5">
              <div className="p-1 bg-[#EDEDED]  rounded-full">
                <X size={20} absoluteStrokeWidth />
              </div>
            </label>
          </div>
          <div className="divider"></div>
          <div className="mx-4 my-2">
            <div className="flex flex-col w-full ">
              <div className="flex flex-row justify-between w-full my-2">
                <p>Font Size</p>
              </div>
              <input
                type="range"
                min="5"
                value={
                  imageData.imageType === "multiple image"
                    ? selectedImageTextStyles[selectedTextIndex]?.fontSize
                    : textStyles.length > selectedTextIndex
                    ? textStyles[selectedTextIndex].fontSize
                    : "20"
                }
                className="range range-xs"
                onChange={(e) => handleFontSizeChange(selectedTextIndex, e)}
                onInput={(e) => handleFontSizeChange(selectedTextIndex, e)}
              />
            </div>
          </div>
          <div className="mx-4 my-2"></div>
        </div>
        <label className="modal-backdrop" htmlFor="FontSize">
          Close
        </label>
      </div>
    </div>
  );
};

export default FontSizeModal;
