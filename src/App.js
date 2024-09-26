// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './page/shop/NavBar_component';
// import Status from './page/shop/Status';  // นำเข้าหน้าของ Status
// import CakeList from './page/shop/Cake';
// import CookieList from './page/shop/Cookie';
// import DrinkList from './page/shop/Drink';

// import Home from './page/customer/Home';


// function App() {
//   return (
//     <Router>
//       <Navbar />  {/* แสดง Navbar ที่ทุกหน้าจะมี */}
//       <Routes>
//         <Route index element={<Home />} />
//         <Route path="/shop/Cake" element={<CakeList />} />  {/* กำหนดเส้นทางไปที่ Cake */}
//         <Route path="/shop/Cookie" element={<CookieList />} />  {/* กำหนดเส้นทางไปที่ Cookie */}
//         <Route path="/shop/Drink" element={<DrinkList />} />  {/* กำหนดเส้นทางไปที่ Drink */}
//         <Route path="/shop/Status" element={<Status />} />  {/* กำหนดเส้นทางไปที่ Status */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './page/shop/NavBar_component';
import NavBar_customer from './page/customer/NavBar_customer';

import Status from './page/shop/Status';  // นำเข้าหน้าของ Status
import CakeList from './page/shop/Cake';
import CookieList from './page/shop/Cookie';
import DrinkList from './page/shop/Drink';

import Main from './page/Main';
import Home from './page/customer/Home';
import Cart from './page/customer/Cart';
import Order from './page/customer/Order';
import Cakemenu from './page/customer/Cakemenu';
import Cookiemenu from './page/customer/Cookiemenu';
import Drinkmenu from './page/customer/Drinkmenu';


function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Main />} />
        
        <Route path="/customer/Home" element={<Home />} />  กำหนดเส้นทางไปที่ Home
        <Route path="/customer/Cart" element={<Cart />} />
        <Route path="/customer/Order" element={<Order />} />
        <Route path="/customer/Cakemenu" element={<Cakemenu />} />
        <Route path="/customer/Cookiemenu" element={<Cookiemenu />} />
        <Route path="/customer/Drinkmenu" element={<Drinkmenu />} />


        <Route path="/shop/Cake" element={<CakeList />} />  กำหนดเส้นทางไปที่ Cake
        <Route path="/shop/Cookie" element={<CookieList />} />  กำหนดเส้นทางไปที่ Cookie
        <Route path="/shop/Drink" element={<DrinkList />} />  กำหนดเส้นทางไปที่ Drink
        <Route path="/shop/Status" element={<Status />} />  กำหนดเส้นทางไปที่ Status
        
      </Routes>
    </Router>
  );
}

export default App;