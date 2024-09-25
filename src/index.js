import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Status_page from './page/shop/Status';
import reportWebVitals from './reportWebVitals';
import NavBar_component from './page/shop/NavBar_component';
import Cake from './page/shop/Cake';
import App from './App';
import CookieList from './page/shop/Cookie';
import DrinkList from './page/shop/Drink';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
