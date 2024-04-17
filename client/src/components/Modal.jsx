import React from "react";
import { useCreatePostContext } from "../contexts/CreatePostContext";

const Modal = () => {
  const {
    isModalVisible,
    resetPhoto,
    toggleModalVisibility,
    setIsPhotoResetBtnEnabled,
    removeAnimateFromInputField,
  } = useCreatePostContext();
  return (
    <>
      {isModalVisible && (
        <div className="group/div absolute w-full h-full z-10 backdrop-blur-[2px] bg-[#f5f5f59a]">
          <div className="relative w-full h-full">
            <div className="group/p opacity-0 -translate-x-[50%] -translate-y-[20%] lg:group-hover/div:-translate-y-[50%] lg:group-hover/div:opacity-100 max-lg:opacity-100 absolute inset-[50%] bg-white rounded-lg shadow-lg p-8 max-w-md w-full h-fit text-center hover:shadow-2xl transition ease-in-out duration-500">
              <p className="text-2xl w-full text-left mb-5 font-medium">
                <span className="bg-red-100 rounded-full py-[3px] px-[5px] text-red-600">
                  ⚠️
                </span>{" "}
                Image will be removed
              </p>
              <p className="text-xl mb-6 opacity-50 transition-opacity  ease-in-out group-hover/p:opacity-80 duration-300">
                Are you sure you want to proceed?
              </p>
              <div className="flex justify-center gap-5">
                <button
                  className="bg-black shadow-sm hover:bg-white hover:text-black hover:shadow-xl text-white font-bold py-2 px-4 rounded-md duration-200"
                  onClick={resetPhoto}
                >
                  Yes
                </button>
                <button
                  className="bg-white text-black shadow-md hover:shadow-xl duration-200 border font-bold py-2 px-4 rounded-md"
                  onClick={() => {
                    toggleModalVisibility();
                    setIsPhotoResetBtnEnabled(false);
                    removeAnimateFromInputField();
                  }}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
