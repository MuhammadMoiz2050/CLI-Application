import logo from './logo.svg';
import 'bulma/css/bulma.css';
import './App.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function App() {

  const navigate = useNavigate()
const handleButton=(e)=>{
  navigate('/cli');
}

  return (
    <div className='animated-background'>
    <div className="container">
      <div className="columns is-centered is-vcentered" style={{ height: '100vh' }}>
        <div className="column is-half">
          <div className="card"   >
            <div className="card-content has-text-centered">
              <p className=" has-background-white title">Welcome!</p>
            </div>
          </div>
          <div className="card-footer">
          <button
                className="card-footer-item button is-primary is-info"
                onClick={handleButton}
              > Start
              </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default App;
