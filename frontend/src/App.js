import logo from './logo.svg';
import 'bulma/css/bulma.css';
import './App.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function App() {

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()
  const handleButton = (e) => {
    setIsLoading(true);
    setTimeout(() => { navigate('/cli'); }, 1000)


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
                className={`card-footer-item button is-primary is-info ${isLoading ? 'is-loading' : 'is-primary'}`}
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
