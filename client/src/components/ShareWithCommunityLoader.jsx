import React from "react";
import { useCreatePostContext } from "../contexts/CreatePostContext";
import Loader from "./Loader";
const ShareWithCommunityLoader = () => {
  const { shareWithCommunityLoader } = useCreatePostContext();
  return (
    <>
      {shareWithCommunityLoader && (
        <div className="w-full h-full absolute bg-[#f5f5f591] z-10 flex justify-center items-center backdrop-blur-[1px]">
          <Loader width="70px" height="70px" />
        </div>
      )}
    </>
  );
};

export default ShareWithCommunityLoader;
