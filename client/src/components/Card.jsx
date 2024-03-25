import React from "react";
import { download } from "../assets";
import { downloadImage } from "../utils";
const Card = ({ _id, name, prompt, photo }) => {
  // Define an array of colors
  const colors = [
    "#FF5733",
    "#C70039",
    "#900C3F",
    "#581845",
    "#1C2833",
    "#17202A",
    "#F4D03F",
    "#F7DC6F",
    "#F8C471",
    "#F39C12",
  ];

  // Function to choose a random color from the array
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };
  return (
    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
      <img
        src={photo}
        alt={prompt}
        className="w-full h-auto object-cover rounded-xl"
      />
      <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
        <p className="text-white text-md overflow-y-auto prompt">{prompt}</p>
        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2 ">
            <div
              style={{ backgroundColor: getRandomColor() }}
              className="w-7 h-7 rounded-full object-cover flex justify-center items-center text-wrap text-xs font-bold text-white"
            >
              {name[0]}
            </div>
            <p className="text-white text-sm">{name}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              downloadImage(_id, photo);
            }}
            className="outline-none bg-transparent border-none hover:bg-[#f5f5f53c] rounded-3xl"
          >
            <img
              src={download}
              alt="download"
              className="w-6 h-6 object-contain invert"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
