// import React from 'react'
import React, { useState, useRef } from 'react';
import axios from 'axios';


function Fileupload() {

    const [file, setFile] = useState(null);
    const inputRef = useRef(null);
    const fileInputRef = useRef(null);


    const handleFileChange = (e) => {
        // console.log(e.target.files)
        // console.log(e.target.files[0])
        setFile(e.target.files[0]);
      };

    const handleFileUpload = async () => {
        if (!file) {
          return;
        }
    
        const formData = new FormData();
        formData.append('file', file);
        // console.log(formData[0])
    
        try {
          const response = await axios.post('http://localhost:3001/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
    
          if (response.status === 200) {
            alert('File uploaded successfully.');
          }
        } catch (error) {
          console.error('Error uploading file:', error);
          alert('Error uploading file.');
        }
      };

      const handleEnterKey = (e) => {
        if (e.key === 'Enter') {
          e.preventDefault(); // Prevent Enter from creating a new line
          if (inputRef.current) {
            const command = inputRef.current.textContent.trim().toLowerCase();
            if (command === 'upload') {
              // Trigger the file input click event
              if (fileInputRef.current) {
                fileInputRef.current.click();
              }
            } else {
              console.log(`Command not recognized: ${command}`);
            }
            // Clear the input field
            inputRef.current.textContent = '';
          }
        }
      };
  return (
    <div> <h1>FILE UPLOAD</h1>
    <div
      contentEditable={true}
      ref={inputRef}
      onKeyDown={handleEnterKey}
      style={{
        border: '1px solid #ccc',
        padding: '8px',
        width: '200px',
      }}
    >
      {/* This div will act as an editable input field */}
    </div>
    <input
      type="file"
      ref={fileInputRef}
      onChange={handleFileChange}
      style={{ display: 'none' }}
    />
    <button onClick={handleFileUpload}>Upload File</button>
      </div>
  )
}

export default Fileupload;
