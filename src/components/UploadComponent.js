import { useState } from 'react';
import { Box } from '@mui/material';
import uploadIcon from '../assets/Upload.svg';
import './UploadComponent.scss';

function UploadComponent({ onFileChange }) {
  // Declare state variables for file and preview
  const [, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // Handle drag over event
  const handleDragOver = (event) => {
    console.log('dragging', event);
    event.preventDefault();
  };

  // Handle drop event
  const handleDrop = (event) => {
    event.preventDefault();
    const { files } = event.dataTransfer;
    if (files.length === 0) return;
    setFile(files[0]);
    setPreview(URL.createObjectURL(files[0]));
    if (onFileChange)
     onFileChange(files[0]); // call the function with the file as an argument
  };
  
  // Handle file change event
  const handleFileChange = (event) => {
    const { files } = event.target;
    if (files.length === 0) return;
    setFile(files[0]);
    setPreview(URL.createObjectURL( files[0]));
    if (onFileChange)
      onFileChange(event.target.files[0]); // call the function with the file as an argument
  };

  // Render the component
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
