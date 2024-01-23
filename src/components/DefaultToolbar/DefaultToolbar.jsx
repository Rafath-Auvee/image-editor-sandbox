"use client";
import React, { useState } from "react";
import { fonts } from "@/Data/Fonts_Data";

import { RotateCcw, RotateCw } from "lucide-react";

import { VscBold } from "react-icons/vsc";
import { RiItalic } from "react-icons/ri";
import { BsTypeUnderline } from "react-icons/bs";
import { IoTextOutline } from "react-icons/io5";
import { RxLetterCaseUppercase } from "react-icons/rx";
import { RxText } from "react-icons/rx";

import AlignmentLine from "/public/svg/AlignmentLine.svg";
import LetterSpacing from "/public/svg/LetterSpacing.svg";
import ColorPicker from "/public/svg/color-picker.svg";

import TopAlign from "/public/svg/TopAlign.svg";
import BottomAlign from "/public/svg/BottomAlign.svg";
import CenterAlign from "/public/svg/CenterAlign.svg";
import AlignLeft from "/public/svg/AlignLeft.svg";
import AlignRight from "/public/svg/AlignRight.svg";
import AlignCenter from "/public/svg/AlignCenter.svg";

import LeftText from "/public/svg/LeftText.svg";
import RightText from "/public/svg/RightText.svg";
import CenterText from "/public/svg/CenterText.svg";

import EditTextIcon from "/public/svg/EditTextIcon.svg";

const DefaultToolbar = ({
  handleSaveAndPreviewClick,
  handleAddText,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const hoverStyle = {
    // backgroundColor: isHovered ? "inherit" : "initial",
    // "--range-shdw": "transparent",
  };
  return (
    <>
      <div
        className={`rounded bg-[#F6F6F6] flex flex-row justify-center items-center py-4 px-7 flex-wrap md:flex-nowrap gap-x-6 gap-y-4 md:gap-y-0 md:gap-x-3`}
      >
        <select className="select select-bordered w-full max-w-max">
          <option disabled defaultValue={"Font Name"} readOnly>
            Font Name?
          </option>
          {fonts.map((font) => (
            <option key={font.id} value={font.name}>
              {font.name}
            </option>
          ))}
        </select>
        <section className="flex items-center mx-2">
          <button
            className="bg-white text-black border-gray-300 border px-4 py-2 rounded text-center"
            style={{ width: "40px", height: "40px" }}
          >
            -
          </button>
          <input
            type="text"
            value={"0"}
            readOnly
            className="border-gray-300 rounded text-center"
            style={{ width: "40px", height: "40px", textAlign: "center" }}
          />
          <button
            className="bg-white text-black border-gray-300 border px-4 py-2 rounded text-center"
            style={{ width: "40px", height: "40px" }}
          >
            +
          </button>
        </section>

        <section className="bg-transparent text-center text-black px-2 py-2 rounded">
          <div className="flex flex-col ">
            <p className="text-xl">A</p>
            <ColorPicker />
          </div>
        </section>

        <section className="text-2xl">
          <VscBold />
        </section>

        <section className="text-2xl">
          <RiItalic />
        </section>

        <section className="flex flex-row items-center text-2xl">
          <BsTypeUnderline />
          <button className="inline-block ml-3 w-0.5 h-8 bg-[#DCDCDC] opacity-100 dark:opacity-50"></button>
        </section>
        <section className="text-2xl font-thin">AA</section>
        <section className="text-2xl font-thin">Aa</section>
        <section className="flex flex-row items-center text-2xl font-thin">
          aa
          <button className="inline-block ml-3 w-0.5 h-8 bg-[#DCDCDC] opacity-100 dark:opacity-50"></button>
        </section>

        <div className="dropdown">
          <div
            className="flex flex-col items-center"
            style={{ marginTop: "20px" }}
          >
            <div
              tabIndex={0}
              role="button"
              className="btn m-1"
              style={{ backgroundColor: "white", textAlign: "left" }}
            >
              <AlignmentLine />
            </div>
            <p className="text-xs mt-1">Alignment</p>
          </div>

          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-4 shadow bg-base-100 rounded-box w-max gap-y-3" // Apply text-left here
          >
            <div className="mx-4 my-2">
              <p>Paragraph Alignment</p>
              <div className="flex flex-row gap-x-4  mt-3">
                <div className="flex flex-col   gap-y-1 place-items-center text-xs">
                  <LeftText className="text-3xl" />
                  Left
                </div>
                <div className="flex flex-col gap-y-1 place-items-center text-xs">
                  <CenterText className="text-3xl" />
                  Center
                </div>
                <div className="flex flex-col gap-y-1 place-items-center text-xs">
                  <RightText className="text-3xl" />
                  Right
                </div>
              </div>
            </div>
            <div className="mx-4 my-2">
              <p>Align to page</p>
              <div className="flex flex-row gap-x-4 justify-start mt-3">
                <div className="flex flex-col gap-y-1 place-items-center text-xs">
                  <AlignLeft className="text-3xl" />
                  Left
                </div>
                <div className="flex flex-col gap-y-1 place-items-center text-xs">
                  <AlignCenter className="text-3xl" />
                  Center
                </div>
                <div className="flex flex-col gap-y-1 place-items-center text-xs">
                  <AlignRight className="text-3xl" />
                  Right
                </div>
                <div className="flex flex-col gap-y-1 place-items-center text-xs">
                  <TopAlign className="text-3xl" />
                  Top
                </div>
                <div className="flex flex-col gap-y-1 place-items-center text-xs">
                  <BottomAlign className="text-3xl" />
                  Bottom
                </div>
                <div className="flex flex-col gap-y-1 place-items-center text-xs">
                  <CenterAlign className="text-3xl" />
                  Center
                </div>
              </div>
            </div>
          </ul>
        </div>

        <div className="dropdown ">
          <div
            className="flex flex-col items-center"
            style={{ marginTop: "20px" }}
          >
            <div
              tabIndex={0}
              role="button"
              className="btn m-1"
              style={{ backgroundColor: "white" }}
            >
              <LetterSpacing />
            </div>
            <p className="text-xs mt-1">Spacing</p> {/* Label below the icon */}
          </div>

          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <div className="mx-4 my-2">
              <div className="flex flex-col w-full ">
                <div className="flex flex-row justify-between w-full my-2">
                  <p>Letter Spacing</p>
                  <input
                    type="text"
                    value={0}
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
                  value="40"
                  className="range range-xs"
                  style={hoverStyle}
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
                    value={"0"}
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
                  value="40"
                  className="range range-xs"
                  style={hoverStyle}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                />
              </div>
            </div>
          </ul>
        </div>

        <section className="inline-block ml-1 w-0.5 h-8 bg-[#DCDCDC] opacity-100 dark:opacity-50"></section>
        <section
          className="flex flex-row items-center mr-2 "
          onClick={() => handleAddText()}
        >
          <div className="indicator">
            <span
              className="indicator-item indicator-bottom indicator-end badge badge-primary"
              style={{
                width: "20px",
                height: "20px",
                marginBottom: "30px",
                marginRight: "5px",
                backgroundColor: "black",
              }}
            >
              +
            </span>
            <div
              className="flex flex-col items-center"
              style={{ marginTop: "25px" }}
            >
              <div className="grid w-12 h-12  bg-white border border-[#CECECE] rounded place-items-center">
                <RxText className="text-xl" />
              </div>
              <p className="text-xs mt-2">Add Text</p>
            </div>
          </div>
        </section>

        <section className="flex flex-row items-center ">
          <div
            className="flex flex-col items-center "
            style={{ marginTop: "25px" }}
          >
            <div className="grid w-12 h-12 bg-white border border-[#CECECE] rounded place-items-center">
              <EditTextIcon />
            </div>
            <p className="text-xs mt-2">Edit Text</p>
          </div>
        </section>

        <section className="inline-block w-0.5 h-8 bg-[#DCDCDC] opacity-100 dark:opacity-50"></section>
        <section className="flex flex-col">
          <div
            className="flex flex-col items-center "
            style={{ marginTop: "32px" }}
          >
            <button className="">
              <RotateCcw className="stroke-1" size={32} />
            </button>
            <p className="text-xs mt-4">Undo</p>
          </div>
          {/* <p>Undo</p> */}
        </section>
        {/* GAP Between Undo and Redo  */}
        {/* <RotateCw className="stroke-1" size={32} /> */}
        <section className="gap-x-5"></section>
        <section className="flex flex-row items-center">
          <div
            className="flex flex-col items-center "
            style={{ marginTop: "32px" }}
          >
            <button className="">
              <RotateCw className="stroke-1" size={32} />
            </button>
            <p className="text-xs mt-4">Redo</p>
          </div>
          <button className="inline-block ml-3 w-0.5 h-8 bg-[#DCDCDC] opacity-100 dark:opacity-50"></button>
        </section>
        <button
          className="bg-[#23272A] w-full text-white px-4 py-2 rounded"
          onClick={() => handleSaveAndPreviewClick()}
        >
          Save & Preview
        </button>
      </div>
    </>
  );
};

export default DefaultToolbar;
