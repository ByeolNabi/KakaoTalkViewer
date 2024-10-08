import React from "react";
import { useFile } from "../context/FileContext";

/**
 * 채팅 뭉치에서 message와 timestamp 부분을 담당합니다.
 */
const ChatMessage = ({ chatContent }) => {
  let { imageContents } = useFile();
  return (
    <div>
      {chatContent.imageInfo.imageTF ? (
        <>
          <div>{chatContent.message}</div>
          <div>
            {chatContent.imageInfo.imagePath.map((val, idx) => (
              <>
                <img
                  style={{ width: "90%" }}
                  src={imageContents[parseInt(val)]}
                  key={idx}
                ></img>
              </>
            ))}
          </div>
          linker@@
          <div>{chatContent.timestamp}</div>
        </>
      ) : (
        <>
          <div>{chatContent.message}</div>
          <div>{chatContent.timestamp}</div>
        </>
      )}
    </div>
  );
};

export default ChatMessage;
