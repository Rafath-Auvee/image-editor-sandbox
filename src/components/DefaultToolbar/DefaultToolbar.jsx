import React from "react";
import { Italic, RotateCcw, RotateCw } from "lucide-react";
import { VscBold } from "react-icons/vsc";
import { RiItalic } from "react-icons/ri";
import { BsTypeUnderline } from "react-icons/bs";
import { IoTextOutline } from "react-icons/io5";
import { RxLetterCaseUppercase } from "react-icons/rx";
import { RxText } from "react-icons/rx";

const DefaultToolbar = ({ ...props }) => {
  return (
    <>
      <div
        key={props.selectedTextIndex}
        className={`rounded bg-[#F6F6F6] flex flex-row justify-center items-center py-4 px-7 flex-wrap md:flex-nowrap gap-x-0 md:gap-x-3`}
      >
        <select className="select select-bordered w-full max-w-max">
          <option disabled selected>
            Font Name?
          </option>
          <option>Han Solo</option>
          <option>Greedo</option>
        </select>
        <div className="flex items-center mx-2">
          <button
            className="bg-white text-black border-gray-300 border px-4 py-2 rounded text-center"
            style={{ width: "40px", height: "40px" }}
          >
            -
          </button>
          <input
            id={`fontSizeInput-${props.selectedTextIndex}`}
            type="text"
            value={20}
            className=" border-gray-300 rounded text-center"
            style={{ width: "60px", height: "40px", textAlign: "center" }}
          />
          <button
            className="bg-white text-black border-gray-300 border px-4 py-2 rounded text-center"
            style={{ width: "40px", height: "40px" }}
          >
            +
          </button>
        </div>

        <button className="bg-black text-white px-2 py-2 rounded">3</button>
        <div className="text-2xl">
          <VscBold />
        </div>

        <div className="text-2xl">
          <RiItalic />
        </div>

        <div className="flex flex-row items-center text-2xl">
          <BsTypeUnderline />
          <div className="inline-block ml-3 w-0.5 h-8 bg-[#DCDCDC] opacity-100 dark:opacity-50"></div>
        </div>
        <div className="text-2xl">
          <RxLetterCaseUppercase />
        </div>
        <div className="flex flex-row items-center text-2xl">
          <IoTextOutline />
          <div className="inline-block ml-3 w-0.5 h-8 bg-[#DCDCDC] opacity-100 dark:opacity-50"></div>
        </div>
        <button className="bg-black text-white px-2 py-2 rounded">9</button>
        <div className="flex flex-row items-center">
          <button className="bg-black text-white px-2 py-2 rounded">10</button>
          <div className="inline-block ml-3 w-0.5 h-8 bg-[#DCDCDC] opacity-100 dark:opacity-50"></div>
        </div>
        <div className="flex flex-row items-center ">
          <div className="indicator">
            <span className="indicator-item indicator-bottom indicator-end badge badge-primary">
              +
            </span>
            <div className="grid w-10 h-10 bg-white  border border-[##CECECE] rounded place-items-center">
              <RxText className="text-xl" />
            </div>
          </div>
        </div>
        <div className="inline-block ml-3 w-0.5 h-8 bg-[#DCDCDC] opacity-100 dark:opacity-50"></div>
        <div className="flex flex-col">
          <div className="">
            <RotateCcw className="stroke-1" />
          </div>
          {/* <p>Undo</p> */}
        </div>
        {/* GAP Between Undo and Redo  */}
        <div className="gap-x-5"></div>
        <div className="flex flex-row items-center">
          <div className="">
            <RotateCw className="stroke-1" />
          </div>
          <div className="inline-block ml-3 w-0.5 h-8 bg-[#DCDCDC] opacity-100 dark:opacity-50"></div>
        </div>
        <button className="bg-black text-white px-4 py-2 rounded">
          Save & Preview
        </button>
      </div>
    </>
  );
};

export default DefaultToolbar;
