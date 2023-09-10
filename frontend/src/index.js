import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import Fileupload from './components/fileupload';
// import DrawGraph from './components/drawGraph';
// import FileDelete from './components/fileDelete';
// import FetchPrice from './components/fetchPrice';
import Cli from './components/cli';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>

  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/cli" element={<Cli />} />
      {/* <Route path="/contact" component={Contact} />
      <Route path="/" component={App} /> */}
    </Routes>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
