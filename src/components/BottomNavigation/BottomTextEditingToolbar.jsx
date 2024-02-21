"use client";
import React, { useState } from "react";
import AddText from "/public/BottomNavigation/AddText.svg";
import EditText from "/public/BottomNavigation/EditText.svg";
import FontSelection from "/public/BottomNavigation/FontSelection.svg";
import FontSizeBottom from "/public/BottomNavigation/FontSizeBottom.svg";
import FontColorBottom from "/public/BottomNavigation/FontColorBottom.svg";
import SpacingModal from "./Modals/SpacingModal";
import AlignmentModal from "./Modals/AlignmentModal";
import ColorPickerModal from "./Modals/ColorPickerModal";
import FontSizeModal from "./Modals/FontSizeModal";
import FontSelectionModal from "./Modals/FontSelectionModal";
import { fonts } from "@/Data/Fonts_Data";
import EditTextModal from "./Modals/EditTextModal";
import ServiceModal from "@/app/test-modal/page";

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

  const toggleModal = () => {
    console.log(modalOpen);
    setModalOpen(!modalOpen);
  };
  return (
    <>
      <div
        className="visible lg:hidden"
        key={props.selectedTextIndex}
        // style={{ position: "absolute", zIndex: 999 }}
      >
        <div
          className="btm-nav btm-nav-sm flex overflow-x-auto content-start justify-start h-20"
          // style={{ position: "absolute", zIndex: 999 }}
        >
          <button className="min-w-[16.7%]" onClick={() => handleAddText()}>
            <AddText className="h-5 w-5" />
            <span className="btm-nav-label font-thin">Add Text</span>
          </button>

          <button
            onClick={() => toggleModal()}
            className="text-black toggle-button"
          >
            Toggle
          </button>
          {modalOpen && <ServiceModal closeModal={toggleModal} />}
          <button className="min-w-[16.7%]">
            <EditTextModal
              handleTextChange={handleTextChange}
              textStyles={textStyles}
              selectedTextIndex={selectedTextIndex}
              handleUpdateButtonClick={handleUpdateButtonClick}
            />
          </button>
          <button className="min-w-[16.7%]">
            <FontSelectionModal
              textStyles={textStyles}
              selectedTextIndex={selectedTextIndex}
              handleFontChange={handleFontChange}
              fonts={fonts}
            />
          </button>
          <button className="min-w-[16.7%]">
            <FontSizeModal
              imageData={imageData}
              selectedImageTextStyles={selectedImageTextStyles}
              selectedTextIndex={selectedTextIndex}
              textStyles={textStyles}
              handleFontSizeChange={handleFontSizeChange}
            />
          </button>
          <button className="min-w-[16.7%]">
            <ColorPickerModal
              setColorPickerVisible={setColorPickerVisible}
              colorPickerVisible={colorPickerVisible}
              selectedTextIndex={selectedTextIndex}
              handleFontColorChange={handleFontColorChange}
              selectedImageTextStyles={selectedImageTextStyles}
              textStyles={textStyles}
            />
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
            <AlignmentModal
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
            />
          </button>

          <div className="min-w-[16.7%]">
            <SpacingModal
              lineHeight={lineHeight}
              handleLineHeightChange={handleLineHeightChange}
              letterSpacing={letterSpacing}
              handleLetterSpacingChange={handleLetterSpacingChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomTextEditingToolbar;
