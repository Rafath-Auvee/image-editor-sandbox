"use client";
import React, { useState } from "react";
import { ChromePicker } from "react-color";
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

const TextEditingToolbar = ({
  selectedTextIndex,
  showSlider,
  imageData,
  selectedImageTextStyles,
  textStyles,
  handleFontSizeChange,
  setShowModal,
  handleSaveClick,
  handleSaveToDatabase,
  handleAddText,
  devtools,
  handleLeftChange,
  handleTopChange,
  handleTextAlignChange,
  handleMoveToXAxisLeft,
  handleMoveToXAxisRight,
  handleCenterText,
  handleMoveToYAxisTop,
  handleMoveToYAxisCenter,
  handleMoveToYAxisBottom,
  handleFontChange,
  lineHeight,
  handleLineHeightChange,
  letterSpacing,
  handleLetterSpacingChange,
  setColorPickerVisible,
  colorPickerVisible,
  handleFontColorChange,
  handleImageSizeAdjustment,
  widthAdjustment,
  handleWidthAdjustment,
  heightAdjustment,
  handleHeightAdjustment,
  handleUndo,
  handleRedo,
  handleSaveAndPreviewClick,
  handleLowercase,
  handleCapitalize,
  handleUppercase,
  toggleBold,
  toggleItalic,
  toggleUnderline,
  handleResizeMouseDown,
  handleMouseMove,
  handleMouseUp,
  rotationAngle,
  incrementFontSize,
  decrementFontSize,
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
        key={props.selectedTextIndex}
        className={`rounded bg-[#F6F6F6] flex flex-row justify-center  items-center py-4 px-7 flex-wrap md:flex-nowrap gap-x-6 gap-y-4 md:gap-y-0 md:gap-x-3`}
      >
        <select
          id="font-select"
          value={textStyles[selectedTextIndex]?.fontFamily}
          onChange={(e) => handleFontChange(selectedTextIndex, e.target.value)}
          className="select select-bordered w-full max-w-max"
        >
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
            onClick={() => decrementFontSize(selectedTextIndex)}
          >
            -
          </button>
          <input
            type="text"
            value={
              imageData.imageType === "multiple image"
                ? selectedImageTextStyles[selectedTextIndex]?.fontSize
                : textStyles.length > selectedTextIndex
                ? textStyles[selectedTextIndex].fontSize
                : "20"
            }
            onChange={(e) => handleFontSizeChange(selectedTextIndex, e)}
            onInput={(e) => handleFontSizeChange(selectedTextIndex, e)}
            min="5"
            className="border-gray-300 rounded text-center"
            style={{ width: "40px", height: "40px", textAlign: "center" }}
          />
          <button
            className="bg-white text-black border-gray-300 border px-4 py-2 rounded text-center"
            style={{ width: "40px", height: "40px" }}
            onClick={() => incrementFontSize(selectedTextIndex)}
          >
            +
          </button>
        </section>

        <section
          className="bg-transparent text-center text-black px-2 py-2 rounded"
          onClick={() => setColorPickerVisible(!colorPickerVisible)}
        >
          <div className="flex flex-col ">
            <p className="text-xl">A</p>
            <ColorPicker />
            {colorPickerVisible && (
              <ChromePicker
                className="absolute mt-10 z-10"
                color={textStyles[selectedTextIndex].backgroundColor}
                onChange={handleFontColorChange}
              />
            )}
          </div>
        </section>

        <button className="text-2xl" onClick={toggleBold}>
          <VscBold />
        </button>

        <button className="text-2xl" onClick={toggleItalic}>
          <RiItalic />
        </button>

        <button
          className="flex flex-row items-center text-2xl"
          onClick={toggleUnderline}
        >
          <BsTypeUnderline />
          <button className="inline-block ml-3 w-0.5 h-8 bg-[#DCDCDC] opacity-100 dark:opacity-50"></button>
        </button>
        <button className="text-2xl font-thin" onClick={handleUppercase}>
          AA
        </button>
        <button
          className="flex flex-row items-center text-2xl font-thin"
          onClick={handleCapitalize}
        >
          Aa
        </button>
        <button
          onClick={handleLowercase}
          className="flex flex-row items-center text-2xl font-thin"
        >
          aa
          <button className="inline-block ml-3 w-0.5 h-8 bg-[#DCDCDC] opacity-100 dark:opacity-50"></button>
        </button>

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
                <div
                  className="flex flex-col   gap-y-1 place-items-center text-xs"
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
              <p>Align to page</p>
              <div className="flex flex-row gap-x-4 justify-start mt-3">
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
          </ul>
        </div>

        <div className="dropdown">
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
            className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-52 "
          >
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
                  style={hoverStyle}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                />
              </div>
            </div>
          </ul>
        </div>

        <section className="inline-block ml-1 w-0.5 h-8 bg-[#DCDCDC] opacity-100 dark:opacity-50"></section>

        {/* ADD TEXT  */}

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

        <section
          className="flex flex-row items-center "
          onClick={() => setShowModal(true)}
        >
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

        <section className="inline-block  w-0.5 h-8 bg-[#DCDCDC] opacity-100 dark:opacity-50"></section>
        <section className="flex flex-col">
          <div
            className="flex flex-col items-center cursor-pointer"
            style={{ marginTop: "32px" }}
            onClick={handleUndo}
          >
            <button className="">
              <RotateCcw className="stroke-1" size={32} />
            </button>
            <p className="text-xs mt-4">Undo</p>
          </div>
          {/* <p>Undo</p> */}
        </section>
        {/* GAP Between Undo and Redo  */}
        <section className="gap-x-5"></section>
        <section
          className="flex flex-row items-center cursor-pointer"
          onClick={handleRedo}
        >
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
          onClick={() => handleSaveToDatabase()}
        >
          Save & Preview
        </button>
      </div>
    </>
  );
};

export default TextEditingToolbar;
