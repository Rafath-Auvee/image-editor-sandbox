"use client";
import React from "react";
import AddText from "/public/BottomNavigation/AddText.svg";
import EditText from "/public/BottomNavigation/EditText.svg";
import FontSelection from "/public/BottomNavigation/FontSelection.svg";
import FontSizeBottom from "/public/BottomNavigation/FontSizeBottom.svg";
import FontColorBottom from "/public/BottomNavigation/FontColorBottom.svg";
import Alignment from "/public/BottomNavigation/Alignment.svg";
import Spacing from "/public/BottomNavigation/Spacing.svg";
import TestModal from "@/app/test-modal/page";

const BottomDefaultToolbar = ({
  handleSaveAndPreviewClick,
  handleAddText,
  ...props
}) => {
  return (
    <>
      <div className="block lg:hidden">
        <div
        // className="btm-nav btm-nav-sm flex overflow-x-auto content-start justify-start h-20"
        >
          <button className="min-w-[16.7%]" onClick={() => handleAddText()}>
            <AddText className="h-5 w-5" />
            <span className="btm-nav-label font-thin">Add Text</span>
          </button>
          <button className="min-w-[16.7%]">
            <EditText />
            <span className="btm-nav-label font-thin">Edit Text</span>
          </button>
          {/* <button className="min-w-[16.7%]">
            <TestModal />
          </button> */}
          <button className="min-w-[16.7%]">
            <FontSelection />
            <span className="btm-nav-label font-thin">Font</span>
          </button>
          <button className="min-w-[16.7%]">
            <FontSizeBottom />
            <span className="btm-nav-label font-thin">Font Size</span>
          </button>
          <button className="min-w-[16.7%]">
            <FontColorBottom />
            <span className="btm-nav-label font-thin">Color</span>
          </button>
          <button className="min-w-[16.7%] text-2xl">B</button>
          <button className="min-w-[16.7%] text-2xl">I</button>
          <button className="min-w-[16.7%] text-2xl">U</button>
          <button className="min-w-[16.7%] text-2xl">AA</button>
          <button className="min-w-[16.7%] text-2xl">Aa</button>
          <button className="min-w-[16.7%] text-2xl">aa</button>
          <button className="min-w-[16.7%]">
            <Alignment />
            <span className="btm-nav-label font-thin">Alignment</span>
          </button>
          <button className="min-w-[16.7%]">
            <Spacing />
            <span className="btm-nav-label font-thin"> Spacing</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default BottomDefaultToolbar;
