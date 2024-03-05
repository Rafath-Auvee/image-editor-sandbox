"use client";
import React, { useState } from "react";
import AddText from "/public/BottomNavigation/AddText.svg";
import EditText from "/public/BottomNavigation/EditText.svg";
import FontSelection from "/public/BottomNavigation/FontSelection.svg";
import FontSizeBottom from "/public/BottomNavigation/FontSizeBottom.svg";
import FontColorBottom from "/public/BottomNavigation/FontColorBottom.svg";
// import SpacingModal from "./Modals/SpacingModal";
// import AlignmentModal from "./Modals/AlignmentModal";
// import ColorPickerModal from "./Modals/ColorPickerModal";
// import FontSizeModal from "./Modals/FontSizeModal";
// import FontSelectionModal from "./Modals/FontSelectionModal";
import { fonts } from "@/Data/Fonts_Data";
// import EditTextModal from "./Modals/EditTextModal";
// import ServiceModal from "../ModalForTextEdit/TastyModal";
import { X } from "lucide-react";

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

import Spacing from "/public/BottomNavigation/Spacing.svg";

import { ChromePicker } from "react-color";

const BottomTextEditingToolbar = ({
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
  handleTextChange,
  handleUpdateButtonClick,
  ...props
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleFontSelect = (fontName) => {
    handleFontChange(selectedTextIndex, fontName);
    setDropdownOpen(false);
  };

  const toggleModal = () => {
    console.log(modalOpen);
    setModalOpen(!modalOpen);
  };
  return (
    <>
      <div
        className="visible lg:hidden overflow-x-auto w-full"
        key={props.selectedTextIndex}
        // style={{ position: "absolute", zIndex: 999 }}
      >
        <div
          className="flex content-start justify-start h-20 space-x-4"
          // className="btm-nav btm-nav-sm flex overflow-x-auto content-start justify-start h-20"
          // style={{ position: "absolute", zIndex: 999 }}
        >
          <button className="min-w-[16.7%]" onClick={() => handleAddText()}>
            <AddText className="h-5 w-5" />
            <span className="btm-nav-label font-thin">Add Text</span>
          </button>

          {/* {modalOpen && <ServiceModal closeModal={toggleModal} />} */}
          <button className="min-w-[16.7%]">
            {/* <EditTextModal
              handleTextChange={handleTextChange}
              textStyles={textStyles}
              selectedTextIndex={selectedTextIndex}
              handleUpdateButtonClick={handleUpdateButtonClick}
            /> */}
            <div>
              <label
                className="flex flex-col justify-center items-center gap-y-1"
                htmlFor="EditTextModal"
              >
                <EditText />
                <span className="btm-nav-label font-thin">Edit Text</span>
              </label>
              <input
                type="checkbox"
                id="EditTextModal"
                className="modal-toggle"
              />
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
          </button>
          <button className="min-w-[16.7%]">
            {/* <FontSelectionModal
              textStyles={textStyles}
              selectedTextIndex={selectedTextIndex}
              handleFontChange={handleFontChange}
              fonts={fonts}
            /> */}
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
          </button>
          <button className="min-w-[16.7%]">
            {/* <FontSizeModal
              imageData={imageData}
              selectedImageTextStyles={selectedImageTextStyles}
              selectedTextIndex={selectedTextIndex}
              textStyles={textStyles}
              handleFontSizeChange={handleFontSizeChange}
            /> */}
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
                    {/* <div className="flex flex-col w-full ">
              <div className="flex justify-between h-10">
                <div className="flex flex-row justify-between w-full">
                  <p>Font Size</p>
                </div>
                <input
                  type="text"
                  min="5"
                  value={
                    imageData.imageType === "multiple image"
                      ? selectedImageTextStyles[selectedTextIndex]?.fontSize
                      : textStyles.length > selectedTextIndex
                      ? textStyles[selectedTextIndex].fontSize
                      : "20"
                  }
                  // readOnly
                  onChange={(e) => handleFontSizeChange(selectedTextIndex, e)}
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
            </div> */}
                  </div>
                  <div className="mx-4 my-2">
                    <div className="flex flex-col w-full ">
                      <div className="flex flex-row justify-between w-full my-2">
                        <p>Font Size</p>
                        <input
                          type="text"
                          min="5"
                          value={
                            imageData.imageType === "multiple image"
                              ? selectedImageTextStyles[selectedTextIndex]
                                  ?.fontSize
                              : textStyles.length > selectedTextIndex
                              ? textStyles[selectedTextIndex].fontSize
                              : "20"
                          }
                          // readOnly
                          onChange={(e) =>
                            handleFontSizeChange(selectedTextIndex, e)
                          }
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
                        min="5"
                        value={
                          imageData.imageType === "multiple image"
                            ? selectedImageTextStyles[selectedTextIndex]
                                ?.fontSize
                            : textStyles.length > selectedTextIndex
                            ? textStyles[selectedTextIndex].fontSize
                            : "20"
                        }
                        className="range range-xs"
                        onChange={(e) =>
                          handleFontSizeChange(selectedTextIndex, e)
                        }
                        onInput={(e) =>
                          handleFontSizeChange(selectedTextIndex, e)
                        }
                      />
                    </div>
                  </div>
                </div>
                <label className="modal-backdrop" htmlFor="FontSize">
                  Close
                </label>
              </div>
            </div>
          </button>
          <button className="min-w-[16.7%]">
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
                  <label
                    className="modal-backdrop"
                    htmlFor="color-picker-bottom"
                  >
                    Close
                  </label>
                </div>
              </div>
            </div>
            {/* <ColorPickerModal
              setColorPickerVisible={setColorPickerVisible}
              colorPickerVisible={colorPickerVisible}
              selectedTextIndex={selectedTextIndex}
              handleFontColorChange={handleFontColorChange}
              selectedImageTextStyles={selectedImageTextStyles}
              textStyles={textStyles}
            /> */}
          </button>
          <button className="min-w-[16.7%]  text-2xl" onClick={toggleBold}>
            B
          </button>
          <button className="min-w-[16.7%]  text-2xl" onClick={toggleItalic}>
            I
          </button>
          <button className="min-w-[16.7%]  text-2xl" onClick={toggleUnderline}>
            U
          </button>
          <button className="min-w-[16.7%]  text-2xl" onClick={handleUppercase}>
            AA
          </button>
          <button
            className="min-w-[16.7%]  text-2xl"
            onClick={handleCapitalize}
          >
            Aa
          </button>
          <button className="min-w-[16.7%]  text-2xl" onClick={handleLowercase}>
            aa
          </button>
          <button className="min-w-[16.7%]">
            <div>
              <div>
                <label
                  className="flex flex-col justify-center items-center gap-y-1"
                  htmlFor="AlignmentModal"
                >
                  <Alignment />
                  <span className="btm-nav-label font-thin">Alignment</span>
                </label>
                <input
                  type="checkbox"
                  id="AlignmentModal"
                  className="modal-toggle"
                />
                <div className="modal modal-bottom z-[1000] " role="dialog">
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
                          onClick={() =>
                            handleMoveToYAxisCenter(selectedTextIndex)
                          }
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
            {/* <AlignmentModal
              selectedTextIndex={selectedTextIndex}
              handleLeftChange={handleLeftChange}
              handleTopChange={handleTopChange}
              handleTextAlignChange={handleTextAlignChange}
              handleMoveToXAxisLeft={handleMoveToXAxisLeft}
              handleMoveToXAxisRight={handleMoveToXAxisRight}
              handleCenterText={handleCenterText}
              handleMoveToYAxisTop={handleMoveToYAxisTop}
              handleMoveToYAxisCenter={handleMoveToYAxisCenter}
              handleMoveToYAxisBottom={handleMoveToYAxisBottom}
            /> */}
          </button>

          <div className="min-w-[16.7%]">
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
                          // readOnly
                          onChange={(e) =>
                            handleLineHeightChange(parseFloat(e.target.value))
                          }
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
                        // readOnly
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
                          // readOnly
                          onChange={(e) =>
                            handleLetterSpacingChange(
                              parseFloat(e.target.value)
                            )
                          }
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
                        // readOnly
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
            {/* <SpacingModal
              lineHeight={lineHeight}
              handleLineHeightChange={handleLineHeightChange}
              letterSpacing={letterSpacing}
              handleLetterSpacingChange={handleLetterSpacingChange}
            /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomTextEditingToolbar;
