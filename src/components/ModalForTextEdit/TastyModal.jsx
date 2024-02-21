"use client";
import Image from "next/image";
import React, { useEffect } from "react";

const DaddyModal = ({ closeModal }) => {
  useEffect(() => {
    const handleCloseModal = (event) => {
      const clickedElement = event.target;
      if (clickedElement && clickedElement.classList.contains("bgGlass")) {
        closeModal();
      }
    };
    document.addEventListener("mousedown", handleCloseModal);
    return () => {
      document.removeEventListener("mousedown", handleCloseModal);
    };
  }, [closeModal]);

  return (
    <div>
      <style jsx>
        {`
          .servicebox {
            background: linear-gradient(138deg, #1010ff 40%, #2f2c2c 68%);
            transition: 1s;
          }
        `}
      </style>
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle cursor-pointer bgGlass">
        <div
          className="modal-box max-h-[50%] rounded-none bg-white p-0"
          style={{
            borderBottomLeftRadius: "0px",
            borderBottomRightRadius: "0px",
          }}
        >
          {/* <label
            htmlFor="my-modal-6"
            className="btn btn-sm btn-circle right-2 top-2 absolute"
            onClick={onclose}
          >
            ✕
          </label> */}
          <div className="  m-[5%] bg-base-100 text-black">
            {/* <Image
              src={service.img}
              className="min-w-sm rounded-lg w-full  mx-auto "
              alt=""
              width={300}
              height={251}
            /> */}
            <h1 className="text-sm font-bold my-[2%] text-center">
              service.name
            </h1>
            <p className="text-xs md:text-sm leading-snug ">
              service.description && service.description
            </p>
            <p className="text-xs md:text-sm leading-snug ">
              service.description && service.description
            </p>
            <p className="text-xs md:text-sm leading-snug ">
              service.description && service.description
            </p>
            <p className="text-xs md:text-sm leading-snug ">
              service.description && service.description
            </p>
            <p className="text-xs md:text-sm leading-snug ">
              service.description && service.description
            </p>
            <p className="text-xs md:text-sm leading-snug ">
              service.description && service.description
            </p>
            <p className="text-xs md:text-sm leading-snug ">
              service.description && service.description
            </p>
            <p className="text-xs md:text-sm leading-snug ">
              service.description && service.description
            </p>
            <p className="text-xs md:text-sm leading-snug ">
              service.description && service.description
            </p>
            <p className="text-xs md:text-sm leading-snug ">
              service.description && service.description
            </p>
            <p className="text-xs md:text-sm leading-snug ">
              service.description && service.description
            </p>
            <p className="text-xs md:text-sm leading-snug ">
              service.description && service.description
            </p>
            <p className="text-xs md:text-sm leading-snug ">
              service.description && service.description
            </p>
            <p className="text-xs md:text-sm leading-snug ">
              service.description && service.description
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaddyModal;
