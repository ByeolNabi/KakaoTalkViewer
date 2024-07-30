import React from "react";
import ChatMessage from "./ChatMessage";
import UserName from "./UserName";

/**
 * 메시지들을 모두 출력합니다.
 */
const MessageList = () => {
  return (
    <div>
      <ChatMessage />
      <UserName />
    </div>
  );
};

export default MessageList;
