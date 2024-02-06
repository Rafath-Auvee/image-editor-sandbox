"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: "500",
  style: "normal",
  subsets: ["latin"],
});

const Form = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false);
  const [hasAgreedToPrivacy, setHasAgreedToPrivacy] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [coupon, setCoupon] = useState("");
  const [price, setPrice] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState("jpeg");
  const vatRate = 5;

  const [totalAmount, setTotalAmount] = useState(null);
  const [vatAmount, setVatAmount] = useState(null);

  const calculateVatAmount = () => {
    const vatAmount = (price * vatRate) / 100;
    return Number(vatAmount).toFixed(2);
  };

  const calculateTotal = () => {
    const total = price + parseFloat(calculateVatAmount());
    return Number(total).toFixed(2);
  };

  const fullNameRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);
  const paymentMethodRef = useRef(null);
  const couponRef = useRef(null);
  const selectedFormatRef = useRef(null);

  useEffect(() => {
    if (showModal) {
      // Focus on the first input field when the modal is shown
      fullNameRef.current.focus();
    }
  }, [showModal]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // Move focus to the next input field when Enter key is pressed
      if (e.target === fullNameRef.current) {
        phoneRef.current.focus();
      } else if (e.target === phoneRef.current) {
        addressRef.current.focus();
      }
    }
  };
  return (
    <div>
      <div className="flex w-full h-screen justify-center items-center">
        <div
          className={`ButtonMasterLarge h-12 px-6 py-2.5 text-center bg-[#D5B048] rounded-md shadow flex-col justify-center items-center gap-2.5 inline-flex mt-10`}
        >
          <div className="Container justify-center items-center gap-[7px] inline-flex">
            <button
              className="Label text-center text-zinc-800 text-lg font-bold   leading-7"
              onClick={() => setShowModal(true)}
            >
              Download without Watermark
            </button>
          </div>
        </div>
      </div>
      {showModal ? (
        <div className={poppins.className}>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-3xl">
            <div
              className="relative w-full h-full my-6 mx-auto max-w-3xl"
              style={{ marginTop: "100vh", marginBottom: "100vh" }}
            >
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h1 className="text-lg font-bold ">Billing Address</h1>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative px-6 py-3 flex-auto">
                  <h5 className={`text-1xl font-semibold ${poppins.className}`}>
                    Full Name *
                  </h5>

                  <input
                    type="text"
                    className="border border-gray-300 rounded px-2 py-3  placeholder:text-black w-full resize-none"
                    style={{ whiteSpace: "pre-wrap" }}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    ref={fullNameRef} // This is where the ref is assigned to the input element
                  />
                </div>
                <div className="relative px-6 py-3 flex-auto">
                  <h5 className={`text-1xl font-semibold ${poppins.className}`}>
                    Phone *
                  </h5>
                  <input
                    type="number"
                    className="border border-gray-300 rounded px-2 py-3  placeholder:text-black w-full resize-none"
                    style={{ whiteSpace: "pre-wrap" }}
                    value={phone}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setPhone(e.target.value)}
                    ref={phoneRef}
                  />
                </div>
                <div className="relative px-6 py-3 flex-auto">
                  <h5 className={`text-1xl font-semibold ${poppins.className}`}>
                    Address *
                  </h5>
                  <textarea
                    type="text"
                    className="border border-gray-300 rounded px-2 py-1 mt-1 placeholder:text-black w-full resize-none"
                    style={{ whiteSpace: "pre-wrap" }}
                    value={address}
                    rows={4} // Set the number of rows you want to display initially
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setAddress(e.target.value)}
                    ref={addressRef}
                  />
                </div>

                <div className="relative px-6 py-3 flex-auto">
                  <h5 className={`text-1xl font-semibold ${poppins.className}`}>
                    Format *
                  </h5>
                  <select
                    className="border border-gray-300 rounded px-2 py-3 w-full"
                    value={selectedFormat}
                    onChange={(e) => handleFormatChange(e.target.value)}
                    ref={selectedFormatRef}
                  >
                    <>
                      <option value="png">PNG</option>
                      <option value="jpeg">JPEG</option>
                      <option value="video">Video</option>
                      <option value="gif">GIF</option>
                      <option value="pdf">PDF</option>
                    </>
                  </select>
                </div>

                <div className="relative px-6 py-3 flex-auto">
                  <div className="divider"></div>
                </div>

                <div className="flex items-start justify-between px-6 mb-4  border-solid border-slate-200 rounded-t">
                  <h1 className={`text-lg font-semibold ${poppins.className}`}>
                    Make Payment
                  </h1>
                </div>
                <div className="px-6 mb-6">
                  <p
                    className={`text-neutral-600 text-sm font-normal leading-snug tracking-tight ${poppins.className}`}
                  >
                    Complete your purchase by providing your payment details.
                  </p>

                  <div className="flex items-center mt-5 gap-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="aamarPay"
                        // disabled
                        checked={paymentMethod === "aamarPay"}
                        onChange={() => setPaymentMethod("aamarPay")}
                        className="cursor-pointer custom-checkbox"
                      />
                      <span
                        className={`text-lg font-medium text-gray-700 ${poppins.className}`}
                      >
                        aamarPay
                      </span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer ">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bkash"
                        checked={paymentMethod === "bkash"}
                        onChange={() => setPaymentMethod("bkash")}
                        className={`cursor-pointer custom-checkbox ${
                          paymentMethod === "bkash" ? "bkash-selected" : ""
                        }`}
                      />
                      <span
                        className={`text-lg font-medium ${
                          paymentMethod === "bkash"
                            ? "text-[#e2136e]"
                            : "text-gray-700"
                        } ${poppins.className}`}
                      >
                        Bkash
                      </span>
                    </label>
                  </div>
                </div>

                <div className="relative px-6 py-3 flex-auto">
                  <div className="divider"></div>
                </div>

                <div className="relative px-6 py-3 flex-auto">
                  <h5 className={`text-1xl font-semibold ${poppins.className}`}>
                    Apply Coupon
                  </h5>
                  <div className="flex items-center border border-gray-300 rounded">
                    <input
                      type="text"
                      value={coupon}
                      // onChange={handleCouponChange}
                      // ref={couponRef}
                      className="flex-grow px-2 py-2 placeholder:text-black"
                      placeholder="Enter coupon code"
                    />
                    <button
                      // onClick={() => handleCouponSubmit(coupon)}
                      className="btn bg-[#23272A] text-white px-4 py-2 rounded-r"
                    >
                      Apply Coupon
                    </button>
                  </div>
                </div>
                <div className="relative px-6 py-3 flex-auto">
                  <div className="divider"></div>
                </div>
                <div className="rounded-sm border border-gray-300 flex-col justify-start items-start gap-1 mx-6 pt-3 flex-auto">
                  <div className="flex flex-row justify-between py-3 px-4 text-1xl">
                    <p className={`font-thin ${poppins.className}`}>Subtotal</p>
                    <p className={`font-thin ${poppins.className}`}>৳{price}</p>
                  </div>

                  <div className="flex flex-row justify-between py-3 px-4 text-1xl">
                    <p className={`font-thin ${poppins.className}`}>
                      VAT ({vatRate}%):
                    </p>
                    <p className={`font-thin ${poppins.className}`}>
                      ৳{calculateVatAmount() || vatAmount}
                    </p>
                  </div>

                  <div className="font-bold bg-[#EEEFF1] flex flex-row justify-between py-3 px-4 text-1xl">
                    <p>Total</p>
                    <p>৳{totalAmount || calculateTotal()}</p>
                  </div>
                </div>
                <style jsx>{`
                  .custom-checkbox.bkash-selected:checked {
                    border-color: #e2136e;
                  }

                  .custom-checkbox.bkash-selected:checked::before {
                    background-color: #e2136e;
                  }
                  .custom-checkbox {
                    appearance: none;
                    width: 20px; // Adjust based on your preference
                    height: 20px; // Adjust based on your preference
                    border-radius: 50%;
                    border: 2px solid #d5b048; // The outer circle
                    background-color: white; // The default background
                    outline: none;
                    cursor: pointer;
                    position: relative;
                  }

                  .custom-checkbox::before {
                    content: "";
                    display: block;
                    width: 12px; // This is the size of the tiny dot when checked
                    height: 12px;
                    background-color: #d5b048;
                    border-radius: 50%;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    opacity: 0; // By default, the dot is not visible
                  }

                  .custom-checkbox:checked::before {
                    opacity: 1; // When checked, the dot becomes visible
                  }
                `}</style>
                <div className="relative px-6 py-3 flex-auto">
                  {/* <div className="divider"></div> */}
                  <div className="flex flex-col my-5">
                    <label className="flex items-center mb-5 gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="termsConditions"
                        checked={hasAgreedToTerms}
                        onChange={() => setHasAgreedToTerms(!hasAgreedToTerms)}
                        className="custom-checkbox cursor-pointer"
                      />
                      <span
                        className={`text-lg font-medium text-gray-700 ${poppins.className}`}
                      >
                        I have agreed to the{" "}
                        <Link href="/terms-and-conditions">
                          <span className="text-violet-700 underline">
                            Terms and Conditions
                          </span>
                        </Link>
                        .
                      </span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="privacyPolicy"
                        checked={hasAgreedToPrivacy}
                        onChange={() =>
                          setHasAgreedToPrivacy(!hasAgreedToPrivacy)
                        }
                        className="custom-checkbox cursor-pointer"
                      />
                      <span
                        className={`text-lg font-medium text-gray-700 ${poppins.className}`}
                      >
                        I have agreed to the{" "}
                        <Link href="/privacy-policy">
                          <span className="text-violet-700 underline">
                            Privacy Policy
                          </span>
                        </Link>
                        .
                      </span>
                    </label>
                  </div>
                </div>

                {totalAmount > 0 ? (
                  <div className="px-6 flex items-center justify-center">
                    <button
                      className={`w-full ${
                        paymentMethod && hasAgreedToTerms && hasAgreedToPrivacy
                          ? paymentMethod === "bkash"
                            ? "bg-[#e2136e]"
                            : "bg-[#23272A]"
                          : "bg-gray-400"
                      } text-white text-lg px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                      type="button"
                      // onClick={() => {
                      //   if (paymentMethod === "aamarPay") handleAamarPayClick();
                      //   if (paymentMethod === "bkash") handleBkashPayClick();
                      // }}
                      disabled={
                        !paymentMethod ||
                        !hasAgreedToTerms ||
                        !hasAgreedToPrivacy
                      }
                    >
                      <p
                        className={`${poppins.className} text-center text-white text-lg font-medium leading-7 `}
                      >
                        Pay ৳{totalAmount || calculateTotal()}
                      </p>
                    </button>
                  </div>
                ) : (
                  <div className="px-6 flex items-center justify-center">
                    <button
                      className={`w-full ${
                        hasAgreedToTerms && hasAgreedToPrivacy
                          ? "bg-[#23272A]"
                          : "bg-gray-400"
                      } text-white text-lg px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                      type="button"
                      // onClick={handleClaimFree}
                      disabled={!hasAgreedToTerms || !hasAgreedToPrivacy}
                    >
                      <p
                        className={`${poppins.className} text-center text-white text-lg font-medium leading-7 `}
                      >
                        Claim for Free
                      </p>
                    </button>
                  </div>
                )}

                <div className="my-10 justify-center items-center gap-1 inline-flex text-zinc-400 text-1xl font-medium uppercase leading-tight ">
                  Payments are secure and encrypted
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      ) : null}
    </div>
  );
};

export default Form;
