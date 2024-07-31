import React, { useState } from "react";

const FileGetter = () => {
  const [fileContent, setFileContent] = useState("");
  const handleTextChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFileContent(reader.result);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleTextChange} />
      <>{fileContent}</>
    </div>
  );
};

export default FileGetter;
