import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useFile } from "../context/FileContext";
import { parseMessages } from "../services/chatParser";

const FileGetter = () => {
  const { chatContents, setChatContents } = useFile();

  const navigate = useNavigate();

  const handleTextChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        let chatJSON = parseMessages(reader.result);
        setChatContents(chatJSON);
        navigate("/viewer");
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleTextChange} />
      <>{chatContents}</>
    </div>
  );
};

export default FileGetter;
