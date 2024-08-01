import React from "react";
import ChatMessage from "./ChatMessage";
import UserName from "./UserName";

import { useFile } from "../context/FileContext";
import styles from "../styles/MessageList.module.css"

/**
 * 메시지들을 모두 출력합니다.
 */
const MessageList = () => {
  let { chatContents } = useFile();

  const chatHTML = chatContents.map((val, idx) => (
    <div className = {styles.chatBubble}>
      <ChatMessage chatContent={val} />
      <UserName sender={val.sender} />
    </div>
  ));
  return <div className = {styles.chatContainer}>{chatHTML}</div>;
};

export default MessageList;
