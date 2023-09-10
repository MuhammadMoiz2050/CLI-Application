import React, { useState } from 'react';
import FileUpload from './components/fileupload';
import DeleteFile from './components/fileDelete';
import DrawGraph from './components/drawGraph';
import FetchPrice from './components/fetchPrice';
// import HelpCommand from './HelpCommand';
// import GetPriceCommand from './GetPriceCommand';

function Test() {
  const [commandHistory, setCommandHistory] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [currentComponent, setCurrentComponent] = useState(null);

  const executeCommand = (command) => {
    setCommandHistory([...commandHistory, command]);
    setCurrentCommand('');

    switch (command.toLowerCase()) {
      case 'upload':
        setCurrentComponent(<FileUpload />);
        break;
      case 'delete':
        setCurrentComponent(<DeleteFile />);
        break;
      case 'draw':
        setCurrentComponent(<DrawGraph />);
        break;
      case 'price':
        setCurrentCommand(<FetchPrice />)
        break;

    //   case 'help':
    //     setCurrentComponent(<HelpCommand />);
    //     break;
    //   case 'get price':
    //     setCurrentComponent(<GetPriceCommand />);
    //     break;
      default:
        console.log(`Command not recognized: ${command}`);
    }
  };

  const handleInputChange = (e) => {
    setCurrentCommand(e.target.value);
  };

  const handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      executeCommand(currentCommand);
    }
  };

  return (
    <div>
      <div>
        {commandHistory.map((command, index) => (
          <div key={index}>{`> ${command}`}</div>
        ))}
        <div>{`> ${currentCommand}`}</div>
      </div>
      <input
        type="text"
        placeholder="Enter a command..."
        value={currentCommand}
        onChange={handleInputChange}
        onKeyDown={handleEnterKey}
      />
      {currentComponent}
    </div>
  );
}

export default Test;
