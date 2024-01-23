"use client";
import React from "react";
import AddText from "/public/BottomNavigation/AddText.svg";
import EditText from "/public/BottomNavigation/EditText.svg";
import Alignment from "/public/BottomNavigation/Alignment.svg";
import Spacing from "/public/BottomNavigation/Spacing.svg";

const BottomDefaultToolbar = ({
  handleSaveAndPreviewClick,
  handleAddText,
  ...props
}) => {
  return (
    <>
      <div className="block lg:hidden">
        <div className="btm-nav btm-nav-sm flex overflow-x-auto content-start justify-start h-20">
          <button className="min-w-[16.7%]" onClick={() => handleAddText()}>
            <AddText className="h-5 w-5" />
            <span className="btm-nav-label font-thin">Add Text</span>
          </button>
          <button className="min-w-[16.7%]">
            <EditText />
            <span className="btm-nav-label font-thin">Edit Text</span>
          </button>
          <button className="min-w-[16.7%]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="btm-nav-label font-thin">Font</span>
          </button>
          <button className="min-w-[16.7%]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="btm-nav-label font-thin">Font Size</span>
          </button>
          <button className="min-w-[16.7%]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="btm-nav-label font-thin">Color</span>
          </button>
          <button className="min-w-[16.7%] font-bold text-2xl">B</button>
          <button className="min-w-[16.7%] font-bold text-2xl">I</button>
          <button className="min-w-[16.7%] font-bold text-2xl">U</button>
          <button className="min-w-[16.7%] font-bold text-2xl">AA</button>
          <button className="min-w-[16.7%] font-bold text-2xl">Aa</button>
          <button className="min-w-[16.7%] font-bold text-2xl">aa</button>
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
