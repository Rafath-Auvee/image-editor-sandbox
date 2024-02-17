import React from "react";
import { RotateCcw, RotateCw } from "lucide-react";
import BackButton from "/public/BottomNavigation/BackButton.svg";
const EditorTopBar = ({ handleUndo, handleRedo, handleSaveToDatabase }) => {
  return (
    <div>
      <div className="navbar   bg-white text-black px-4 ">
        <div className="navbar-start flex flex-row gap-x-5">
          <BackButton />

          <section className="flex flex-col">
            <div
              className="flex flex-col items-center cursor-pointer"
              style={{ marginTop: "16px" }}
              onClick={handleUndo}
            >
              <button className="">
                <RotateCcw className="stroke-1" size={32} />
              </button>
              <p className="text-xs mt-2">Undo</p>
            </div>
          </section>

          <section
            className="flex flex-row items-center cursor-pointer"
            onClick={handleRedo}
          >
            <div
              className="flex flex-col items-center "
              style={{ marginTop: "16px" }}
            >
              <button className="">
                <RotateCw className="stroke-1" size={32} />
              </button>
              <p className="text-xs mt-2">Redo</p>
            </div>
          </section>
        </div>
        <div className="navbar-end">
          <button
            className="bg-[#23272A]  text-white text-lg px-4 py-3 rounded"
            onClick={() => handleSaveToDatabase()}
          >
            Save & Preview
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditorTopBar;
