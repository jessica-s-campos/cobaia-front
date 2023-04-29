import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './componentes/login/login';
import SignUp from './componentes/signup/signup';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faCircleNotch, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Main from './componentes/main/main';

library.add(fas, faCircleNotch, faSpinner)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className='start'>
    <BrowserRouter>
    <div className='header'>
      {/*<FontAwesomeIcon className='icon' icon={faSpinner} size="xs" spin />*/}
      <h1>conecta-mktpl</h1>
      {/*<FontAwesomeIcon className='icon' icon={faSpinner} size="xs" spin />*/}
    </div>
    <Routes>
        <Route path="/" element={<App />}/>       
        <Route path="/main" element={<Main />}/>       
        <Route path="/signup" element={<SignUp />}/>       
        <Route path="/login" element={<Login />}/>       
    </Routes>
    
    </BrowserRouter>
  </div>  
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
