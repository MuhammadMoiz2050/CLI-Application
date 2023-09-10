import React, { useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function DrawGraph() {

    const [command, setCommand] = useState('');
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [columns, setColumns] = useState([]);

    const handleCommandChange = (e) => {
        setCommand(e.target.value);
      };
    
      const handleChartDrawing = async () => {
        setError('');
    
        // Parse the command
        const parts = command.split(' ');
        if (parts.length !== 3 || parts[0] !== 'draw') {
          setError('Invalid command format. Use: "draw [file] [columns]"');
          return;
        }
    
        let fileName = parts[1];
        // fileName = fileName.replace(/ /g, '-');
        // console.log("filename ", fileName) 
        const commandColumns = parts[2].split(',');
    
        try {
          const response = await axios.get(`http://localhost:3001/draw/${fileName}`);
    
          if (response.status === 200) {
            // Parse the CSV data using PapaParse
            const parsedData = Papa.parse(response.data, { header: true, skipEmptyLines: true }).data;
    
            // Filter columns
            const filteredData = parsedData.map((row) =>
              commandColumns.reduce((acc, col) => {
                acc[col] = row[col];
                return acc;
              }, {})
            );
    
            // Set the filtered data and columns for chart drawing
            setData(filteredData);
            setColumns(commandColumns);
          }
        } catch (error) {
          setError(`Error drawing chart: ${error.message}`);
        }
      };
    
  return (
    <div>DrawGraph

    <input
        type="text"
        placeholder="Enter command (e.g., draw filename.csv column1,column2)"
        value={command}
        onChange={handleCommandChange}
      />
      <button onClick={handleChartDrawing}>Draw Chart</button>
      {error && <p className="error">{error}</p>}
      {data.length > 0 && (
        <LineChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={columns[0]} />
          <YAxis />
          <Tooltip />
          <Legend />
          {columns.map((col, index) => (
            <Line type="monotone" dataKey={col} key={index} stroke={`#${(index + 1) * 111}`} />
          ))}
        </LineChart>
      )}
    </div>
  )
}
