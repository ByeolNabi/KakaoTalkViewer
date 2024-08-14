import React, { createContext, useContext, useState } from "react";

const FileContext = createContext();

export const useFile = () => {
  return useContext(FileContext);
};

export const FileProvider = ({ children }) => {
  const [chatContents, setChatContents] = useState();
  const [imageContents, setimageContents] = useState();
  const [speaker, setSpeaker] = useState();

  return (
    <FileContext.Provider
      value={{
        chatContents,
        setChatContents,
        imageContents,
        setimageContents,
        speaker,
        setSpeaker,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};
