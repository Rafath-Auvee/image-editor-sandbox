"use client";
import Draggable from "react-draggable";
import ImageEditorFunctions from "@/components/ImageEditor/ImageEditorFunctions";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { IoResize } from "react-icons/io5";
// import images from "@/Data/Draft_Data";
import { fonts } from "@/Data/Fonts_Data";
import Edit from "/public/icons/editor/edit.svg";
import Maximum from "/public/icons/editor/maximize.svg";
// import PreviewModal from "@/components/PreviewModal/PreviewModal";
import { ChromePicker } from "react-color";

import { FiAlignLeft, FiAlignCenter, FiAlignRight } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import { BsArrowsCollapse } from "react-icons/bs";
import {
  BiArrowToLeft,
  BiArrowToRight,
  BiArrowToTop,
  BiArrowToBottom,
  BiHorizontalCenter,
} from "react-icons/bi";

import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";

import Undo from "/public/icons/undo.svg";
import { CiEdit, CiRedo } from "react-icons/ci";

const ImageEditor = ({ params }) => {
  const [showSlider, setShowSlider] = useState(false);

  const [isResizing, setIsResizing] = useState(false);
  const [resizingTextIndex, setResizingTextIndex] = useState(null);
  const [initialMousePosition, setInitialMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [initialFontSize, setInitialFontSize] = useState(0);

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
    selectedImageTextStyles,
    setSelectedImageTextStyles,
    handleFontSizeChange,
    handleTextChange,
    handleCanvasClick,
    handleTextDragStop,
    handleTextClick,
    handleCenterText,
    closePreviewModal,
    isPreviewModalOpen,
    hoverX,
    hoverY,
    handleCanvasMouseMove,
    handleSaveAndPreviewClick,
    isLoaded,
    setIsLoaded,
    handleTextStyleImage,
    isPreviewLoading,
  } = ImageEditorFunctions({ params });

  const [rotationAngle, setRotationAngle] = useState(0); // Default angle is 0

  const [resizingCorner, setResizingCorner] = useState(null);

  const getRotationStyle = (index) => {
    if (index === selectedTextIndex) {
      return {
        transform: `rotate(${rotationAngle}deg)`,
        transformOrigin: "center",
      };
    }
    return {};
  };

  useEffect(() => {
    const canvas = canvasRef.current;
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
    // First, close the modal
    setShowModal(false);

    // Then, center the selected text
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

  const handleResizeMouseDown = (e, index, corner) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizingTextIndex(index);
    setInitialMousePosition({ x: e.clientX, y: e.clientY });
    setInitialFontSize(textStyles[index].fontSize);
    setResizingCorner(corner);

    // Change cursor to a resizing cursor when mouse is down
    document.body.style.cursor = "nwse-resize";

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = useCallback(
    (e) => {
      if (isResizing && resizingTextIndex !== null) {
        const currentTextStyle = textStyles[resizingTextIndex];
        let deltaWidth, deltaHeight;
        let newLeft = currentTextStyle.left,
          newTop = currentTextStyle.top;

        // Calculate deltas
        if (resizingCorner === "topLeft" || resizingCorner === "bottomLeft") {
          deltaWidth = initialMousePosition.x - e.clientX;
        } else {
          deltaWidth = e.clientX - initialMousePosition.x;
        }

        if (resizingCorner === "topLeft" || resizingCorner === "topRight") {
          deltaHeight = initialMousePosition.y - e.clientY;
        } else {
          deltaHeight = e.clientY - initialMousePosition.y;
        }

        const scaleFactor = 0.1;
        const newFontSize = Math.max(
          5,
          initialFontSize + Math.max(deltaWidth, deltaHeight) * scaleFactor
        );

        // Adjust positions based on corner
        if (resizingCorner === "bottomLeft" || resizingCorner === "topLeft") {
          newLeft = currentTextStyle.left - deltaWidth;
        }
        if (resizingCorner === "topLeft" || resizingCorner === "topRight") {
          newTop = currentTextStyle.top - deltaHeight;
        }

        setTextStyles((prevTextStyles) =>
          prevTextStyles.map((style, i) => {
            if (i === resizingTextIndex) {
              return {
                ...style,
                fontSize: newFontSize,
                left: newLeft,
                top: newTop,
              };
            }
            return style;
          })
        );
      }
    },
    [
      isResizing,
      resizingTextIndex,
      initialMousePosition,
      initialFontSize,
      textStyles,
      resizingCorner,
    ]
  );

  const handleMouseUp = useCallback(() => {
    if (isResizing) {
      setIsResizing(false);
      setResizingTextIndex(null);
      setInitialMousePosition({ x: 0, y: 0 });
      setInitialFontSize(0);

      // Revert cursor to default when mouse is released
      document.body.style.cursor = "default";

      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
  }, [isResizing, handleMouseMove]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <>
      {!isLoaded && <LoadingOverlay name="Editor is Opening" />}
      {/* <Navbar /> */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-[#23272A]">
        {/* <button
          className="bg-[#23272A] text-white rounded px-4 py-2 mr-2 "
          onClick={handleToggleDevtools}
        >
          Devtools:
          {devtools ? "True" : "False"}
        </button> */}
        <h1 className="text-center text-3xl font-bold leading-9 mt-5">
          {imageData?.title}
        </h1>

        <div id="canvas" className="my-5" onClick={handleCanvasClick}>
          {selectedTextIndex === null && (
            <div key={selectedTextIndex} className="">
              <div className="rounded border-[#CDD0DA] border flex justify-center py-4 px-7 flex-wrap md:flex-nowrap gap-x-0 md:gap-x-12">
                <div className="flex w-full md:w-auto gap-x-0 md:gap-x-12">
                  <div className="flex flex-col justify-center align-center items-center cursor-pointer flex-grow ">
                    <button className="text-4xl">
                      <Edit />
                    </button>
                    <label className="font-bold cursor-pointer">Edit</label>
                  </div>

                  <div className="flex flex-col justify-center align-center items-center cursor-pointer flex-grow ">
                    <Maximum />

                    <button>Size</button>
                  </div>

                  <div
                    className="flex flex-col justify-center align-center items-center cursor-pointer flex-grow "
                    // onClick={() => handleUndo()}
                    onClick={handleUndo}
                  >
                    <button className="text-6xl">
                      <Undo />
                    </button>
                    <label
                      className="font-bold cursor-pointer"
                      htmlFor={`undo-${selectedTextIndex}`}
                    >
                      Undo
                    </label>
                  </div>

                  <div
                    className="flex flex-col justify-center align-center items-center cursor-pointer flex-grow "
                    // onClick={() => handleUndo()}
                    onClick={handleRedo}
                  >
                    <button className="text-2xl">
                      <CiRedo />
                    </button>
                    <label
                      className="font-bold cursor-pointer"
                      htmlFor={`redo-${selectedTextIndex}`}
                    >
                      Redo
                    </label>
                  </div>
                </div>
                <div className="flex w-full md:w-auto py-3 md:py-0">
                  <button
                    onClick={handleSaveAndPreviewClick}
                    className="bg-[#23272A] w-full md:w-auto text-white rounded px-4 py-2 mr-0 "
                  >
                    Save & Preview
                  </button>
                </div>
              </div>
            </div>
          )}
          {selectedTextIndex !== null && (
            <div
              key={selectedTextIndex}
              className={`rounded border-[#CDD0DA] border flex justify-center py-4 px-7 flex-wrap md:flex-nowrap gap-x-0 md:gap-x-12`}
            >
              <div className="flex w-full md:w-auto gap-x-0 md:gap-x-12">
                {/* <div className="rotation-input-container">
                  <label htmlFor="rotationAngle">Rotation Angle:</label>
                  <input
                    type="number"
                    id="rotationAngle"
                    value={rotationAngle}
                    onChange={(e) => setRotationAngle(e.target.value)}
                  />
                </div> */}
                <div
                  className="flex flex-col justify-center align-center items-center cursor-pointer flex-grow "
                  onClick={() => setShowModal(true)}
                >
                  <button className="text-4xl">
                    <Edit />
                  </button>
                  <label
                    className="font-bold cursor-pointer"
                    htmlFor={`textInput-${selectedTextIndex}`}
                  >
                    Edit
                  </label>
                </div>
                <div className="flex flex-col justify-end align-center items-center cursor-pointer flex-grow ">
                  {showSlider ? (
                    <div className="flex flex-col justify-center items-center align-center">
                      <div className="flex flex-col justify-center">
                        <div
                          className="tooltip tooltip-open tooltip-top"
                          data-tip={
                            imageData.imageType === "multiple image"
                              ? selectedImageTextStyles[selectedTextIndex]
                                  ?.fontSize
                              : textStyles.length > selectedTextIndex
                              ? textStyles[selectedTextIndex].fontSize
                              : "20"
                          }
                        ></div>
                        <input
                          id={`fontSizeInput-${selectedTextIndex}`}
                          type="range"
                          value={
                            imageData.imageType === "multiple image"
                              ? selectedImageTextStyles[selectedTextIndex]
                                  ?.fontSize
                              : textStyles.length > selectedTextIndex
                              ? textStyles[selectedTextIndex].fontSize
                              : "20"
                          }
                          onChange={(e) =>
                            handleFontSizeChange(selectedTextIndex, e)
                          }
                          onInput={(e) =>
                            handleFontSizeChange(selectedTextIndex, e)
                          }
                          className="range range-xs"
                          min="5"
                          max="100"
                        />
                      </div>
                    </div>
                  ) : (
                    <div onClick={() => setShowSlider(true)}>
                      <Maximum />
                      <button>Size</button>
                    </div>
                  )}
                </div>

                <div
                  className="flex flex-col justify-center align-center items-center cursor-pointer flex-grow "
                  onClick={handleUndo}
                >
                  <button className="text-6xl">
                    <Undo />
                  </button>
                  <label
                    className="font-bold cursor-pointer"
                    htmlFor={`undo-${selectedTextIndex}`}
                  >
                    Undo
                  </label>
                </div>

                <div
                  className="flex flex-col justify-center align-center items-center cursor-pointer flex-grow "
                  // onClick={() => handleUndo()}
                  onClick={handleRedo}
                >
                  <button className="text-2xl">
                    <CiRedo />
                  </button>
                  <label
                    className="font-bold cursor-pointer"
                    htmlFor={`redo-${selectedTextIndex}`}
                  >
                    Redo
                  </label>
                </div>
              </div>
              <div className="flex w-full md:w-auto py-3 md:py-0">
                <button
                  onClick={handleSaveAndPreviewClick}
                  className="bg-[#23272A] w-full md:w-auto text-white rounded px-4 py-2 mr-0 "
                >
                  Save & Preview
                </button>
              </div>
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
                const adjustedLeft = textStyle.left * (canvasSize.width / 415);
                const adjustedTop = textStyle.top * (canvasSize.height / 561);

                return (
                  <Draggable
                    key={index}
                    position={{ x: adjustedLeft, y: adjustedTop }}
                    onStop={(e, data) => handleTextDragStop(index, data)}
                    bounds={{
                      left: 0,
                      right: canvasSize.width,
                      top: 0,
                      bottom: canvasSize.height,
                    }}
                  >
                    <div
                      id={`textElement_${index}`}
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

                        // overflow: "hidden",
                      }}
                    >
                      {textStyle.isSelected && (
                        <>
                          <div
                            className="absolute bottom-0 right-0 -mb-2  -mr-4 p-1 bg-white rounded-full cursor-nwse-resize text-black"
                            onMouseDown={(e) =>
                              handleResizeMouseDown(e, index, "bottomRight")
                            }
                          >
                            <IoResize size={15} />
                          </div>
                        </>
                      )}

                      {textStyle?.startingImage && ( // Check if the textStyle has an image property
                        <Image
                          src={textStyle?.startingImage}
                          alt="Image"
                          width={adjustedWidth}
                          height={adjustedHeight}
                          style={{
                            ...getRotationStyle(index),
                            // position: "relative",
                            left: adjustedLeft,
                            top: adjustedTop,
                            objectFit: textStyle?.objectFit || "contain",
                            backgroundColor: "none",
                          }}
                          onClick={() => handleTextStyleImage(index)}
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
                                color: textStyle?.backgroundColor, // Apply the font color here
                                fontFamily: textStyle?.fontFamily,
                                fontSize: `${
                                  parseInt(textStyle?.fontSize) *
                                  (canvasSize.width / 415)
                                }px`,
                                ...getRotationStyle(index),
                                textAlign: textStyle?.textAlign,
                                lineHeight: textStyle?.lineHeight || 1.5,
                                letterSpacing: adjustedLetterSpacing,
                              }}
                              onClick={() => handleTextClick(index)}
                            >
                              {line}
                            </div>
                          );
                        })}

                      {textStyle?.isSelected && (
                        <button
                          className="absolute top-0 right-0 -mt-4 -mr-4 p-1 text-red-600 bg-white rounded-full border border-gray-300 focus:outline-none z-10"
                          onClick={(e) => handleTextDelete(e, index)}
                        >
                          <IoCloseSharp size={20} />
                        </button>
                      )}
                    </div>
                  </Draggable>
                );
              })}
            </>
          )}
          <div
            className="border mx-auto" // Center the canvas using mx-auto (margin auto) class
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

        {/* {isPreviewModalOpen && (
          <PreviewModal previewData={previewData} onClose={closePreviewModal} />
        )} */}

        {isPreviewLoading && <LoadingOverlay message={"Preview is Loading"} />}
      </div>

      {/* <Footer /> */}
    </>
  );
};

export default ImageEditor;
