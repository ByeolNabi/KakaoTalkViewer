import React from "react";

/**
 * 채팅 뭉치에서 message와 timestamp 부분을 담당합니다.
 */
const ChatMessage = ({ chatContent }) => {
  console.log("hello");
  return (
    <div>
      <div>{chatContent.message}</div>
      <div>{chatContent.timestamp}</div>
    </div>
  );
};

export default ChatMessage;
