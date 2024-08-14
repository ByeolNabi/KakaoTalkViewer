import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useFile } from "../context/FileContext";
import { chatDataParser } from "../services/chatParser";

const FileGetter = ({ name }) => {
  const cdp = new chatDataParser();
  const { chatContents, setChatContents, imageContents, setimageContents } =
    useFile();

  const navigate = useNavigate();

  const handleTextChange = (event) => {
    const files = [...event.target.files];
    const imageFiles = files.slice(0, -1);
    const textFile = files[files.length - 1];
    const newImages = [];

    if (files) {
      imageFiles
        .reduce((promise, file) => {
          return promise.then(() => {
            return new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => {
                newImages.push(reader.result);
                resolve();
              };
              reader.onerror = reject;
              reader.readAsDataURL(file);
            });
          });
        }, Promise.resolve())
        .then(() => {
          setimageContents(newImages);

          // 텍스트 데이터 처리
          const reader = new FileReader();
          reader.onload = () => {
            let chatRAW = reader.result;
            let mergedChatData = cdp.start(chatRAW, files);
            setChatContents(mergedChatData);
            navigate("/viewer");
          };
          reader.readAsText(textFile);
        });
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
