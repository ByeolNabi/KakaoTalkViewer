import React from "react";

import MessageList from "../components/MessageList";
import { useFile } from "../context/FileContext";

/**
 * chat json데이터를 보기좋게 표현해주는 페이지입니다.
 */
const ViewerPage = () => {
  const { speaker } = useFile();

  return (
    <div>
      <MessageList owner={speaker} />
    </div>
  );
};

export default ViewerPage;
