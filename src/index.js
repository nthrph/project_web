// // import React from 'react';
// // import ReactDOM from 'react-dom/client';
// // import './index.css';
// // import Status_page from './page/shop/Status_page';
// // import reportWebVitals from './reportWebVitals';
// // import NavBar_component from './page/shop/NavBar_component';
// // import NavBar_customer from './page/customer/NavBar_customer';
// // import Home_page from './page/customer/Home_page';

// // npm install react-router-dom โหลด
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router components
// import Status_page from './page/shop/Status_page';
// import NavBar_customer from './page/customer/NavBar_customer';
// import Home_page from './page/customer/Home_page';
// import Cart_page from './page/customer/Cart_page'; // Assuming you have this component
// import Order_page from './page/customer/Order_page'; // Assuming you have this component
// import reportWebVitals from './reportWebVitals';


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <NavBar_customer />
//     {/* <Home_page /> */}

//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import NavBar_customer from './page/customer/NavBar_customer';
import Home_page from './page/customer/Home_page';
import Cart_page from './page/customer/Cart_page'; 
import Order_page from './page/customer/Order_page'; 

const App = () => {
  const [currentPage, setCurrentPage] = useState('home'); // สร้าง state เพื่อเก็บหน้าปัจจุบัน

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home_page />;
      case 'cart':
        return <Cart_page />;
      case 'order':
        return <Order_page />;
      default:
        return <Home_page />;
    }
  };

  return (
    <div>
      <NavBar_customer setCurrentPage={setCurrentPage} />
      {renderPage()} {/* แสดงหน้าตามค่าของ currentPage */}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
