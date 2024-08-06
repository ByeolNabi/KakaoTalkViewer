import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useFile } from "../context/FileContext";
import { chatDataParser } from "../services/chatParser";

const FileGetter = () => {
  const cdp = new chatDataParser();
  const { chatContents, setChatContents, imageContents, setimageContents } =
    useFile();

  const navigate = useNavigate();

  const handleTextChange = (event) => {
    const files = [...event.target.files];
    if (files) {
      const newImages = [];
      // 이미지만 먼저 처리하기
      for (let i = 0; i < files.length - 1; i++) {
        console.log("이미지 처리중");
        const file = files[i];
        const reader = new FileReader();
        reader.onload = () => {
          newImages.push(reader.result);
          if (newImages.length === files.length-1) {
            setimageContents(newImages);
          }
        };
        reader.readAsDataURL(file);
      }
      // 텍스트 데이터 처리
      const reader = new FileReader();
      reader.onload = () => {
        let chatRAW = reader.result;
        let mergedChatData = cdp.start(chatRAW, files);
        setChatContents(mergedChatData);
        navigate("/viewer");
      };
      reader.readAsText(files[files.length - 1]);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleTextChange} multiple />
      <>{chatContents}</>
    </div>
  );
};

export default FileGetter;
