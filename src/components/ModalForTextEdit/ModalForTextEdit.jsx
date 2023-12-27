import React from "react";

const ModalForTextEdit = ({
  selectedTextIndex,
  showModal,
  setShowModal,
  handleUpdateButtonClick,
  handleTextChange,
  textStyles,
  ...props
}) => {
  return (
    showModal && (
      <>
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-3xl">
              <div className="relative w-full my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-1xl font-semibold">Update Your Text</h3>
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
      </>
    )
  );
};

export default ModalForTextEdit;
