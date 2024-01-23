import { X } from "lucide-react";
import React from "react";
import Alignment from "/public/BottomNavigation/Alignment.svg";

import TopAlign from "/public/svg/TopAlign.svg";
import BottomAlign from "/public/svg/BottomAlign.svg";
import CenterAlign from "/public/svg/CenterAlign.svg";
import AlignLeft from "/public/svg/AlignLeft.svg";
import AlignRight from "/public/svg/AlignRight.svg";
import AlignCenter from "/public/svg/AlignCenter.svg";

import LeftText from "/public/svg/LeftText.svg";
import RightText from "/public/svg/RightText.svg";
import CenterText from "/public/svg/CenterText.svg";

const AlignmentModal = ({
  handleLeftChange,
  handleTopChange,
  handleTextAlignChange,
  handleMoveToXAxisLeft,
  handleMoveToXAxisRight,
  handleCenterText,
  handleMoveToYAxisTop,
  handleMoveToYAxisCenter,
  handleMoveToYAxisBottom,
  selectedTextIndex,
}) => {
  return (
    <div>
      <div>
        <label
          className="flex flex-col justify-center items-center gap-y-1"
          htmlFor="AlignmentModal"
        >
          <Alignment />
          <span className="btm-nav-label font-thin">Alignment</span>
        </label>
        <input type="checkbox" id="AlignmentModal" className="modal-toggle" />
        <div className="modal modal-bottom  " role="dialog">
          <div className="modal-box min-w-full">
            <div className="flex justify-between h-6">
              <p className="w-full text-black font-bold text-1xl text-center">
                Alignment
              </p>

              <label htmlFor="AlignmentModal" className="pr-5">
                <div className="p-1 bg-[#EDEDED]  rounded-full">
                  <X size={20} absoluteStrokeWidth />
                </div>
              </label>
            </div>
            <div className="divider"></div>
            <div className="mx-4 my-2">
              <p className="text-left">Paragraph Alignment</p>
              <div className="flex flex-row gap-x-4 justify-between mt-3">
                <div
                  className="flex flex-col gap-y-1 place-items-center text-xs"
                  onClick={() => handleTextAlignChange("left")}
                >
                  <LeftText className="text-3xl" />
                  Left
                </div>
                <div
                  className="flex flex-col gap-y-1 place-items-center text-xs"
                  onClick={() => handleTextAlignChange("center")}
                >
                  <CenterText className="text-3xl" />
                  Center
                </div>
                <div
                  className="flex flex-col gap-y-1 place-items-center text-xs"
                  onClick={() => handleTextAlignChange("right")}
                >
                  <RightText className="text-3xl" />
                  Right
                </div>
              </div>
            </div>
            <div className="mx-4 my-2 ">
              <p className="text-left">Align to page</p>
              <div className="flex flex-row gap-x-4 justify-between mt-3">
                <div
                  className="flex flex-col gap-y-1 place-items-center text-xs"
                  onClick={() =>
                    handleMoveToXAxisLeft(selectedTextIndex, "left")
                  }
                >
                  <AlignLeft className="text-3xl" />
                  Left
                </div>
                <div
                  className="flex flex-col gap-y-1 place-items-center text-xs"
                  onClick={handleCenterText}
                >
                  <AlignCenter className="text-3xl" />
                  Center
                </div>
                <div
                  className="flex flex-col gap-y-1 place-items-center text-xs"
                  onClick={handleMoveToXAxisRight}
                >
                  <AlignRight className="text-3xl" />
                  Right
                </div>
                <div
                  className="flex flex-col gap-y-1 place-items-center text-xs"
                  onClick={handleMoveToYAxisTop}
                >
                  <TopAlign className="text-3xl" />
                  Top
                </div>
                <div
                  className="flex flex-col gap-y-1 place-items-center text-xs"
                  onClick={() => handleMoveToYAxisCenter(selectedTextIndex)}
                >
                  <CenterAlign className="text-3xl" />
                  Center
                </div>
                <div
                  className="flex flex-col gap-y-1 place-items-center text-xs"
                  onClick={() =>
                    handleMoveToYAxisBottom(selectedTextIndex, "top")
                  }
                >
                  <BottomAlign className="text-3xl" />
                  Bottom
                </div>
              </div>
            </div>
          </div>
          <label className="modal-backdrop" htmlFor="AlignmentModal">
            Close
          </label>
        </div>
      </div>
    </div>
  );
};

export default AlignmentModal;
