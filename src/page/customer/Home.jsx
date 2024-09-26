import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CakeList from '../shop/Cake';
import NavBar_customer from '../customer/NavBar_customer';
import { FaEdit } from "react-icons/fa";
import { TbBackground } from 'react-icons/tb';
import ContactSection from '../shop/ContactSection';
import { useNavigate } from 'react-router-dom'; // ใช้ useNavigate สำหรับนำทาง

import homescreen from '../../images/screen2.png';



const Home = () => {
    const [cakes, setCakes] = useState([]);
    const [Cookie, setCookies] = useState([]);
    const [Drink, setDrink] = useState([]);
    const navigate = useNavigate(); // สร้างฟังก์ชัน navigate

    // ดึงข้อมูลเค้กจาก API เมื่อ component ทำงาน
    useEffect(() => {
        axios.get('http://localhost:3001/home_cake')
            .then(response => {
                setCakes(response.data); // เก็บข้อมูลเค้กใน state
            })
            .catch(error => {
                console.error('There was an error fetching the cakes!', error);
            });

        axios.get('http://localhost:3001/cookie')
            .then(response => {
                setCookies(response.data); // เก็บข้อมูลเค้กใน state
            })
            .catch(error => {
                console.error('There was an error fetching the cookie!', error);
            });

        axios.get('http://localhost:3001/drink')
            .then(response => {
                setDrink(response.data); // เก็บข้อมูลเค้กใน state
            })
            .catch(error => {
                console.error('There was an error fetching the drink!', error);
            });
        }, []);

        // ฟังก์ชันเมื่อกดปุ่ม add
        const handleAddToCake = () => {
            navigate('/customer/Cakemenu'); // นำทางไปยังหน้าตะกร้า
        };
        // ฟังก์ชันเมื่อกดปุ่ม add
        const handleAddToCookie = () => {
            navigate('/customer/Cookiemenu'); // นำทางไปยังหน้าตะกร้า
        };
        // ฟังก์ชันเมื่อกดปุ่ม add
        const handleAddToDrink = () => {
            navigate('/customer/Drinkmenu'); // นำทางไปยังหน้าตะกร้า
        };
        



    return (
        <div>
            <NavBar_customer />
            <img src={homescreen} alt="screen2"style={{ width: '100%', height: '500%' }} />

            <div className="cake-container">

                <h1>Cakes</h1>
                <div className="cake-grid">
                    {cakes.map((cake) => (
                        <div key={cake.id} className="cake-card">
                            <img src={cake.image_url} alt={cake.name} className="cake-image" />
                            <p style={{fontWeight:"bold" }}> {cake.name}</p>
                            <p><span style={{fontWeight: "bold"}}>Stock : </span>{cake.quantity}</p>
                            <p className="cake-price">{cake.price} THB</p>
                        </div>
                    ))}
                    {/* <button className="add-button">+</button> */}
                    <button className="add-button" onClick={handleAddToCake}>+</button>
                </div>

                <h1>Cookie</h1>
                <div className="cake-grid">
                    {Cookie.map((Cookie) => (
                        <div key={Cookie.id} className="cake-card">
                            <img src={Cookie.image_url} alt={Cookie.name} className="cake-image" />
                            <p>Name: {Cookie.name}</p>
                            <p>Stock: {Cookie.quantity}</p>
                            <p className="cake-price">{Cookie.price} THB</p>
                        </div>
                    ))}
                    <button className="add-button" onClick={handleAddToCookie}>+</button>
                </div>
                
                <h1>Drink</h1>
                <div className="cake-grid">
                    {Drink.map((Drink) => (
                        <div key={Drink.id} className="cake-card">
                            <img src={Drink.image_url} alt={Drink.name} className="cake-image" />
                            <p>Name: {Drink.name}</p>
                            <p className="cake-price">{Drink.price} THB</p>
                        </div>
                    ))}
                    <button className="add-button" onClick={handleAddToDrink}>+</button>
                </div>
            </div>
                <ContactSection /> 
        </div>

    );
};

export default Home;
