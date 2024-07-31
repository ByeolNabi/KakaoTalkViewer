import React from "react";

import MessageList from "../components/MessageList";
import { useFile } from "../context/FileContext";

/**
 * chat json데이터를 보기좋게 표현해주는 페이지입니다.
 */
const ViewerPage = () => {
  let { chatContent } = useFile();

  return (
    <div>
      <MessageList></MessageList>
      {JSON.stringify(chatContent)}
    </div>
  );
};

export default ViewerPage;
