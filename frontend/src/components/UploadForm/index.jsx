import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './style.css'; 
import uploadIcon from '../images/upload-icon.png';

const UploadForm = () => {
  const [uploadStatus, setUploadStatus] = useState('');

  const onDrop = (acceptedFiles) => {
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);

    fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.text())
      .then(data => {
        alert(data);
        setUploadStatus(data); // Update upload status
        if (data === 'File uploaded successfully.') {
          window.location.href = '/scheduler';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setUploadStatus('Error uploading file.'); // Update upload status on error
      });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.xls',
  });

  return (
    <div className="container">
      <h1>Upload Courses File</h1>
      <p>Go to the "Courses Offered" section on MyTeduPortal, load the courses and press on "Export to Excel"</p>
      <div className="dropzone" {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="dz-message" style={{ margin: '8%' }}>
          <img className="upload-icon" src={uploadIcon} alt="Drop files here or click to upload" />
          <h2>Drag & drop files or <strong>Browse</strong></h2>
        </div>
      </div>
      {uploadStatus && <p>Status: {uploadStatus}</p>} {/* Display upload status */}
    </div>
  );
};

export default UploadForm;
