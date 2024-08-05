import React, { useState } from 'react';

const FolderSelector = () => {
  const [folderPath, setFolderPath] = useState('');
  const [fileNames, setFileNames] = useState([]);

  const openFolderDialog = async () => {
    try {
      const result = await window.electronAPI.openFolderDialog();
      console.log(result)
      if (result) {
        setFolderPath(result.folderPath);
        setFileNames(result.fileNames);
      }
    } catch (error) {
      console.error('Failed to fetch folder contents:', error);
    }
  };

  return (
    <div>
      <button onClick={openFolderDialog}>Open Folder</button>
      <div>
        <h3>Selected Folder: {folderPath}</h3>
        <ul>
          {fileNames.map((file, index) => (
            <li key={index}>{file.name} - {file.path}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FolderSelector;
