import { useState } from 'react';
import { Box } from '@mui/material';
import uploadIcon from '../assets/Upload.svg';
import './UploadComponent.scss';

function UploadComponent({ onFileChange }) {
  const [, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleDragOver = (event) => {
    console.log('dragging', event);
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const { files } = event.dataTransfer;
    if (files.length === 0) return;
    setFile(files[0]);
    setPreview(URL.createObjectURL(files[0]));
    // onFileChange(files[0]); // call the function with the file as an argument
  };
  
  const handleFileChange = (event) => {
    const { files } = event.target;
    if (files.length === 0) return;
    setFile(files[0]);
    setPreview(URL.createObjectURL( files[0]));
    // onFileChange(event.target.files[0]); // call the function with the file as an argument
  };

  return (
    <Box className="thumbnail-container">
      {preview ? (
        <img className="thumbnail" src={preview} alt="thumbnail" />
      ) : (
        <>
          <img className="upload-icon" src={uploadIcon} alt="upload icon" />
          <p className="upload-text">
            <span className="upload-text bold">Click to upload</span> or drag
            and drop
          </p>
          <p className="upload-text">SVG, PNG, JPG or GIF (max. 800x400px)</p>
        </>
      )}
      <input
        type="file"
        className="upload-input"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onChange={handleFileChange}
      />
    </Box>
  );
}

export default UploadComponent;
