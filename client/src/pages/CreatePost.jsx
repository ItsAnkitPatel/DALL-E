import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components";
import { DallE_API_URL, POST_API_URL } from "../constants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../components/Modal";
import { CreatePostContextProvider } from "../contexts/CreatePostContext";
import useImageGenerator from "../hooks/useImageGeneration";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  const [loading, setLoading] = useState(false);

  const [shareWithCommunityLoader, setShareWithCommunityLoader] =
    useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [animateInputField, setAnimateInputField] = useState("animate-shake");

  // Custom hook used for generating Image
  const {
    generatingImg,
    isImageGenerationDone,
    setIsImageGenerationDone,
    isPhotoResetBtnEnabled,
    setIsPhotoResetBtnEnabled,
    isShareBtnDisabled,
    setIsShareBtnDisabled,
    isInputFieldDisabled,
    setIsInputFieldDisabled,
    generateImage,
    setFieldState,
    name,
    prompt,
  } = useImageGenerator(form, setForm);

  // Adding and removing transition of 'Want to create new image ? Click here' button
  const changePhotoBtnTransition = () => {
    return "lg:translate-x-0 max-sm:translate-y-0 opacity-100";
  };

  // Linked with 'Modal' buttons
  const resetPhoto = () => {
    setIsModalVisible((prev) => !prev);

    setForm({
      ...form,
      photo: "",
    });
    setIsPhotoResetBtnEnabled(false);
    setIsImageGenerationDone(false);
    setIsInputFieldDisabled(false);
    setIsShareBtnDisabled(true);

    removeAnimateFromInputField();
    toast.info("Image removed!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const toggleModalVisibility = () => {
    setIsModalVisible((prev) => !prev);
  };

  // This will handle the share with community functionality
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.prompt && form.photo) {
      setLoading(true);
      setIsShareBtnDisabled(true);
      setShareWithCommunityLoader(true);
      try {
        const response = await fetch(POST_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...form }),
        });
        if (!response.ok) {
          throw new Error("Failed to share post");
        }
        await response.json();
        setShareWithCommunityLoader(false);
        toast.success("success", {
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/");
        }, 2000); // Wait for 2 seconds before navigating so that user can see success message
      } catch (err) {
        toast.error(err, " Failed to share post. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
  };

  // This will handle the input field text feeding (also color & animation for empty field)
  const handleChange = useCallback(
    (e) => {
      // If image is generated then set input field of prompt disable so that user can't edit the prompt
      if (isInputFieldDisabled && e.target.name === "prompt") return;

      setForm({ ...form, [e.target.name]: e.target.value });

      // setFieldState(`${e.target.name}`, "border-gray-300", "");
      setFieldState("name", "border-gray-300", "");
      setFieldState("prompt", "border-gray-300", "");
    },
    [isInputFieldDisabled, form, setFieldState]
  );

  // Get a random prompt
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({
      ...form,
      prompt: isInputFieldDisabled ? form.prompt : randomPrompt,
    });
    setFieldState("prompt", "border-gray-300", "");
  };

  const animateTheInputField = () => {
    setAnimateInputField("animate-shake");
  };
  const removeAnimateFromInputField = () => {
    setAnimateInputField("");
  };

  return (
    <CreatePostContextProvider
      value={{
        isModalVisible,
        isPhotoResetBtnEnabled,
        isShareBtnDisabled,
        isImageGenerationDone,
        isInputFieldDisabled,
        setIsPhotoResetBtnEnabled,
        resetPhoto,
        toggleModalVisibility,
        animateTheInputField,
        removeAnimateFromInputField,
        animateInputField,
      }}
    >
      <section className="max-w-7xl mx-auto overflow-hidden relative">
        {/* For showing notifications */}
        <ToastContainer autoClose={6000} position="top-center" />

        {/*Separate from main page.Used for showing loading screen when share with community button clicked */}
        {shareWithCommunityLoader && (
          <div className="w-[100%] h-[100%] absolute bg-[#f5f5f591] z-10 -translate-x-[50%] -translate-y-[50%] flex justify-center items-center pr-20 backdrop-blur-[1px]">
            <Loader width="70px" height="70px" />
          </div>
        )}

        {/*Separate from main page. This is Modal which will only show when the image is generated and user still want to change prompt */}
        <Modal />

        {/* Main page start here */}
        <div>
          <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
          <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
            Create imaginative and visually stunning images through by DALL-E AI
            and share them with the community
          </p>
        </div>

        <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            <FormField
              labelName="Your name"
              type="text"
              name="name"
              placeholder="John Doe"
              value={form.name}
              handleChange={handleChange}
              isTextFilled={name.color}
              animateEmptyField={name.animation}
            />
            <FormField
              labelName="Prompt"
              type="text"
              name="prompt"
              placeholder="A plush toy robot sitting against a yellow wall"
              value={form.prompt}
              handleChange={handleChange}
              isSurpriseMe
              handleSurpriseMe={handleSurpriseMe}
              isTextFilled={prompt.color}
              animateEmptyField={prompt.animation}
            />
            {/* Image field */}
            <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
              {form.photo ? (
                <img
                  src={form.photo}
                  alt={form.prompt}
                  className="w-full h-full object-contain"
                />
              ) : (
                <img
                  src={preview}
                  alt="preview"
                  className="2-9/12 h-9/12 object-contain opacity-40"
                />
              )}

              {generatingImg && (
                <div className="absolute inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                  <Loader />
                </div>
              )}
            </div>
          </div>
          <div className="mt-5 max-sm:flex-col flex gap-5">
            {/* Generate Image Button */}
            <button
              type="button"
              onClick={generateImage}
              className={`text-white bg-green-700 font-medium rounded-md text-sm w-full xs:w-auto px-5 py-2.5 text-center  hover:shadow-lg hover:bg-green-600 active:bg-green-900 duration-100 active:translate-y-1 ${
                isInputFieldDisabled ? "disabled:brightness-[.8]" : ""
              }`}
              disabled={generatingImg}
            >
              {generatingImg ? "Generating..." : "Generate"}
            </button>
            {/* Photo reset button */}
            <button
              type="button"
              className={`opacity-0 xs:w-auto py-2 px-4 bg-black text-white rounded-lg shadow-md hover:shadow-xl  active:translate-y-1  hover:bg-[#333] hover:text-black transition-all ease-in-out  hover:bg-gradient-to-t hover:from-white hover:to-white duration-500  ${
                isPhotoResetBtnEnabled
                  ? changePhotoBtnTransition()
                  : "lg:-translate-x-5 invisible max-sm:-translate-y-5"
              }`}
              disabled={!isPhotoResetBtnEnabled}
              onClick={toggleModalVisibility}
            >
              Want to create new image ? Click here
            </button>
          </div>
          <div className="mt-10">
            <p className="mt-2 text-[#666e75] text-[14px]">
              Once you have created the image you want, you can share it with
              others in the community
            </p>
            {/* Share Button */}
            <button
              type="submit"
              className={`mt-3 text-white  
            ${
              isShareBtnDisabled === true
                ? "bg-[#6469ffa5]"
                : "bg-[#6469ff] active:bg-[#191c5a] hover:bg-[#4b51f5] active:translate-y-1"
            }
             font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center mb-1 duration-200`}
              title={
                isShareBtnDisabled === true
                  ? "First generate the image"
                  : "Share the image with everyone"
              }
              disabled={isShareBtnDisabled}
            >
              {loading ? "Sharing..." : "Share with the community"}
            </button>
          </div>
        </form>
      </section>
    </CreatePostContextProvider>
  );
};

export default CreatePost;
