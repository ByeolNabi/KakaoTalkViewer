import React from "react";

import ImagePreview from "../components/ImagePreview";
import FileGetter from "../components/FileGetter";
import FolderSelector from "../components/FolderSelector";

/**
 * 백업 데이터를 가지고 있는 폴더를 지정하는 페이지입니다.
 */
const HomePage = () => {
  return (
    <div>
      폴더를 지정해주세요
      <br />
      {/* <ImagePreview /> */}
      <FileGetter />
      {/* <FolderSelector/> */}
    </div>
  );
};

export default HomePage;
