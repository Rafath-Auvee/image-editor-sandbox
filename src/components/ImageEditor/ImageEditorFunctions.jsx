"use client";

// import { useSession } from "next-auth/react";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
// import { usePreviewDataContext } from "@/components/PreviewDataContext/PreviewDataContext";
import axios from "axios";
import { card } from "@/Data/card";

const ImageEditorFunctions = ({ params, images }) => {
  // const { data: session } = useSession();

  // // console.log(session);

  const [devtools, setDevtools] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [undoHistory, setUndoHistory] = useState([]);
  const [redoHistory, setRedoHistory] = useState([]);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  //   const { editorPreviewData, setEditorPreviewData } = usePreviewDataContext();

  const handleToggleDevtools = () => {
    setDevtools((prevDevtools) => !prevDevtools);
  };

  // Assuming 'card' is an array and you need the first object.
  const cardData = card[0]; // Access the first object in the array

  // Initialize the imageData and textStyles states with data from the card
  const [imageData, setImageData] = useState(cardData);
  const [textStyles, setTextStyles] = useState(cardData.textStyles);

  const router = useRouter();
  const canvasRef = useRef(null);

  const handleTextAlignChange = (alignment) => {
    if (selectedTextIndex !== null) {
      const updatedTextStyles = [...textStyles];
      updatedTextStyles[selectedTextIndex].textAlign = alignment;
      setTextStyles(updatedTextStyles);

      setUndoHistory([...undoHistory, textStylesRef.current]);
    }
  };

  const handleTextDelete = (e, index) => {
    e.stopPropagation();
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // If the selected text has a starting image, clear the area occupied by the starting image
    if (textStyles[index]?.startingImage) {
      const image = document.createElement("img");
      image.src = textStyles[index].startingImage;
      image.onload = () => {
        context.clearRect(
          textStyles[index].left,
          textStyles[index].top,
          0, // Set width to 0 to clear the area
          0 // Set height to 0 to clear the area
        );
      };
    }

    // Remove the selected text from the textStyles array
    const updatedTextStyles = [...textStyles];
    updatedTextStyles.splice(index, 1);
    setTextStyles(updatedTextStyles);

    // Deselect the deleted text if it was selected
    if (selectedTextIndex === index) {
      setSelectedTextIndex(null);
    }

    // Save the current text styles in the undo history
    setUndoHistory([...undoHistory, textStylesRef.current]);
  };
  const textStylesRef = useRef(textStyles);

  const handleUndo = useCallback(() => {
    if (undoHistory.length > 0) {
      const prevTextStyles = undoHistory.pop();
      setRedoHistory([...redoHistory, textStylesRef.current]);
      setTextStyles(prevTextStyles);
    }
  }, [undoHistory, redoHistory, setRedoHistory, setTextStyles, textStylesRef]);

  const handleRedo = useCallback(() => {
    if (redoHistory.length > 0) {
      const nextTextStyles = redoHistory.pop();
      setUndoHistory([...undoHistory, textStylesRef.current]);
      setTextStyles(nextTextStyles);
    }
  }, [redoHistory, undoHistory, setUndoHistory, setTextStyles, textStylesRef]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check for both Ctrl + Z and Command + Z for Undo
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "z" &&
        !event.shiftKey
      ) {
        handleUndo();
      }
      // Check for Ctrl + Y, Ctrl + Shift + Z, and Command + Shift + Z for Redo
      else if (
        (event.ctrlKey || event.metaKey) &&
        (event.key.toLowerCase() === "y" ||
          (event.key.toLowerCase() === "z" && event.shiftKey))
      ) {
        handleRedo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleUndo, handleRedo]);

  const multipleImageFontSizes =
    imageData?.imageType === "multiple image"
      ? imageData.images.map((image) =>
          image.textStyles.map((textStyle) => textStyle.fontSize)
        )
      : [];

  const [colorPickerVisible, setColorPickerVisible] = useState(false);

  const [selectedTextIndex, setSelectedTextIndex] = useState(null);
  const [editingTextIndex, setEditingTextIndex] = useState(null);

  const [selectedImage, setSelectedImage] = useState(
    imageData?.images ? imageData.images[0].watermark : null
  );

  const [selectedImageTextStyles, setSelectedImageTextStyles] = useState(
    imageData?.images ? imageData.images[0].textStyles : []
  );

  const handleImageClick = (url) => {
    setSelectedImage(url);
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const selectedImageData = imageData.images.find(
      (image) => image.watermark === url
    );
    const image = document.createElement("img");
    image.src = url;
    image.onload = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      selectedImageData.textStyles.forEach((textStyle) => {
        context.fillStyle = textStyle.backgroundColor;
        context.fillRect(
          textStyle.left,
          textStyle.top,
          textStyle.width,
          textStyle.height
        );
      });
      setTextStyles(
        selectedImageData.textStyles.map((textStyle) => ({
          ...textStyle,
          fontSize: parseInt(textStyle.fontSize),
        }))
      );
      setSelectedImageTextStyles(selectedImageData.textStyles);
    };
  };

  // Rest of the functions from the ImageEditor component...
  // const handleFontSizeChange = (index, e) => {
  //   const fontSize = parseInt(e.target.value);

  //   if (!isNaN(fontSize)) {
  //     const updatedTextStyles = textStyles.map((textStyle, i) => {
  //       if (i === index) {
  //         return {
  //           ...textStyle,
  //           fontSize,
  //         };
  //       }
  //       return textStyle;
  //     });

  //     setTextStyles(updatedTextStyles);

  //     if (imageData.imageType === "multiple image") {
  //       const selectedImageData = imageData.images.find(
  //         (img) => img.watermark === selectedImage
  //       );
  //       selectedImageData.textStyles = updatedTextStyles;
  //       setSelectedImageTextStyles(updatedTextStyles);
  //     }
  //   }
  // };

  const handleFontSizeChange = (index, e) => {
    const fontSize = parseInt(e.target.value);

    if (!isNaN(fontSize)) {
      const updatedTextStyles = textStyles.map((textStyle, i) => {
        if (i === index) {
          return {
            ...textStyle,
            fontSize,
          };
        }
        return textStyle;
      });

      setTextStyles(updatedTextStyles);

      // Centering logic after updating the text styles.
      // const canvasWidth = canvasRef.current.offsetWidth;
      // const textElement = document.getElementById(`textElement_${index}`);
      // const textWidth = textElement.getBoundingClientRect().width;
      // updatedTextStyles[index].left = Math.max(
      //   (canvasWidth - textWidth) / 2,
      //   0
      // );

      if (imageData.imageType === "multiple image") {
        const selectedImageData = imageData.images.find(
          (img) => img.watermark === selectedImage
        );
        selectedImageData.textStyles = updatedTextStyles;
        setSelectedImageTextStyles(updatedTextStyles);
      }
    }
  };

  const handleLeftChange = (index, e) => {
    const updatedTextStyles = [...textStyles];
    updatedTextStyles[index] = {
      ...updatedTextStyles[index],
      left: parseInt(e.target.value),
    };
    setTextStyles(updatedTextStyles);
  };

  const handleTopChange = (index, e) => {
    const updatedTextStyles = [...textStyles];
    updatedTextStyles[index] = {
      ...updatedTextStyles[index],
      top: parseInt(e.target.value),
    };
    setTextStyles(updatedTextStyles);
  };

  const incrementLeft = (index) => {
    const updatedTextStyles = [...textStyles];
    updatedTextStyles[index] = {
      ...updatedTextStyles[index],
      left: updatedTextStyles[index].left + 1,
    };
    setTextStyles(updatedTextStyles);
  };

  const decrementLeft = (index) => {
    const updatedTextStyles = [...textStyles];
    updatedTextStyles[index] = {
      ...updatedTextStyles[index],
      left: updatedTextStyles[index].left - 1,
    };
    setTextStyles(updatedTextStyles);
  };

  const incrementTop = (index) => {
    const updatedTextStyles = [...textStyles];
    updatedTextStyles[index] = {
      ...updatedTextStyles[index],
      top: updatedTextStyles[index].top + 1,
    };
    setTextStyles(updatedTextStyles);
  };

  const decrementTop = (index) => {
    const updatedTextStyles = [...textStyles];
    updatedTextStyles[index] = {
      ...updatedTextStyles[index],
      top: updatedTextStyles[index].top - 1,
    };
    setTextStyles(updatedTextStyles);
  };

  const incrementFontSize = (index) => {
    const updatedTextStyles = [...textStyles];
    updatedTextStyles[index] = {
      ...updatedTextStyles[index],
      fontSize: updatedTextStyles[index].fontSize + 1,
    };
    setTextStyles(updatedTextStyles);
  };

  const decrementFontSize = (index) => {
    const updatedTextStyles = [...textStyles];
    updatedTextStyles[index] = {
      ...updatedTextStyles[index],
      fontSize: updatedTextStyles[index].fontSize - 1,
    };
    setTextStyles(updatedTextStyles);
  };

  const handleTextChange = (index, e) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.font = `${textStyles[index].fontSize}px ${textStyles[index].fontFamily}`;

    // Calculate initial text width
    const initialTextWidth = context.measureText(textStyles[index].text).width;

    // Update the text
    const updatedText = e.target.value;
    const updatedTextStyles = [...textStyles];
    updatedTextStyles[index] = {
      ...updatedTextStyles[index],
      text: updatedText,
    };

    // Recalculate text width
    const updatedTextWidth = context.measureText(updatedText).width;

    // Adjust left based on alignment
    const alignment = updatedTextStyles[index].textAlign;
    const initialLeft = updatedTextStyles[index].left;
    if (alignment === "center") {
      updatedTextStyles[index].left =
        initialLeft + (initialTextWidth - updatedTextWidth) / 2;
    } else if (alignment === "right") {
      updatedTextStyles[index].left =
        initialLeft + (initialTextWidth - updatedTextWidth);
    } else {
      updatedTextStyles[index].left = updatedTextStyles[index].left;
    }

    // Update the text styles
    setTextStyles(updatedTextStyles);

    if (imageData.imageType === "multiple image") {
      const selectedImageData = imageData.images.find(
        (img) => img.watermark === selectedImage
      );
      selectedImageData.textStyles = updatedTextStyles;
      setSelectedImageTextStyles(updatedTextStyles);
    }
  };

  const handleCanvasClick = (e) => {
    const canvas = document.getElementById("canvas");
    if (!canvas.contains(e.target)) {
      setSelectedTextIndex(null);
    }
  };

  const handleTextDragStop = (index, data) => {
    const updatedTextStyles = [...textStyles];
    updatedTextStyles[index] = {
      ...updatedTextStyles[index],
      left: data.x,
      top: data.y,
    };
    setTextStyles(updatedTextStyles);
    setUndoHistory([...undoHistory, textStylesRef.current]);

    if (imageData?.imageType === "multiple image") {
      const selectedImageData = imageData.images.find(
        (img) => img.watermark === selectedImage
      );
      selectedImageData.textStyles = updatedTextStyles;
    }
  };

  const handleMoveToXAxisLeft = (index, axis) => {
    const updatedTextStyles = [...textStyles];
    updatedTextStyles[index] = {
      ...updatedTextStyles[index],
      [axis]: 0,
    };
    setTextStyles(updatedTextStyles);
  };

  const handleCenterText = () => {
    const updatedTextStyles = [...textStyles];
    const canvasWidth = canvasRef.current.offsetWidth;

    if (selectedTextIndex !== null) {
      const selectedTextStyle = textStyles[selectedTextIndex];
      const textElement = document.getElementById(
        `textElement_${selectedTextIndex}`
      );
      const textWidth = textElement.getBoundingClientRect().width;

      updatedTextStyles[selectedTextIndex].left = Math.max(
        (canvasWidth - textWidth) / 2,
        0
      );
      setTextStyles(updatedTextStyles);
    }
  };

  const handleMoveToXAxisRight = () => {
    const updatedTextStyles = [...textStyles];
    const canvasWidth = canvasRef.current.offsetWidth;

    if (selectedTextIndex !== null) {
      const selectedTextStyle = textStyles[selectedTextIndex];
      const textElement = document.getElementById(
        `textElement_${selectedTextIndex}`
      );
      const textWidth = textElement.getBoundingClientRect().width;

      updatedTextStyles[selectedTextIndex].left = Math.max(
        canvasWidth - textWidth,
        0
      );
      setTextStyles(updatedTextStyles);
    }
  };

  const handleMoveToYAxisTop = () => {
    const updatedTextStyles = [...textStyles];
    const canvasHeight = canvasRef.current.offsetHeight;

    if (selectedTextIndex !== null) {
      const selectedTextStyle = textStyles[selectedTextIndex];
      const textElement = document.getElementById(
        `textElement_${selectedTextIndex}`
      );
      const textHeight = textElement.getBoundingClientRect().height;

      // console.log(textHeight, "textHeight");
      // console.log(canvasHeight, "canvasHeight");
      // console.log(canvasHeight + textHeight, "canvasHeight + textHeight");
      const newY = 0;
      const updatedTextStyles = [...textStyles];
      updatedTextStyles[selectedTextIndex] = {
        ...updatedTextStyles[selectedTextIndex],
        top: newY,
      };
      setTextStyles(updatedTextStyles);
    }
  };

  const handleMoveToYAxisCenter = (selectedTextIndex) => {
    const updatedTextStyles = [...textStyles];
    const canvasHeight = canvasRef.current.offsetHeight;

    if (selectedTextIndex !== null) {
      const selectedTextStyle = textStyles[selectedTextIndex];
      const textElement = document.getElementById(
        `textElement_${selectedTextIndex}`
      );
      const textHeight = textElement.getBoundingClientRect().height;

      // console.log(textHeight, "textHeight");
      // console.log(canvasHeight, "canvasHeight");
      // console.log(canvasHeight + textHeight, "canvasHeight + textHeight");
      // console.log(
      //   (canvasHeight + textHeight) / 2 + textHeight,
      //   "(canvasHeight + textHeight)/2"
      // );
      updatedTextStyles[selectedTextIndex].top =
        (canvasHeight + textHeight) / 2 + textHeight;

      const newY = (canvasHeight + textHeight) / 2 - textHeight;

      // console.log(newY, "newY");
      updatedTextStyles[selectedTextIndex] = {
        ...updatedTextStyles[selectedTextIndex],
        top: newY,
      };
      setTextStyles(updatedTextStyles);
    }
  };

  const handleMoveToYAxisBottom = (index, axis) => {
    if (selectedTextIndex !== null) {
      const updatedTextStyles = [...textStyles];
      const canvasHeight = canvasRef.current.offsetHeight;
      const selectedTextStyle = updatedTextStyles[selectedTextIndex];
      const textElement = document.getElementById(
        `textElement_${selectedTextIndex}`
      );
      const textHeight = textElement.getBoundingClientRect().height;

      // Calculate the new y position to move to the bottom without crossing the border
      const newY = 561 - textHeight;

      // console.log(newY);

      updatedTextStyles[selectedTextIndex] = {
        ...selectedTextStyle,
        [axis]: newY,
      };
      setTextStyles(updatedTextStyles);
    }
  };

  // Function to handle font change
  const handleFontChange = (index, selectedFont) => {
    setTextStyles((prevTextStyles) => {
      const updatedTextStyles = [...prevTextStyles];
      updatedTextStyles[index].fontFamily = selectedFont;
      return updatedTextStyles;
    });
  };

  // const handleImageClick = (imagePath) => {
  //   setSelectedImage(imagePath);
  //   const selectedImageData = imageData.images.find(
  //     (image) => image.watermark === imagePath
  //   );
  //   if (selectedImageData) {
  //     setSelectedImageTextStyles(selectedImageData.textStyles);
  //   }
  // };

  const handleTextClick = (index) => {
    const selectedTextStyle = textStyles[index];
    const lines = selectedTextStyle.text.split("\n");
    setTextStyles((prevTextStyles) => {
      const updatedTextStyles = prevTextStyles.map((style, i) => ({
        ...style,
        isSelected: index === i,
      }));
      setSelectedTextIndex(index);
      setLineHeight(selectedTextStyle.lineHeight || 1.5); // Set initial line height from JSON or default to 1.5
      setLetterSpacing(selectedTextStyle.letterSpacing || 0); // Set initial letter spacing from JSON or default to 0
      return updatedTextStyles;
    });
  };

  // Function to handle line height change
  const handleLineHeightChange = (lineHeightValue) => {
    setLineHeight(lineHeightValue);
    setTextStyles((prevTextStyles) => {
      const updatedTextStyles = [...prevTextStyles];
      updatedTextStyles[selectedTextIndex].lineHeight = lineHeightValue;
      return updatedTextStyles;
    });
  };

  // Function to handle letter spacing change
  const handleLetterSpacingChange = (letterSpacingValue) => {
    setLetterSpacing(letterSpacingValue);
    setTextStyles((prevTextStyles) => {
      const updatedTextStyles = [...prevTextStyles];
      updatedTextStyles[selectedTextIndex].letterSpacing = letterSpacingValue;
      return updatedTextStyles;
    });
  };

  const handleSaveClick = () => {
    let previewData = null;
    if (imageData.imageType === "single image") {
      previewData = {
        id: imageData.id,
        title: imageData.title,
        imageUrl: imageData.imageUrl,
        watermark: imageData.watermark,
        referenceImage: imageData.referenceImage,
        finalImage: imageData.finalImage,
        imageType: imageData.imageType,
        price: imageData.price,
        buttonText: imageData.buttonText,
        cardType: imageData.cardType,
        popularity: imageData.popularity,
        description: imageData.description,
        cardCategory: imageData.cardCategory,
        textStyles: textStyles.map((textStyle) => ({
          id: textStyle.id,
          startingImage: textStyle.startingImage,
          width: textStyle.width,
          height: textStyle.height,
          text: textStyle.text,
          left: textStyle.left,
          top: textStyle.top,
          color: textStyle.color,
          fontSize: textStyle.fontSize,
          backgroundColor: textStyle.backgroundColor,
          padding: textStyle.padding,
          fontFamily: textStyle.fontFamily,
          textAlign: textStyle.textAlign,
          lineHeight: textStyle.lineHeight,
          letterSpacing: textStyle.letterSpacing,
        })),
      };
    } else if (imageData.imageType === "multiple image") {
      previewData = {
        id: imageData.id,
        title: imageData.title,
        imageUrl: imageData.imageUrl,
        watermark: imageData.watermark,
        referenceImage: imageData.referenceImage,
        finalImage: imageData.finalImage,
        imageType: imageData.imageType,
        price: imageData.price,
        buttonText: imageData.buttonText,
        cardType: imageData.cardType,
        popularity: imageData.popularity,
        description: imageData.description,
        cardCategory: imageData.cardCategory,
        images: imageData.images.map((image) => ({
          id: image.id,
          watermark: image.watermark,
          textStyles: image.textStyles.map((textStyle) => ({
            id: textStyle.id,
            text: textStyle.text,
            startingImage: textStyle.startingImage,
            width: textStyle.width,
            height: textStyle.height,

            left: textStyle.left,
            top: textStyle.top,
            color: textStyle.color,
            fontSize: textStyle.fontSize,
            backgroundColor: textStyle.backgroundColor,
            padding: textStyle.padding,
            fontFamily: textStyle.fontFamily,
            textAlign: textStyle.textAlign,
            lineHeight: textStyle.lineHeight,
            letterSpacing: textStyle.letterSpacing,
          })),
        })),
      };
    }

    // window.location.href = "/preview";
    setPreviewData(previewData);
    setIsPreviewModalOpen(true);
  };

  const closePreviewModal = () => {
    setIsPreviewModalOpen(false);
  };

  const [hoverX, setHoverX] = useState(0);
  const [hoverY, setHoverY] = useState(0);

  const handleCanvasMouseMove = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setHoverX(x);
    setHoverY(y);
  };

  // const vatRate = 5;

  // const calculateVatAmount = () => {
  //   // VAT rate in percentage
  //   const vatAmount = (imageData.price * vatRate) / 100;
  //   return Number(vatAmount).toFixed(2); // Display VAT amount with 2 decimal places
  // };

  // const calculateTotal = () => {
  //   // VAT rate in percentage
  //   const vatAmount = parseInt(imageData.price * vatRate) / 100;
  //   const total = imageData.price + parseInt(vatAmount);
  //   return Number(total).toFixed(2); // Display total with 2 decimal places
  // };

  const vatRate = 5;

  const calculateVatAmount = () => {
    // VAT rate in percentage
    const vatAmount = (imageData.price * vatRate) / 100;
    return Number(vatAmount).toFixed(2); // Display VAT amount with 2 decimal places
  };

  const calculateTotal = () => {
    // VAT rate in percentage
    const vatAmount = (imageData.price * vatRate) / 100;
    const total = imageData.price + vatAmount;
    return Number(total).toFixed(2); // Display total with 2 decimal places
  };

  const generateUniqueOrderID = () => {
    const timestamp = new Date().getTime(); // Get current timestamp in milliseconds
    const randomNum = Math.floor(Math.random() * 10000); // Generate a random number between 0 and 9999
    const orderID = `${timestamp}-${randomNum}`;
    return orderID;
  };

  const [isPreviewLoading, setIsPreviewLoading] = useState(false);

  const handleSaveAndPreviewClick = async () => {
    setIsPreviewLoading(true);

    const currentDateTime = new Date();
    const formattedDateTime = `${currentDateTime.getDate()}:${(
      currentDateTime.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}:${currentDateTime.getFullYear()} ${currentDateTime
      .getHours()
      .toString()
      .padStart(2, "0")}:${currentDateTime
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${currentDateTime
      .getSeconds()
      .toString()
      .padStart(2, "0")} ${currentDateTime.getHours() >= 12 ? "PM" : "AM"}`;

    let dataForPreview = null;
    if (
      imageData.imageType === "single image" ||
      imageData.imageType === "multiple image"
    ) {
      dataForPreview = {
        createdAt: formattedDateTime,
        cardCode: imageData.cardCode,
        orderID: generateUniqueOrderID(),
        watermark: true,
        paid: "pending",
        vatAmount: calculateVatAmount(),
        totalAmount: calculateTotal(),
        // userEmail: session?.user?.email,
        id: imageData.id,
        title: imageData.title,
        imageUrl: imageData.imageUrl,
        watermark: imageData.watermark,
        imageType: imageData.imageType,
        price: imageData.price,
        buttonText: imageData.buttonText,
        cardType: imageData.cardType,
        popularity: imageData.popularity,
        description: imageData.description,
        cardCategory: imageData.cardCategory,
        formart: "",
        useraddress: "",
        userName: "",
        userPhone: "",
        images:
          imageData.imageType === "multiple image"
            ? imageData.images.map((image) => ({
                id: image.id,
                watermark: image.watermark,
                textStyles: image.textStyles.map((textStyle) => ({
                  id: textStyle.id,
                  text: textStyle.text,
                  left: textStyle.left,
                  top: textStyle.top,
                  startingImage: textStyle.startingImage,
                  width: textStyle.width,
                  height: textStyle.height,
                  color: textStyle.color,
                  fontSize: textStyle.fontSize,
                  backgroundColor: textStyle.backgroundColor,
                  padding: textStyle.padding,
                  fontFamily: textStyle.fontFamily,
                  textAlign: textStyle.textAlign,
                  lineHeight: textStyle.lineHeight,
                  letterSpacing: textStyle.letterSpacing,
                })),
              }))
            : [],
        textStyles: textStyles.map((textStyle) => ({
          id: textStyle.id,
          text: textStyle.text,
          startingImage: textStyle.startingImage,
          width: textStyle.width,
          height: textStyle.height,
          left: textStyle.left,
          top: textStyle.top,
          color: textStyle.color,
          fontSize: textStyle.fontSize,
          backgroundColor: textStyle.backgroundColor,
          padding: textStyle.padding,
          fontFamily: textStyle.fontFamily,
          textAlign: textStyle.textAlign,
          lineHeight: textStyle.lineHeight,
          letterSpacing: textStyle.letterSpacing,
          fontWeight: textStyle.fontWeight, // For bold
          fontStyle: textStyle.fontStyle, // For italic
          textDecoration: textStyle.textDecoration, // For underline
          textTransform: textStyle.textTransform, // For text transformations
          rotationAngle: textStyle.rotationAngle || 0,
        })),
      };
    }

    const dataToPass = JSON.stringify(dataForPreview);
    localStorage.removeItem("previewData");
    localStorage.setItem("previewData", dataToPass);

    try {
      const response = await fetch("/api/orders/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForPreview),
      });

      if (response.ok) {
        const responseData = await response.json();
        // console.log("Order created:", responseData);
        // "Order created:",
        //   {
        //     orders: {
        //       acknowledged: true,
        //       insertedId: "64d6c81d5df787ab01516572",
        //     },
        //   };
        // setIsPreviewModalOpen(true);

        const createdOrderID = dataForPreview.orderID;

        setPreviewData(responseData.previewData);
        router.push(`/preview/${createdOrderID}`);
      } else {
        console.error("Failed to create order");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setIsPreviewLoading(false);
    // setTimeout(() => {
    //   router.push("/preview");
    // }, 1000);
    // router.push("/preview");
  };

  const handleTextStyleImage = (index) => {
    // You can define the logic to handle the click event for the image here.
    // For example, you can log a message when the image is clicked.
    // console.log("Image clicked:", index);
    const selectedTextStyle = textStyles[index];
    const lines = selectedTextStyle.startingImage;
    setTextStyles((prevTextStyles) => {
      const updatedTextStyles = prevTextStyles.map((style, i) => ({
        ...style,
        isSelected: index === i,
      }));
      setSelectedTextIndex(index);
      return updatedTextStyles;
    });
    // You can also set some state or perform any other action you need.
    // For example, you can open a modal, update the selected image, etc.
  };

  const handleFontColorChange = (color) => {
    // console.log("Selected Color:", color); // Log the color value being selected

    setTextStyles((prevTextStyles) => {
      const updatedTextStyles = [...prevTextStyles];
      updatedTextStyles[selectedTextIndex].backgroundColor = color.hex; // Assuming color.hex represents the selected color value
      return updatedTextStyles;
    });
  };

  const handleSaveToDatabase = async () => {
    setIsPreviewLoading(true);
    let previewData = null;
    if (imageData.imageType === "single image") {
      previewData = {
        id: imageData.id,
        title: imageData.title,
        imageUrl: imageData.imageUrl,
        watermark: imageData.watermark,
        referenceImage: imageData.referenceImage,
        finalImage: imageData.finalImage,
        imageType: imageData.imageType,
        price: imageData.price,
        buttonText: imageData.buttonText,
        cardType: imageData.cardType,
        popularity: imageData.popularity,
        description: imageData.description,
        cardCategory: imageData.cardCategory,
        textStyles: textStyles.map((textStyle) => ({
          id: textStyle.id,
          startingImage: textStyle.startingImage,
          width: textStyle.width,
          height: textStyle.height,
          text: textStyle.text,
          left: textStyle.left,
          top: textStyle.top,
          color: textStyle.color,
          fontSize: textStyle.fontSize,
          backgroundColor: textStyle.backgroundColor,
          padding: textStyle.padding,
          fontFamily: textStyle.fontFamily,
          textAlign: textStyle.textAlign,
          lineHeight: textStyle.lineHeight,
          letterSpacing: textStyle.letterSpacing,
        })),
      };
    } else if (imageData.imageType === "multiple image") {
      previewData = {
        id: imageData.id,
        title: imageData.title,
        imageUrl: imageData.imageUrl,
        watermark: imageData.watermark,
        referenceImage: imageData.referenceImage,
        finalImage: imageData.finalImage,
        imageType: imageData.imageType,
        price: imageData.price,
        buttonText: imageData.buttonText,
        cardType: imageData.cardType,
        popularity: imageData.popularity,
        description: imageData.description,
        cardCategory: imageData.cardCategory,
        images: imageData.images.map((image) => ({
          id: image.id,
          watermark: image.watermark,
          textStyles: image.textStyles.map((textStyle) => ({
            id: textStyle.id,
            text: textStyle.text,
            startingImage: textStyle.startingImage,
            width: textStyle.width,
            height: textStyle.height,

            left: textStyle.left,
            top: textStyle.top,
            color: textStyle.color,
            fontSize: textStyle.fontSize,
            backgroundColor: textStyle.backgroundColor,
            padding: textStyle.padding,
            fontFamily: textStyle.fontFamily,
            textAlign: textStyle.textAlign,
            lineHeight: textStyle.lineHeight,
            letterSpacing: textStyle.letterSpacing,
          })),
        })),
      };
    }
    try {
      // Make the PUT request to update the card in the database
      const response = await fetch(`/api/cards/${previewData.id}`, {
        method: "PUT", // Use 'PUT' method to update data
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(previewData),
      });

      // console.log(response);
      if (response.ok) {
        const responseData = await response.json();
        // console.log("Card updated successfully:", response.data);
      } else {
        // console.log("Failed to update card data.");
      }

      // Handle the response, show a success message, etc.
      // console.log("Card updated successfully:", response.data);
    } catch (error) {
      // Handle any errors that occur during the request
      console.error("Error updating card:", error);
    }
    setIsPreviewLoading(false);
  };

  const handleAddText = () => {
    // Create a new text style
    const newTextStyle = {
      id: Date.now(), // Use a unique identifier
      text: "New Text", // Initial text content
      left: 200, // x-coordinate
      top: 200, // y-coordinate
      backgroundColor: "red", // Text color
      fontSize: "15", // Font size
      // Other properties you might want to include
    };

    // Update the state with the new text style
    setTextStyles((prevTextStyles) => [...prevTextStyles, newTextStyle]);
  };

  const handleUppercase = () => {
    if (selectedTextIndex !== null) {
      setTextStyles((prevTextStyles) =>
        prevTextStyles.map((style, index) =>
          index === selectedTextIndex
            ? { ...style, text: style.text.toUpperCase() }
            : style
        )
      );
    }
  };

  const handleLowercase = () => {
    if (selectedTextIndex !== null) {
      setTextStyles((prevTextStyles) =>
        prevTextStyles.map((style, index) =>
          index === selectedTextIndex
            ? { ...style, text: style.text.toLowerCase() }
            : style
        )
      );
    }
  };

  const handleCapitalize = () => {
    if (selectedTextIndex !== null) {
      setTextStyles((prevTextStyles) =>
        prevTextStyles.map((style, index) =>
          index === selectedTextIndex
            ? {
                ...style,
                text: style.text
                  .split(" ")
                  .map(
                    (word) =>
                      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                  )
                  .join(" "),
              }
            : style
        )
      );
    }
  };

  const toggleBold = () => {
    if (selectedTextIndex !== null) {
      setTextStyles((prevTextStyles) =>
        prevTextStyles.map((style, index) =>
          index === selectedTextIndex
            ? {
                ...style,
                fontWeight: style.fontWeight === "bold" ? "normal" : "bold",
              }
            : style
        )
      );
    }
  };

  const toggleItalic = () => {
    if (selectedTextIndex !== null) {
      setTextStyles((prevTextStyles) =>
        prevTextStyles.map((style, index) =>
          index === selectedTextIndex
            ? {
                ...style,
                fontStyle: style.fontStyle === "italic" ? "normal" : "italic",
              }
            : style
        )
      );
    }
  };

  const toggleUnderline = () => {
    if (selectedTextIndex !== null) {
      setTextStyles((prevTextStyles) =>
        prevTextStyles.map((style, index) =>
          index === selectedTextIndex
            ? {
                ...style,
                textDecoration:
                  style.textDecoration === "underline" ? "none" : "underline",
              }
            : style
        )
      );
    }
  };

  const handleImageSizeAdjustment = (event) => {
    const newSizeAdjustment = event.target.value;
    // Update textStyles with the new size adjustments
    const updatedTextStyles = textStyles.map((textStyle, index) => {
      const adjustedWidth = textStyle.width * (canvasSize.width / 415);
      const adjustedHeight = textStyle.height * (canvasSize.height / 561);
      const adjustedImageWidth = (adjustedWidth * newSizeAdjustment) / 100;
      const adjustedImageHeight = (adjustedHeight * newSizeAdjustment) / 100;

      // const adjustedWidth = (textStyle.width * newSizeAdjustment) / 100;
      // const adjustedHeight = (textStyle.height * newSizeAdjustment) / 100;

      // Return the updated textStyle
      return {
        ...textStyle,
        width: adjustedImageWidth,
        height: adjustedImageHeight,
      };
    });

    setImageSizeAdjustment(newSizeAdjustment); // Update the size adjustment in state
    setTextStyles(updatedTextStyles); // Update the textStyles in state
  };

  const handleWidthAdjustment = (event) => {
    const newWidthAdjustment = parseInt(event.target.value);
    setWidthAdjustment(newWidthAdjustment);
    updateImageSize("width", newWidthAdjustment);
  };

  const handleHeightAdjustment = (event) => {
    const newHeightAdjustment = parseInt(event.target.value);
    setHeightAdjustment(newHeightAdjustment);
    updateImageSize("height", newHeightAdjustment);
  };

  const updateImageSize = (dimension, adjustment) => {
    const updatedTextStyles = textStyles.map((textStyle) => {
      let adjustedWidth = textStyle.width * (canvasSize.width / 415);
      let adjustedHeight = textStyle.height * (canvasSize.height / 561);

      if (dimension === "width") {
        adjustedWidth = (adjustedWidth * adjustment) / 100;
      } else if (dimension === "height") {
        adjustedHeight = (adjustedHeight * adjustment) / 100;
      }

      return {
        ...textStyle,
        width: adjustedWidth,
        height: adjustedHeight,
      };
    });

    setTextStyles(updatedTextStyles);
  };
  const [isResizing, setIsResizing] = useState(false);
  const [resizingTextIndex, setResizingTextIndex] = useState(null);
  const [initialMousePosition, setInitialMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [initialFontSize, setInitialFontSize] = useState(0);

  // Default angle is 0

  const [resizingCorner, setResizingCorner] = useState(null);

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

  const [initialX, setInitialX] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isRotating, setIsRotating] = useState(false);

  const handleRotateMouseDown = (e, index) => {
    e.stopPropagation();
    setIsRotating(true);
    setInitialX(e.clientX);
    setRotationAngle(textStyles[index].rotationAngle || 0);
    window.addEventListener("mousemove", handleRotateMouseMove);
    window.addEventListener("mouseup", handleRotateMouseUp);
  };

  const handleRotateMouseMove = useCallback(
    (e) => {
      if (isRotating) {
        const deltaX = e.clientX - initialX;
        const newAngle = rotationAngle + deltaX / 2; // Adjust the divisor to control rotation sensitivity
        setRotationAngle(newAngle);

        // Update the rotation angle in textStyles state
        setTextStyles((prevTextStyles) =>
          prevTextStyles.map((style, i) =>
            i === selectedTextIndex
              ? { ...style, rotationAngle: newAngle }
              : style
          )
        );
      }
    },
    [initialX, isRotating, rotationAngle, selectedTextIndex]
  );

  const handleRotateMouseUp = useCallback(() => {
    if (isRotating) {
      setIsRotating(false);
      window.removeEventListener("mousemove", handleRotateMouseMove);
      window.removeEventListener("mouseup", handleRotateMouseUp);
    }
  }, [isRotating]);

  const getRotationStyle = (index) => {
    const angle = textStyles[index].rotationAngle || 0;
    return {
      transform: `rotate(${angle}deg)`,
      transformOrigin: "center",
    };
  };

  return {
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

    handleLineHeightChange,
    lineHeight,
    setLineHeight,
    letterSpacing,
    setLetterSpacing,
    handleLetterSpacingChange,
    handleToggleDevtools,
    closePreviewModal,
    isPreviewModalOpen,
    setIsPreviewModalOpen,
    isLoaded,
    setIsLoaded,
    hoverX,
    setHoverX,
    hoverY,
    setHoverY,
    handleCanvasMouseMove,
    handleSaveAndPreviewClick,
    handleTextStyleImage,
    isPreviewLoading,
    colorPickerVisible,
    setColorPickerVisible,
    handleFontColorChange,

    handleSaveToDatabase,

    handleAddText,

    handleUppercase,
    handleLowercase,
    handleCapitalize,

    toggleBold,
    toggleItalic,
    toggleUnderline,

    handleImageSizeAdjustment,
    handleWidthAdjustment,
    handleHeightAdjustment,
    updateImageSize,

    handleResizeMouseDown,
    handleMouseMove,
    handleMouseUp,
    rotationAngle,
    getRotationStyle,

    handleRotateMouseDown,
  };
};

export default ImageEditorFunctions;
