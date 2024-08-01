import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useFile } from "../context/FileContext";
import { parseMessages } from "../services/chatParser";

const FileGetter = () => {
  const { chatContent, setChatContent } = useFile();

  const navigate = useNavigate();

  const handleTextChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        let chatJSON = parseMessages(reader.result);
        setChatContent(chatJSON);
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
