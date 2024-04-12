import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components";
import { DallE_API_URL, POST_API_URL } from "../constants";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [shareBtn, setShareBtn] = useState(false);
  const [shareBtnLoader, setShareBtnLoader] = useState(false);
  const [nameFieldColor, setNameFieldColor] = useState("border-gray-300");
  const [promptFieldColor, setPromptFieldColor] = useState("border-gray-300");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      setShareBtn(false);
      setShareBtnLoader(true);
      try {
        const response = await fetch(POST_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...form }),
        });
        await response.json();
        setShareBtnLoader(false);
        alert("success");
        navigate("/");
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setNameFieldColor("border-gray-300");
  };
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
    setPromptFieldColor("border-gray-300");
  };

  const generateImage = async () => {
    if (form.prompt && form.name) {
      setShareBtn(false);
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
          setShareBtn(true);
        } else {
          const msg = data.error.message;
          alert(`${response.statusText}: ${msg}`);
          // confirm("Do you want to enter your own API key ?");
        }
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      if (form.name === "") setNameFieldColor("border-red-500");

      if (form.prompt === "") setPromptFieldColor("border-red-500");

      setTimeout(() => {
        alert(`Please provide ${!form.name ? "name" : "proper prompt"} `);
      }, 100);
    }
  };

  return (
    <section className="max-w-7xl mx-auto overflow-hidden relative">
      {shareBtnLoader && (
        <div className="w-[100%] h-[100%] absolute bg-[#f5f5f591] z-10 flex justify-center items-center pr-20 backdrop-blur-[1px]">
          <Loader width="70px" height="70px" />
        </div>
      )}
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
            isTextFilled={nameFieldColor}
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
            isTextFilled={promptFieldColor}
          />

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
        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:bg-green-600 active:bg-green-900 duration-100 "
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>
        </div>
        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            Once you have created the image you want, you can share it with
            others in the community
          </p>
          <button
            type="submit"
            className={`mt-3 text-white  
            ${
              shareBtn === true
                ? "bg-[#6469ff] active:bg-[#191c5a] hover:bg-[#4b51f5]"
                : "bg-[#6469ffa5]"
            }
             font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center duration-200`}
            title={shareBtn === true ? "" : "First generate the image"}
            disabled={!shareBtn}
          >
            {loading ? "Sharing..." : "Share with the community"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
