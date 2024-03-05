"use client";
import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import Image from "next/image";
// import { ChromePicker } from "react-color";

// import images from "@/Data/Draft_Data";
import { fonts } from "@/Data/Fonts_Data";
import PreviewModal from "@/components/PreviewModal/PreviewModal";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import ImageEditorFunctions from "@/components/ImageEditor/ImageEditorFunctions";

import TextEditingToolbar from "@/components/TextEditingToolbar/TextEditingToolbar";
import DefaultToolbar from "@/components/DefaultToolbar/DefaultToolbar";

import TextResize from "/public/svg/TextResize.svg";
import { RefreshCw, Trash2 } from "lucide-react";
import BottomDefaultToolbar from "@/components/BottomNavigation/BottomDefaultToolbar";
import BottomTextEditingToolbar from "@/components/BottomNavigation/BottomTextEditingToolbar";
import EditorTopBar from "@/components/EditorTopBar/EditorTopBar";

import AddText from "/public/BottomNavigation/AddText.svg";
import EditText from "/public/BottomNavigation/EditText.svg";
import FontSelection from "/public/BottomNavigation/FontSelection.svg";
import FontSizeBottom from "/public/BottomNavigation/FontSizeBottom.svg";
import FontColorBottom from "/public/BottomNavigation/FontColorBottom.svg";
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

const SingleCardAdminEditor = ({ params }) => {
  const draggableRef = useRef(null);
  const {
    devtools,
    setDevtools,
    showModal,
    setShowModal,
    previewData,
    setPreviewData,
    undoHistory,
    setUndoHistory,
    redoHistory,
    setRedoHistory,
    router,
    canvasRef,
    imageData,
    handleTextAlignChange,
    handleTextDelete,
    handleUndo,
    handleRedo,
    handleSaveClick,
    multipleImageFontSizes,
    textStyles,
    setTextStyles,
    textStylesRef,
    selectedTextIndex,
    setSelectedTextIndex,
    editingTextIndex,
    setEditingTextIndex,
    selectedImage,
    setSelectedImage,
    selectedImageTextStyles,
    setSelectedImageTextStyles,
    handleImageClick,
    handleFontSizeChange,
    handleLeftChange,
    handleTopChange,
    incrementLeft,
    decrementLeft,
    incrementTop,
    decrementTop,
    incrementFontSize,
    decrementFontSize,
    handleTextChange,
    handleCanvasClick,
    handleTextDragStop,
    handleTextClick,
    handleMoveToXAxisLeft,
    handleCenterText,
    handleMoveToXAxisRight,
    handleMoveToYAxisTop,
    handleMoveToYAxisBottom,
    handleMoveToYAxisCenter,
    handleFontChange,
    lineHeight,
    handleLineHeightChange,
    letterSpacing,
    handleLetterSpacingChange,
    handleToggleDevtools,
    closePreviewModal,
    isPreviewModalOpen,
    setIsPreviewModalOpen,

    hoverX,
    setHoverX,
    hoverY,
    setHoverY,
    handleCanvasMouseMove,
    handleSaveAndPreviewClick,
    isLoaded,
    setIsLoaded,

    handleTextStyleImage,
    isPreviewLoading,

    colorPickerVisible,
    setColorPickerVisible,
    handleFontColorChange,

    handleSaveToDatabase,

    handleAddText,

    handleImageSizeAdjustment,
    handleWidthAdjustment,
    handleHeightAdjustment,
    updateImageSize,

    handleUppercase,
    handleLowercase,
    handleCapitalize,
    toggleBold,
    toggleItalic,
    toggleUnderline,

    handleResizeMouseDown,
    handleMouseMove,
    handleMouseUp,
    rotationAngle,
    getRotationStyle,

    handleRotateMouseDown,
  } = ImageEditorFunctions({ params });

  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleFontSelect = (fontName) => {
    handleFontChange(selectedTextIndex, fontName);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      // Handle null canvas element here
      return;
    }
    const context = canvas.getContext("2d");

    textStylesRef.current = textStyles;

    if (imageData?.imageType === "multiple image") {
      const selectedImageData = imageData?.images.find(
        (image) => image.watermark === selectedImage
      );

      if (selectedImageData) {
        const image = document.createElement("img");
        image.src = selectedImage;

        image.onload = () => {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          selectedImageData?.textStyles.forEach((textStyle) => {
            context.fillStyle = textStyle?.backgroundColor;
            context.fillRect(
              textStyle?.left,
              textStyle?.top,
              textStyle?.width,
              textStyle?.height
            );
          });
          setTextStyles(
            selectedImageData?.textStyles.map((textStyle) => ({
              ...textStyle,
              fontSize: parseInt(textStyle?.fontSize),
            }))
          );
          setSelectedImageTextStyles(selectedImageData?.textStyles);
        };
      }
    } else {
      const image = document.createElement("img");
      image.src = imageData?.watermark;

      image.onload = () => {
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        textStyles.forEach((textStyle) => {
          context.fillStyle = textStyle?.backgroundColor;
          context.fillRect(
            textStyle?.left,
            textStyle?.top,
            textStyle?.width,
            textStyle?.height
          );
        });
      };
    }
    setIsLoaded(true);
  }, [imageData, selectedImage, textStyles, hoverX, hoverY]);

  useEffect(() => {
    if (selectedTextIndex !== null) {
      const textElement = document.getElementById(
        `textElement_${selectedTextIndex}`
      );
      if (textElement) {
        const textWidth = textElement.getBoundingClientRect().width;
        const canvasWidth = canvasRef.current.width;
        setTextStyles((prevTextStyles) => {
          const updatedTextStyles = [...prevTextStyles];
          updatedTextStyles[selectedTextIndex].left = Math.min(
            canvasWidth - textWidth,
            updatedTextStyles[selectedTextIndex].left
          );
          return updatedTextStyles;
        });
      }
    }
  }, [selectedTextIndex]);

  const handleUpdateButtonClick = () => {
    setShowModal(false);
    // handleCenterText();
  };

  const [bounds, setBounds] = useState({
    left: 0,
    right: 900, // Initial right value for large screens
    top: 0,
    bottom: 1200, // Initial bottom value for large screens
  });

  const [canvasSize, setCanvasSize] = useState({
    width: 415,
    height: 561,
  });

  const [showSlider, setShowSlider] = useState(false);

  const [widthAdjustment, setWidthAdjustment] = useState(100);
  const [heightAdjustment, setHeightAdjustment] = useState(100);

  useEffect(() => {
    const updateCanvasSize = () => {
      const screenWidth = window.innerWidth;
      const maxCanvasWidth = 415; // Maximum canvas width
      const padding = 20; // Padding to keep the canvas within the screen boundaries
      let canvasWidth;

      // Calculate canvas width based on screen width with padding
      if (screenWidth >= maxCanvasWidth + padding * 2) {
        // For screens wider than maxCanvasWidth
        canvasWidth = maxCanvasWidth;
      } else {
        // For screens narrower than maxCanvasWidth
        canvasWidth = screenWidth - padding * 2;
      }

      canvasWidth = Math.max(canvasWidth, 0); // Ensure canvas width is not negative
      const canvasHeight = (canvasWidth / maxCanvasWidth) * 561; // Maintain aspect ratio

      // Update bounds with buffer space on the left and right
      const leftBuffer = (screenWidth - canvasWidth) / 2;
      const rightBuffer = (screenWidth - canvasWidth) / 2;

      setBounds({
        left: leftBuffer,
        right: screenWidth - rightBuffer,
        top: 0,
        bottom: canvasHeight,
      });

      // Update canvas size
      setCanvasSize({
        width: canvasWidth,
        height: canvasHeight,
      });
    };

    // Call the function initially and attach it to resize event
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);

  const [adjustedStyles, setAdjustedStyles] = useState([]);

  useEffect(() => {
    const updateAdjustedStyles = () => {
      const updatedStyles = textStyles.map((style) => {
        return {
          adjustedLeft: style.left * (canvasSize.width / 415),
          adjustedTop: style.top * (canvasSize.height / 561),
        };
      });
      setAdjustedStyles(updatedStyles);
    };

    updateAdjustedStyles();
  }, [canvasSize, textStyles]);

  const [imageSizeAdjustment, setImageSizeAdjustment] = useState(100); // Initial value
  const [isEditingText, setIsEditingText] = useState(false);
  const [editedTextIndex, setEditedTextIndex] = useState(null);

  const handleTextDoubleClick = (index) => {
    setEditedTextIndex(index);
    setIsEditingText(true);
    setShowModal(true);
  };

  return (
    <>
      {!isLoaded && <LoadingOverlay name="Editor is Opening" />}
      <div className="visible lg:hidden pb-5 lg:pb-0">
        <EditorTopBar
          handleUndo={handleUndo}
          handleRedo={handleRedo}
          handleSaveToDatabase={handleSaveAndPreviewClick}
        />
      </div>

      <div
        className="visible lg:hidden "
        style={{ position: "absolute", zIndex: 999 }}
      >
        {selectedTextIndex === null ? (
          <BottomDefaultToolbar
            handleSaveAndPreviewClick={handleSaveAndPreviewClick}
            handleAddText={handleAddText}
          />
        ) : (
          <div
            className="visible lg:hidden"
            key={selectedTextIndex}
            // style={{ position: "absolute", zIndex: 999 }}
          >
            <div
              className="btm-nav btm-nav-sm flex overflow-x-auto content-start justify-start "
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
                            onChange={(e) =>
                              handleTextChange(selectedTextIndex, e)
                            }
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
                    className={`modal modal-bottom ${
                      dropdownOpen ? "open" : ""
                    }`}
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
                  <input
                    type="checkbox"
                    id="FontSize"
                    className="modal-toggle"
                  />
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
                      <div className="mx-4 my-2"></div>
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
                            color={
                              textStyles[selectedTextIndex].backgroundColor
                            }
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
              <button
                className="min-w-[16.7%]  text-2xl"
                onClick={toggleItalic}
              >
                I
              </button>
              <button
                className="min-w-[16.7%]  text-2xl"
                onClick={toggleUnderline}
              >
                U
              </button>
              <button
                className="min-w-[16.7%]  text-2xl"
                onClick={handleUppercase}
              >
                AA
              </button>
              <button
                className="min-w-[16.7%]  text-2xl"
                onClick={handleCapitalize}
              >
                Aa
              </button>
              <button
                className="min-w-[16.7%]  text-2xl"
                onClick={handleLowercase}
              >
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
                                handleMoveToYAxisBottom(
                                  selectedTextIndex,
                                  "top"
                                )
                              }
                            >
                              <BottomAlign className="text-3xl" />
                              Bottom
                            </div>
                          </div>
                        </div>
                      </div>
                      <label
                        className="modal-backdrop"
                        htmlFor="AlignmentModal"
                      >
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
                  <input
                    type="checkbox"
                    id="my_modal_1"
                    className="modal-toggle"
                  />
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
                                handleLineHeightChange(
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
                              handleLetterSpacingChange(
                                parseFloat(e.target.value)
                              )
                            }
                            onInput={(e) =>
                              handleLetterSpacingChange(
                                parseFloat(e.target.value)
                              )
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
        )}
      </div>

      <div
        className="flex flex-col items-center justify-center min-h-[90vh] bg-[#EEEDED] lg:bg-white  text-[#23272A] "
        style={{ zIndex: 1 }}
      >
        <div
          id="canvas"
          className="my-5 hidden lg:block"
          onClick={handleCanvasClick}
        >
          {selectedTextIndex === null ? (
            <div className="flex flex-col sm:flex-row justify-center items-center py-2 sm:py-4 px-4 sm:px-7 gap-2 sm:gap-6">
              <DefaultToolbar
                handleSaveAndPreviewClick={handleSaveAndPreviewClick}
                handleAddText={handleAddText}
              />
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row justify-center items-center py-2 sm:py-4 px-4 sm:px-7 gap-2 sm:gap-6">
              <TextEditingToolbar
                selectedTextIndex={selectedTextIndex}
                showSlider={showSlider}
                imageData={imageData}
                selectedImageTextStyles={selectedImageTextStyles}
                textStyles={textStyles}
                handleFontSizeChange={handleFontSizeChange}
                setShowModal={setShowModal}
                handleSaveClick={handleSaveClick}
                handleSaveToDatabase={handleSaveToDatabase}
                handleAddText={handleAddText}
                devtools={devtools}
                handleLeftChange={handleLeftChange}
                handleTopChange={handleTopChange}
                handleTextAlignChange={handleTextAlignChange}
                handleMoveToXAxisLeft={handleMoveToXAxisLeft}
                handleMoveToXAxisRight={handleMoveToXAxisRight}
                handleCenterText={handleCenterText}
                handleMoveToYAxisTop={handleMoveToYAxisTop}
                handleMoveToYAxisCenter={handleMoveToYAxisCenter}
                handleMoveToYAxisBottom={handleMoveToYAxisBottom}
                handleFontChange={handleFontChange}
                lineHeight={lineHeight}
                handleLineHeightChange={handleLineHeightChange}
                letterSpacing={letterSpacing}
                handleLetterSpacingChange={handleLetterSpacingChange}
                setColorPickerVisible={setColorPickerVisible}
                colorPickerVisible={colorPickerVisible}
                handleFontColorChange={handleFontColorChange}
                handleImageSizeAdjustment={handleImageSizeAdjustment}
                widthAdjustment={widthAdjustment}
                handleWidthAdjustment={handleWidthAdjustment}
                heightAdjustment={heightAdjustment}
                handleHeightAdjustment={handleHeightAdjustment}
                handleUndo={handleUndo}
                handleRedo={handleRedo}
                handleSaveAndPreviewClick={handleSaveAndPreviewClick}
                handleUppercase={handleUppercase}
                handleLowercase={handleLowercase}
                handleCapitalize={handleCapitalize}
                toggleBold={toggleBold}
                toggleItalic={toggleItalic}
                toggleUnderline={toggleUnderline}
                handleResizeMouseDown={handleResizeMouseDown}
                handleMouseMove={handleMouseMove}
                handleMouseUp={handleMouseUp}
                rotationAngle={rotationAngle}
                incrementFontSize={incrementFontSize}
                decrementFontSize={decrementFontSize}
              />
            </div>
          )}

          {showModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-3xl">
                <div className="relative w-full my-6 mx-auto max-w-3xl">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-1xl font-semibold">
                        Update Your Text
                      </h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                      >
                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                          ×
                        </span>
                      </button>
                    </div>

                    <div className="relative p-6 flex-auto">
                      <textarea
                        id={`textInput-${selectedTextIndex}`}
                        value={textStyles[selectedTextIndex]?.text}
                        onChange={(e) => handleTextChange(selectedTextIndex, e)}
                        className="border border-gray-300 rounded px-2 py-1 mt-1 placeholder:text-black w-full resize-none"
                        style={{ whiteSpace: "pre-wrap" }}
                        rows={4} // Set the number of rows you want to display initially
                      />
                    </div>

                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        className="bg-[#23272A] text-white active:bg-[#23272A] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={handleUpdateButtonClick}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
        </div>

        <div className="relative">
          {isLoaded && (
            <>
              {textStyles.map((textStyle, index) => {
                const adjustedWidth =
                  textStyle.width * (canvasSize.width / 415);
                const adjustedHeight =
                  textStyle.height * (canvasSize.height / 561);

                const adjustedStyle = adjustedStyles[index];
                if (!adjustedStyle) return null; // Add this line to handle undefined adjustedStyle
                const { adjustedLeft, adjustedTop } = adjustedStyle;

                return (
                  <Draggable
                    key={index}
                    nodeRef={draggableRef}
                    defaultPosition={{ x: adjustedLeft, y: adjustedTop }}
                    position={
                      textStyle.isSelected
                        ? { x: textStyle.left, y: textStyle.top }
                        : null
                    }
                    onStart={() => {
                      // Check if defaultPosition has been applied
                      if (draggableRef.current.style.transform === "") {
                        // If not, set the position based on current state or props
                        const { x, y } = textStyle.isSelected
                          ? { x: textStyle.left, y: textStyle.top }
                          : { x: adjustedLeft, y: adjustedTop };
                        draggableRef.current.style.transform = `translate(${x}px, ${y}px)`;
                      }
                    }}
                    onStop={(e, data) => handleTextDragStop(index, data, e)}
                    bounds={{
                      left: 0,
                      right: canvasSize.width,
                      top: 0,
                      bottom: canvasSize.height,
                    }}
                    cancel=".no-drag"
                    // Add touchAction and userSelect props
                    touchAction="none" // Prevent default touch actions like scrolling
                    userSelect="none" // Disable text selection during drag
                  >
                    <div
                      id={`textElement_${index}`}
                      ref={draggableRef}
                      className={`absolute ${
                        textStyle.isSelected
                          ? "border-gray-500  border-2 border-solid"
                          : ""
                      }`}
                      style={{
                        // ...getRotationStyle(index),
                        whiteSpace: "pre-wrap",
                        // whiteSpace: "nowrap",
                        cursor: "pointer",
                        WebkitTouchCallout: "none",
                        WebkitUserSelect: "none",
                        KhtmlUserSelect: "none",
                        MozUserSelect: "none",
                        MsUserSelect: "none",
                        userSelect: "none",
                        fontWeight: textStyle.fontWeight, // For bold
                        fontStyle: textStyle.fontStyle, // For italic
                        textDecoration: textStyle.textDecoration, // For underline

                        // overflow: "hidden",
                      }}
                    >
                      <div className="no-drag">
                        {textStyle.isSelected && (
                          <>
                            <div
                              className="absolute bottom-0 right-0 -mb-2 z-30  -mr-4 p-1 bg-white rounded-full cursor-nwse-resize text-black"
                              onMouseDown={(e) =>
                                handleResizeMouseDown(e, index, "bottomRight")
                              }
                            >
                              <TextResize size={15} />
                            </div>
                          </>
                        )}
                      </div>
                      {textStyle?.startingImage && ( // Check if the textStyle has an image property
                        <Image
                          src={textStyle?.startingImage}
                          alt="Image"
                          width={adjustedWidth}
                          height={adjustedHeight}
                          style={{
                            ...getRotationStyle(index),
                            // position: "relative",
                            width: adjustedWidth,
                            height: adjustedHeight,
                            left: adjustedLeft,
                            top: adjustedTop,
                            objectFit: textStyle?.objectFit || "contain",
                            backgroundColor: "none",
                          }}
                          onClick={() => handleTextStyleImage(index)}
                          onTouchStart={(event) => {
                            handleTextStyleImage(index);
                          }}
                          // onLoad={() => console.log("Image loaded successfully!")}
                        />
                      )}

                      {textStyle?.text &&
                        textStyle?.text.split("\n").map((line, lineIndex) => {
                          const adjustedLetterSpacing =
                            (textStyle?.letterSpacing || 1.5) *
                            (canvasSize.width / 415);

                          return (
                            <div
                              key={lineIndex}
                              style={{
                                color: textStyle?.backgroundColor,
                                fontFamily: textStyle?.fontFamily,
                                fontSize: `${
                                  parseInt(textStyle?.fontSize) *
                                  (canvasSize.width / 415)
                                }px`,
                                ...getRotationStyle(index),
                                textAlign: textStyle?.textAlign,
                                lineHeight: textStyle?.lineHeight || 1.5,
                                letterSpacing: adjustedLetterSpacing,
                                textDecoration: textStyle?.textDecoration,
                              }}
                              onClick={(event) => {
                                handleTextClick(index, event);
                              }}
                              onTouchStart={(event) => {
                                handleTextClick(index, event);
                              }}
                              onDoubleClick={() => handleTextDoubleClick(index)}
                            >
                              {line}
                            </div>
                          );
                        })}

                      {textStyle?.isSelected && (
                        <>
                          <button
                            className="absolute bottom-[-40px] left-2/3 -mt-14 -mr-2 p-1 text-black bg-white rounded-full border border-gray-300 focus:outline-none z-30 transform -translate-x-1/2"
                            onClick={(e) => handleTextDelete(e, index)}
                          >
                            <Trash2 size={14} />
                          </button>

                          <button
                            className="absolute bottom-[-40px] left-1/3 -mt-14 -ml-2 p-1 text-black bg-white rounded-full border border-gray-300 focus:outline-none z-30 transform -translate-x-1/2"
                            onMouseDown={(e) =>
                              handleRotateMouseDown(e, selectedTextIndex)
                            }
                          >
                            <RefreshCw size={14} />
                          </button>
                        </>
                      )}
                    </div>
                  </Draggable>
                );
              })}
            </>
          )}
          <div
            className="border mx-auto"
            style={{
              width: canvasSize.width,
              height: canvasSize.height,
            }}
          >
            <canvas
              ref={canvasRef}
              className="w-full h-full"
              width={canvasSize.width}
              height={canvasSize.height}
              onMouseMove={handleCanvasMouseMove}
            ></canvas>
          </div>
        </div>

        <h1 className="text-center mb-16 text-3xl font-bold leading-5 mt-5">
          {imageData?.title}
        </h1>

        {isPreviewModalOpen && (
          <PreviewModal previewData={previewData} onClose={closePreviewModal} />
        )}

        {isPreviewLoading && <LoadingOverlay message={"Preview is Loading"} />}
      </div>
    </>
  );
};

export default SingleCardAdminEditor;
