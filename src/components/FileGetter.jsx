import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useFile } from "../context/FileContext";

const FileGetter = () => {
  const { chatContent, setChatContent } = useFile();

  const navigate = useNavigate();

  const handleTextChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setChatContent(reader.result);
        navigate("/viewer");
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleTextChange} />
      <>{chatContent}</>
    </div>
  );
};

export default FileGetter;
