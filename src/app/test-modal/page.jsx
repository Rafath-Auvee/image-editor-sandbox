import React from "react";
import { X } from "lucide-react";
import EditText from "/public/BottomNavigation/EditText.svg";
import BottomDefaultToolbar from "@/components/BottomNavigation/BottomDefaultToolbar";
import ImageEditorFunctions from "@/components/ImageEditor/ImageEditorFunctions";

const TestModal = () => {
  const { handleSaveAndPreviewClick, handleAddText } = ImageEditorFunctions();
  return (
    <div>
      <BottomDefaultToolbar
        style={{
          zIndex: 1000,
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
        }}
        handleSaveAndPreviewClick={handleSaveAndPreviewClick}
        handleAddText={handleAddText}
      />
    </div>
  );
};

export default TestModal;
