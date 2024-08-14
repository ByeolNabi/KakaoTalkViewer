import React from "react";

// import ImagePreview from "../components/ImagePreview";
// import FolderSelector from "../components/FolderSelector";
import FileGetter from "../components/FileGetter";
import { useFile } from "../context/FileContext";

/**
 * 백업 데이터를 가지고 있는 폴더를 지정하는 페이지입니다.
 */
const HomePage = () => {
  const { setSpeaker } = useFile();
  return (
    <div>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="당사자의 이름을 입력"
        onChange={(e) => {
          setSpeaker(e.target.value);
        }}
      />
      <br />
      폴더를 지정해주세요
      <br />
      {/* <ImagePreview /> */}
      <FileGetter />
      {/* <FolderSelector/> */}
    </div>
  );
};

export default HomePage;
