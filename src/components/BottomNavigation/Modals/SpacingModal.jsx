import React from "react";
import Spacing from "/public/BottomNavigation/Spacing.svg";
import { X } from "lucide-react";

const SpacingModal = ({
  lineHeight,
  handleLineHeightChange,
  letterSpacing,
  handleLetterSpacingChange,
  ...props
}) => {
  return (
    <div>
      <label
        className="flex flex-col justify-center items-center gap-y-1"
        htmlFor="my_modal_1"
      >
        <Spacing />
        <span className="btm-nav-label font-thin"> Spacing</span>
      </label>
      <input type="checkbox" id="my_modal_1" className="modal-toggle" />
      <div className="modal modal-bottom  " role="dialog">
        <div className="modal-box min-w-full">
          <div className="flex justify-between h-6">
            <p className="w-full text-black font-bold text-1xl text-center">
              Spacing
            </p>

            <label htmlFor="my_modal_1" className="pr-5">
              <div className="p-1 bg-[#EDEDED]  rounded-full">
                <X size={20} absoluteStrokeWidth />
              </div>
            </label>
          </div>
          <div className="divider"></div>
          <div className="mx-4 my-2">
            <div className="flex flex-col w-full ">
              <div className="flex flex-row justify-between w-full my-2">
                <p>Letter Spacing</p>
                <input
                  type="text"
                  value={lineHeight}
                  readOnly
                  className=" border-gray-300 rounded text-center"
                  style={{
                    width: "40px",
                    height: "20px",
                    textAlign: "center",
                  }}
                />
              </div>
              <input
                type="range"
                min={0}
                max="100"
                readOnly
                value={lineHeight}
                className="range range-xs"
                onChange={(e) =>
                  handleLineHeightChange(parseFloat(e.target.value))
                }
                onInput={(e) =>
                  handleLineHeightChange(parseFloat(e.target.value))
                }
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
            </div>
          </div>
          <div className="mx-4 my-2">
            <div className="flex flex-col w-full">
              <div className="flex flex-row justify-between w-full my-2">
                <p>Line Spacing</p>
                <input
                  type="text"
                  value={letterSpacing}
                  readOnly
                  className=" border-gray-300 rounded text-center"
                  style={{
                    width: "40px",
                    height: "20px",
                    textAlign: "center",
                  }}
                />
              </div>
              <input
                type="range"
                min={0}
                max="100"
                readOnly
                value={letterSpacing}
                onChange={(e) =>
                  handleLetterSpacingChange(parseFloat(e.target.value))
                }
                onInput={(e) =>
                  handleLetterSpacingChange(parseFloat(e.target.value))
                }
                className="range range-xs"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
            </div>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_1">
          Close
        </label>
      </div>
    </div>
  );
};

export default SpacingModal;
