import { useState } from "react";
import { useCreatePostContext } from "../contexts/CreatePostContext";

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
  isTextFilled = "border-gray-300",
  animateEmptyField,
}) => {
  // Context API
  const {
    isImageGenerationDone,
    isInputFieldDisabled,
    setIsPhotoResetBtnEnabled,
    animateInputField,
    animateTheInputField,
    removeAnimateFromInputField,
  } = useCreatePostContext();

  //When image generation done and user try to change the prompt then only apply shake animation on text field when the input text field is disable and `isImageGenerationDone` is true
  const [applyAnimation, setApplyAnimation] = useState(false);

  const showResetPhotoBtn = (
    isImageGenerationDone,
    isInputFieldDisabled,
    setIsPhotoResetBtnEnabled,
    setApplyAnimation,
    name,
    animateTheInputField,
    removeAnimateFromInputField
  ) => {
    if (isImageGenerationDone && isInputFieldDisabled && name === "prompt") {
      setIsPhotoResetBtnEnabled(true);
      setApplyAnimation(true);
      animateTheInputField();
    } else {
      removeAnimateFromInputField();
      setApplyAnimation(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-900"
        >
          {labelName}
        </label>
        {isSurpriseMe && (
          <button
            type="button"
            onClick={handleSurpriseMe}
            className="font-semibold text-xs bg-[#ECECF1] py-1 px-2 rounded-[5px] text-black"
          >
            Surprise me
          </button>
        )}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className={`bg-gray-50 border  ${isTextFilled}  text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3 duration-200 ${animateEmptyField} ${
          applyAnimation
            ? `${animateInputField} caret-transparent`
            : "caret-black"
        }`}
        onClick={() => {
          showResetPhotoBtn(
            isImageGenerationDone,
            isInputFieldDisabled,
            setIsPhotoResetBtnEnabled,
            setApplyAnimation,
            name,
            animateTheInputField,
            removeAnimateFromInputField
          );
        }}
      />
    </div>
  );
};

export default FormField;
