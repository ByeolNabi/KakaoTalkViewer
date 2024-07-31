import React, { createContext, useContext, useState } from "react";

const FileContext = createContext();

export const useFile = () => {
  return useContext(FileContext);
};

export const FileProvider = ({ children }) => {
  const [chatContent, setChatContent] = useState();
  const [imageContents, setimageContents] = useState();

  return (
    <FileContext.Provider
      value={{ chatContent, setChatContent, imageContents, setimageContents }}
    >
      {children}
    </FileContext.Provider>
  );
};
