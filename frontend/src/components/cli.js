import React, { useState, useRef, useEffect} from 'react';
import Papa from 'papaparse';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import Artwork from './artwork';

import 'bulma/css/bulma.css';
import '../styles/clistyle.css'


export default function Cli() {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [message, setMessage] = useState('');
  
    const [command, setCommand] = useState('');
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [columns, setColumns] = useState([]);
    const [commandHistory, setCommandHistory] = useState([]);
    const [inputCommand, setInputCommand] = useState([]);
    const [price, setPrice] = useState('');
    const [showHelp, setShowHelp] = useState(false); 
    const [showGraph, setShowGraph] = useState(false);
    const lineColors = ['#FF5733', '#338DFF', '#33FF44'];

    const fileInputRef = useRef(null);
  
    const handleFileChange = (e) => {
      // Update the file state when a file is selected
      setFile(e.target.files[0]);
    };
  
    const handleFileNameChange = (e) => {
      setFileName(e.target.value);
    };
  
    const executeUploadCommand = async () => {
      setError('');
      setMessage('');
  
      if (!file) {
        setMessage('Please select a file to upload.');
        setCommandHistory([...commandHistory, message]);
        return;
      }
  
      try {
        const formData = new FormData();
        formData.append('file', file);
  
        const response = await axios.post('http://localhost:3001/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        if (response.status === 200) {
          setMessage('File uploaded successfully.');
          setCommandHistory((prevHistory) => [...prevHistory, `guest@Chromium-x64-CLI:$ ~ ${command}`]);
          setCommandHistory((prevHistory) => [...prevHistory, 'File uploaded successfully.']);

          setFile(null);
          fileInputRef.current.value = '';
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            // Check if there is a specific error message from the server
            setMessage(`Error uploading file: ${error.response.data.message}`);
            setCommandHistory((prevHistory) => [...prevHistory, `guest@Chromium-x64-CLI:$ ~ ${command}`]);
            setCommandHistory((prevHistory) => [...prevHistory, `Error uploading file: ${error.response.data.message}`]);
            setFile(null);
        }
        else{
        console.error('Error uploading file:', error);
        setMessage(`Error uploading file: ${error.message}`);
        setCommandHistory((prevHistory) => [...prevHistory, `guest@Chromium-x64-CLI:$ ~ ${command}`]);
        setCommandHistory((prevHistory) => [...prevHistory, `Error uploading file: ${error.message}`]);
        setFile(null);
        }
      }
      
    };
  
    const executeDeleteCommand = async () => {
      setError('');
      setMessage('');
  
      if (!fileName) {
        // setMessage('Please enter a file name.');
        setCommandHistory([...commandHistory, message]);
        return;
      }
  
      try {
        const response = await axios.delete(`http://localhost:3001/delete/${fileName}`);
  
        if (response.status === 200) {
        //   setMessage(`File "${fileName}" deleted successfully.`);
          setCommandHistory((prevHistory) => [...prevHistory, `guest@Chromium-x64-CLI:$ ~ ${command}`]);
          setCommandHistory((prevHistory) => [...prevHistory, `File "${fileName}" deleted successfully.`]);

          setMessage('');
          setFileName('');
        }
      } catch (error) {
        // setMessage(`Error deleting file "${fileName}": ${error.message}`);
        setCommandHistory((prevHistory) => [...prevHistory, `guest@Chromium-x64-CLI:$ ~ ${command}`]);
        setCommandHistory((prevHistory) => [...prevHistory, `Error deleting file "${fileName}": ${error.message}`]);
        setMessage('');
        setFileName('');
      }
    };
  
    const executeDrawCommand = async () => {
      setError('');
  
      const trimmedCommand = command.trim();
      const parts = trimmedCommand.split(' ');
  
      if (parts.length !== 3) {
        setError('Invalid command format. Use: "draw [file] [columns]"');
        setCommandHistory([...commandHistory, message]);
        return;
      }
  
      let fileName = parts[1];
      const commandColumns = parts[2].split(',');
  
      try {
        const response = await axios.get(`http://localhost:3001/draw/${fileName}`);
  
        if (response.status === 200) {
          const parsedData = Papa.parse(response.data, { header: true, skipEmptyLines: true }).data;
  
          const filteredData = parsedData.map((row) =>
            commandColumns.reduce((acc, col) => {
              acc[col] = row[col];
              return acc;
            }, {})
          );
  
          setData(filteredData);
          setColumns(commandColumns);

          setShowGraph(true);
        }
      } catch (error) {
        setError(`Error drawing chart: ${error.message}`);
        setCommandHistory([...commandHistory, message]);
      }
    };

    const handlePriceFetch = async () => {
        setError('');
        setPrice('');
    
        const commandParts = command.split(' ');
        if (commandParts.length !== 2 || commandParts[0] !== 'fetch-price') {
          setError('Invalid command format. Use: "fetch-price [pair]"');
          setCommandHistory([...commandHistory, message]);
          return;
        }
        const currencyPair = commandParts[1];
        const apiUrl = `https://api.binance.com/api/v3/avgPrice?symbol=${currencyPair}`;

        try {
            const response = await axios.get(apiUrl);
      
            if (response.status === 200) {
              console.log("price ",response.data.price)
            //   const priceData = response.data;
              const priceValue = response.data.price; 
              
              setPrice(priceValue);
              setMessage(`Price for ${currencyPair} is ${priceValue}`);
              setCommandHistory((prevHistory) => [...prevHistory, `guest@Chromium-x64-CLI:$ ~ ${command}`]);
              setCommandHistory((prevHistory) => [...prevHistory, `Price for ${currencyPair} is ${priceValue}`]);
            }
          } catch (error) {
            setError(`Error fetching price: ${error.message}`);
            setCommandHistory((prevHistory) => [...prevHistory, `guest@Chromium-x64-CLI:$ ~ ${command}`]);
            setCommandHistory((prevHistory) => [...prevHistory, `Error fetching price: ${error.message}`]);
          }
    }
  
    const handleCommandInputChange = (e) => {
      setCommand(e.target.value);
    };
  
    const handleEnterKey = (e) => {
      if (e.key === 'Enter') {
        const userInput = command;
        // setCommandHistory([...commandHistory,`guest@Chromium-x64-CLI:$ ~ ${userInput}`]);
        // console.log(commandHistory)
        // setCommandHistory([...commandHistory,])
        // Execute the appropriate command based on input
        const trimmedCommand = command.trim().toLowerCase();
        if (trimmedCommand.startsWith('help')) {
        //    setShowHelp(true);
        const helpMessage = `Available commands:\n- help: Show available commands\n- about: Display information about this CLI\n- fetch-price [coin]: Fetch the current price of a specified cryptocurrency\n- upload: Opens the file explorer to allow uploading csv files only.\n- draw [file] [columns]: Draws the chart of the specified columns of the file present in the draw-chart directory.\n- delete [filename]: Delete the selected file from the draw-chart directory.\n- cls: Clear the screen history.\n- remove-graph: Remove the graph from the screen.`;
        const helpMessageArray = helpMessage.split('\n');    
        setCommandHistory((prevHistory) => [...prevHistory, `guest@Chromium-x64-CLI:$ ~ ${command}`]);
        setCommandHistory((prevHistory) => [...prevHistory, ...helpMessageArray]);
        }
        else if (trimmedCommand.startsWith('about')) {
            setShowHelp(false);
            setCommandHistory((prevHistory) => [...prevHistory, `guest@Chromium-x64-CLI:$ ~ ${command}`]);
            setCommandHistory((prevHistory) => [...prevHistory, 'CLI Version 1.0', 'This is a front-end CLI created as a part of the Full Stack Hiring test. It simulates various command-line functionalities.']);
        }
        else if (trimmedCommand.startsWith('upload')) {
            setShowHelp(false);
            try {
                fileInputRef.current.click();
                if(file){
                    executeUploadCommand();
                }
                else{return;}
              } catch (error) {
                console.error('Error triggering file input click:', error);
              }
        } else if (trimmedCommand.startsWith('delete')) {
            setShowHelp(false);
            const parts = trimmedCommand.split(' ');
            if (parts.length === 2){
                setFileName(parts[1]);
                executeDeleteCommand();
            }else {
          setMessage('Invalid delete command format. Use: delete [filename]"');
          setCommandHistory((prevHistory) => [...prevHistory, `guest@Chromium-x64-CLI:$ ~ ${command}`]);
          setCommandHistory((prevHistory) => [...prevHistory, 'Invalid delete command format. Use: delete [filename]"']);
        }
        } else if (trimmedCommand.startsWith('draw')) {
            setShowHelp(false);
            setShowGraph(false);
          executeDrawCommand();
        }
        else if (trimmedCommand.startsWith('remove-graph')){
            setShowGraph(false);
        } 
        else if (trimmedCommand.startsWith('fetch-price')) {
            const parts = trimmedCommand.split(' ');
            if (parts.length === 2){
            setShowHelp(false);
            handlePriceFetch();
            }else{
            setMessage('Invalid delete command format. Use: fetch-price [Currency] e.g fetch-price BTCUSDT"');
            setCommandHistory((prevHistory) => [...prevHistory, `guest@Chromium-x64-CLI:$ ~ ${command}`]);
            setCommandHistory((prevHistory) => [...prevHistory, 'Invalid delete command format. Use: fetch-price [Currency] e.g fetch-price BTCUSDT"']);
            }
        }
        else if (trimmedCommand.startsWith('cls')) {
            setShowHelp(false);
            setCommandHistory([]);
            setShowGraph(false);
        }
        else{
            setShowHelp(false);
            setCommandHistory([...commandHistory, 'Invalid command, Use "help" to see the command list.']);
        }
        // setInputCommand([...inputCommand,`guest@Chromium-x64-CLI:$ ~ ${userInput}`]);
        // console.log(inputCommand)
        
        console.log(commandHistory)
        setCommand('');
        
      }
    };
    useEffect(() => {
        // Check if file state has changed and execute upload if a file is selected
        if (file) {
          executeUploadCommand();
        }
      }, [file]);
    
      useEffect(() => {
        // Check if fileName state has changed and execute delete if a fileName is set
        if (fileName) {
          executeDeleteCommand([]);
        }
      }, [fileName]);

      useEffect(() => {
        document.body.style.backgroundColor = 'black'; // Set the body background color
      }, []);

    return (
    <>
    <Artwork />
      <div className="parent-div is-family-monospace">
        <div className='prompt-color'>
          {commandHistory.map((cmd, index) => (
            <div key={index}>{`>${cmd}`}</div>
          ))}
        </div>

        {showHelp && (
            <div>
            <h2>Help</h2>
            <p>Available commands:</p>
            <ul>
                <li>- help: Show available commands</li>
                <li>- about: Display information about this CLI</li>
                <li>- fetch-price [coin]: Fetch the current price of a specified cryptocurrency</li>
                <li>- upload: Opens the file explorer to allow uploading csv files only.</li>
                <li>- draw [file] [columns]: Draws the chart of the specified columns of the file present in the draw-chart directory. </li>
            </ul>
            </div>
        )}
        <span className='cli-prompt'>guest@</span>
        <span style={{color:"#53A1AD"}}>Chromium-x64-CLI </span>
        <span style={{color:"#DFDBB2"}}>:$  </span>
        <span style={{color:"red"}}> ~ </span>
        <input className='has-text-weight-semibold is-family-monospace'
          type="text"
          value={command}
          onChange={handleCommandInputChange}
          onKeyDown={handleEnterKey}
          autoFocus
        />
        {/* <button onClick={handleEnterKey}>Execute Command</button> */}
        {error && <p className="error">{error}</p>}
        {message && <p>{message}</p>}
  
        {/* Allow file selection for the "upload" command */}
        {command.trim().toLowerCase().startsWith('upload') && (
          <div>
             <input
            type="file"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
          </div>
          )}
    
        
        
        {showGraph && (
          <LineChart width={800} height={400} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={columns[0]} tick={{ fill: 'white' }} />
            <YAxis tick={{ fill: 'white' }}/>
            <Tooltip />
            <Legend wrapperStyle={{ color: 'white' }} />
            {columns.map((col, index) => (
              <Line type="monotone" dataKey={col} key={index} stroke={lineColors[index % lineColors.length]} />
            ))}
          </LineChart>
        )}

        <footer>
            Copyright ANTEMATTER, all rights reserved®
        </footer>
      </div>
      </>
    );
  }