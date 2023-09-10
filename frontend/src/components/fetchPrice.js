import React, { useState } from 'react';
import axios from 'axios';

export default function FetchPrice() {

    const [command, setCommand] = useState('');
    const [price, setPrice] = useState('');
    const [error, setError] = useState('');
  
    const handleCommandChange = (e) => {
      setCommand(e.target.value);
    };
  
    const handlePriceFetch = async () => {
      setError('');
      setPrice('');
  
      const commandParts = command.split(' ');
      if (commandParts.length !== 2 || commandParts[0] !== 'fetch-price') {
        setError('Invalid command format. Use: "fetch-price [pair]"');
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
  
          setPrice(`Price for ${currencyPair} is ${priceValue}`);
        }
      } catch (error) {
        setError(`Error fetching price: ${error.message}`);
      }
    };
  return (
    <div>fetchPrice
        <input
        type="text"
        placeholder="Enter command (e.g., fetch-price BTCUSDT)"
        value={command}
        onChange={handleCommandChange}
      />
      <button onClick={handlePriceFetch}>Fetch Price</button>
      {error && <p className="error">{error}</p>}
      {price && <p className="price">{price}</p>}
    </div>
  )
};


