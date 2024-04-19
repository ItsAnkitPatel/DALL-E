import { createContext, useContext } from "react";

// Create a new context
const CreatePostContext = createContext({
  isModalVisible: false,
  isShareBtnDisabled: true,
  isImageGenerationDone: true,
  isInputFieldDisabled: false,
  isPhotoResetBtnEnabled: false,
  setIsPhotoResetBtnEnabled: () => {},
  toggleModalVisibility: () => {},
  resetPhoto: () => {},

  shareWithCommunityLoader: false,

  animateInputField: "animate-shake",
  animateTheInputField: () => {},
  removeAnimateFromInputField: () => {},
});

// Create a provider component
export const CreatePostContextProvider = CreatePostContext.Provider;

// Custom hook
export function useCreatePostContext() {
  return useContext(CreatePostContext);
}
