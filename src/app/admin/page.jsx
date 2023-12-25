"use client";
import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import Image from "next/image";
import { ChromePicker } from "react-color";

// import images from "@/Data/Draft_Data";
import { fonts } from "@/Data/Fonts_Data";
import PreviewModal from "@/components/PreviewModal/PreviewModal";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import ImageEditorFunctions from "@/components/ImageEditor/ImageEditorFunctions";

import {
  BiArrowToLeft,
  BiArrowToRight,
  BiArrowToTop,
  BiArrowToBottom,
  BiHorizontalCenter,
} from "react-icons/bi";
import { CiEdit, CiRedo } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";
import { BsArrowsCollapse } from "react-icons/bs";
import { FiAlignLeft, FiAlignCenter, FiAlignRight } from "react-icons/fi";

import Undo from "/public/icons/undo.svg";
import Edit from "/public/icons/editor/edit.svg";
import Maximum from "/public/icons/editor/maximize.svg";
import ModalForTextEdit from "@/components/ModalForTextEdit/ModalForTextEdit";
import TextEditingToolbar from "@/components/TextEditingToolbar/TextEditingToolbar";
import DefaultToolbar from "@/components/DefaultToolbar/DefaultToolbar";

const SingleCardAdminEditor = ({ params }) => {
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
  } = ImageEditorFunctions({ params });

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

  const [imageSizeAdjustment, setImageSizeAdjustment] = useState(100); // Initial value

  return (
    <>
      {!isLoaded && <LoadingOverlay name="Editor is Opening" />}
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-[#23272A]">
        <h1 className="text-center text-3xl font-bold leading-5 mt-5">
          {imageData?.title}
        </h1>

        <div id="canvas" className="my-5" onClick={handleCanvasClick}>
          {selectedTextIndex === null ? (
            <div className="flex justify-center mt-4">
              <DefaultToolbar />
            </div>
          ) : (
            <div className="flex justify-center mt-4">
              <TextEditingToolbar selectedTextIndex={selectedTextIndex} />
            </div>
          )}

          <ModalForTextEdit
            selectedTextIndex={selectedTextIndex}
            showModal={showModal}
            setShowModal={setShowModal}
            handleUpdateButtonClick={handleUpdateButtonClick}
          />
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

                const adjustedImageWidth =
                  (adjustedWidth * imageSizeAdjustment) / 100;
                const adjustedImageHeight =
                  (adjustedHeight * imageSizeAdjustment) / 100;

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
                          ? "border-gray-500  border-2 border-dashed"
                          : ""
                      }`}
                      style={{
                        whiteSpace: "pre-wrap",
                        // whiteSpace: "nowrap",
                        cursor: "pointer",
                        // overflow: "hidden",
                      }}
                    >
                      {textStyle?.startingImage && ( // Check if the textStyle has an image property
                        <Image
                          src={textStyle?.startingImage}
                          alt="Image"
                          width={adjustedImageWidth}
                          height={adjustedImageHeight}
                          style={{
                            // position: "relative",
                            width: adjustedImageWidth,
                            height: adjustedImageHeight,
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
                          className="absolute top-0 right-0 -mt-4 -mr-4 p-1 text-red-600 bg-white rounded-full border border-gray-300 focus:outline-none"
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

        {imageData && imageData?.imageType === "multiple image" && (
          <div className="flex justify-center mt-4">
            {imageData.images.map((image, index) => (
              <div className="flex flex-col text-center mx-3" key={index}>
                <Image
                  width={0}
                  height={0}
                  key={image.id}
                  src={image.watermark}
                  alt={`Image ${image.id}`}
                  className={`w-16 h-16 mx-1 cursor-pointer ${
                    selectedImage === image.watermark
                      ? "border-2 border-blue-500"
                      : ""
                  }`}
                  onClick={() => handleImageClick(image.watermark)}
                />
                <p>Page {index + 1}</p>
              </div>
            ))}
          </div>
        )}

        {isPreviewModalOpen && (
          <PreviewModal previewData={previewData} onClose={closePreviewModal} />
        )}

        {isPreviewLoading && <LoadingOverlay message={"Preview is Loading"} />}
      </div>

      {/* <Footer /> */}
    </>
  );
};

export default SingleCardAdminEditor;
