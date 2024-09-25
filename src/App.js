import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './page/shop/NavBar_component';
import Status from './page/shop/Status';  // นำเข้าหน้าของ Status
import CakeList from './page/shop/Cake';
import CookieList from './page/shop/Cookie';
import DrinkList from './page/shop/Drink';

function App() {
  return (
    <Router>
      <Navbar />  {/* แสดง Navbar ที่ทุกหน้าจะมี */}
      <Routes>
        <Route path="/shop/Cake" element={<CakeList />} />  {/* กำหนดเส้นทางไปที่ Cake */}
        <Route path="/shop/Cookie" element={<CookieList />} />  {/* กำหนดเส้นทางไปที่ Cookie */}
        <Route path="/shop/Drink" element={<DrinkList />} />  {/* กำหนดเส้นทางไปที่ Drink */}
        <Route path="/shop/Status" element={<Status />} />  {/* กำหนดเส้นทางไปที่ Status */}
      </Routes>
    </Router>
  );
}

export default App;