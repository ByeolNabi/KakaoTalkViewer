import React from "react";
import ChatMessage from "./ChatMessage";
import UserName from "./UserName";

import { useFile } from "../context/FileContext";

/**
 * 메시지들을 모두 출력합니다.
 */
const MessageList = () => {
  let { chatContents } = useFile();

  const chatHTML = chatContents.map((val, idx) => (
    <>
      <ChatMessage chatContent={val} />
      <UserName sender={val.sender} />
    </>
  ));
  return <div>{chatHTML}</div>;
};

export default MessageList;
