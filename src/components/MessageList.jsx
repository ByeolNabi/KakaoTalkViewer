import React from "react";
import ChatMessage from "./ChatMessage";
import UserName from "./UserName";

import { useFile } from "../context/FileContext";
import styles from "../styles/MessageList.module.css";

/**
 * 메시지들을 모두 출력합니다.
 */
const MessageList = ({ owner }) => {
  let { chatContents } = useFile();

  const chatHTML = chatContents.map((val, idx) => {
    const bubbleClass = owner == val.sender ? styles.right : styles.left;
    const containerClass = owner == val.sender ? styles.right : styles.left;

    return (
      <div className={styles.chatContainer} key={idx}>
        <div className={`${styles.bubbleContainer} ${containerClass}`}>
          <div className={`${styles.chatBubble} ${bubbleClass}`}>
            <ChatMessage chatContent={val} />
            <UserName sender={val.sender} />
          </div>
        </div>
      </div>
    );
  });
  return chatHTML;
};

export default MessageList;
