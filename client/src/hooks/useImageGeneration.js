import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { DallE_API_URL } from "../constants";

const useImageGenerator = (form, setForm) => {
  const [generatingImg, setGeneratingImg] = useState(false);
  const [isImageGenerationDone, setIsImageGenerationDone] = useState(false);
  const [isPhotoResetBtnEnabled, setIsPhotoResetBtnEnabled] = useState(false);
  const [isShareBtnDisabled, setIsShareBtnDisabled] = useState(true);
  const [isInputFieldDisabled, setIsInputFieldDisabled] = useState(false);

  // Setting the color & animation for input fields
  const [fieldStates, setFieldStates] = useState({
    name: { color: "border-gray-300", animation: "" },
    prompt: { color: "border-gray-300", animation: "" },
  });
  const setFieldState = useCallback((fieldName, color, animation) => {
    setFieldStates((prevFieldStates) => ({
      ...prevFieldStates,
      [fieldName]: { color, animation },
    }));
  }, []);
  
  const generateImage = useCallback(async () => {
    if (isImageGenerationDone) {
      setIsPhotoResetBtnEnabled(true);
    } else if (form.prompt && form.name) {
      setIsShareBtnDisabled(true);

      // The moment image generation starts disable prompt edit
      setIsInputFieldDisabled(true);
      setIsImageGenerationDone(false);

      try {
        setGeneratingImg(true);
        const response = await fetch(DallE_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });
        const data = await response.json();

        if (response.status !== 400) {
          setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
          setIsShareBtnDisabled(false);
          setIsImageGenerationDone(true);
        } else {
          const msg = data.error.message;
          toast.error(`${response.statusText}: ${msg}`);
          // confirm("Do you want to enter your own API key ?");
        }
      } catch (err) {
        toast.error(err.toString());
      } finally {
        setGeneratingImg(false);
      }
    } else {
      // Make empty field red & apply shake animation
      if (form.name === "") {
        setFieldState("name", "border-red-500", "animate-shake");
      }
      if (form.prompt === "") {
        setFieldState("prompt", "border-red-500", "animate-shake");
      }

      //   Send notifications
      if (form.name === "" && form.prompt === "") {
        toast.error("Please provide name & prompt");
      } else {
        toast.error(`Please provide ${!form.name ? "name" : "proper prompt"}`);
      }
    }
  }, [
    form,
    setForm,
    isImageGenerationDone,
    setIsImageGenerationDone,
    isPhotoResetBtnEnabled,
    setIsPhotoResetBtnEnabled,
    isShareBtnDisabled,
    setIsShareBtnDisabled,
    isInputFieldDisabled,
    setIsInputFieldDisabled,
    setFieldState,
  ]);

  return {
    form,
    setForm,
    generatingImg,
    setGeneratingImg,
    isImageGenerationDone,
    setIsImageGenerationDone,
    isPhotoResetBtnEnabled,
    setIsPhotoResetBtnEnabled,
    isShareBtnDisabled,
    setIsShareBtnDisabled,
    isInputFieldDisabled,
    setIsInputFieldDisabled,
    generateImage,
    ...fieldStates,
    setFieldState,
  };
};

export default useImageGenerator;
