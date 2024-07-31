import React, { createContext, useContext, useState } from "react";

const FileContext = createContext();

const useFile = () => {
  return useContext(FileProvider);
};

const FileProvider = ({ children }) => {
  const [chatContent, setChatContent] = useState();
  const [imageContents, setimageContents] = useState();

  return (
    <FileProvider.Provider
      value={{ chatContent, setChatContent, imageContents, setimageContents }}
    >
      {children}
    </FileProvider.Provider>
  );
};

export default FileContext;
s;
