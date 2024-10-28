import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './page/customer/CartContext';
import Status from './page/shop/Status';  // Shop status page
import CakeList from './page/shop/Cake';  // Cake list page
import CookieList from './page/shop/Cookie';  // Cookie list page
import DrinkList from './page/shop/Drink';  // Drink list page

import Main from './page/Main';  // Main page
import Home from './page/customer/Home';  // Home page
import Cart from './page/customer/Cart';  // Cart page
import Order from './page/customer/Order';  // Order page
import Cakemenu from './page/customer/Cakemenu';  // Cake menu page
import Cookiemenu from './page/customer/Cookiemenu';  // Cookie menu page
import Drinkmenu from './page/customer/Drinkmenu';  // Drink menu page
import PopupForm from './page/customer/PopupForm'; 

function App() {
  return (
    <Router>
      <CartProvider>
      <Routes>
        <Route index element={<Main />} />
        
        <Route path="/customer/home" element={<Home />} />  
        <Route path="/customer/cart" element={<Cart />} />
        <Route path="/customer/order" element={<Order />} />
        <Route path="/customer/cakemenu" element={<Cakemenu />} />
        <Route path="/customer/cookiemenu" element={<Cookiemenu />} />
        <Route path="/customer/drinkmenu" element={<Drinkmenu />} />

        <Route path="/shop/cake" element={<CakeList />} />  
        <Route path="/shop/cookie" element={<CookieList />} />  
        <Route path="/shop/drink" element={<DrinkList />} />  
        <Route path="/shop/status" element={<Status />} />  
      </Routes>
      {/* Place PopupForm outside Routes to ensure it's always available */}
      <PopupForm />
      </CartProvider>
    </Router>
  );
}

export default App;
