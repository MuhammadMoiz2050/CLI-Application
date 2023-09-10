import React, { useState } from 'react';
import axios from 'axios';

export default function FileDelete() {

    const [fileName, setFileName] = useState('');
    const [message, setMessage] = useState('');

    const handleFileNameChange = (e) => {
        setFileName(e.target.value);
      };
    
    const handleFileDeletion = async () => {
        if (!fileName) {
          setMessage('Please enter a file name.');
          return;
        }
    
        try {
          const response = await axios.delete(`http://localhost:3001/delete/${fileName}`);
    
          if (response.status === 200) {
            setMessage(`File "${fileName}" deleted successfully.`);
          }
        } catch (error) {
          setMessage(`Error deleting file "${fileName}": ${error.message}`);
        }
      };
    
  return (
    <div>FileDelete
        <input
        type="text"
        placeholder="Enter file name to delete"
        value={fileName}
        onChange={handleFileNameChange}
      />
      <button onClick={handleFileDeletion}>Delete File</button>
      <p>{message}</p>
    </div>
  )
}
