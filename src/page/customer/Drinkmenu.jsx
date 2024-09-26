import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Menu.css';
import NavBar_customer from '../customer/NavBar_customer';
import { FaEdit } from "react-icons/fa";
import ContactSection from '../shop/ContactSection';

import homescreen from '../../images/drinkscreen.png';
import { useNavigate } from 'react-router-dom'; // ใช้ useNavigate สำหรับนำทาง

import drinkscreen from '../../images/drinkscreen.png';


const Drinkmenu = () => {
    const [Drink, setDrink] = useState([]);
    const navigate = useNavigate(); // สร้างฟังก์ชัน navigate

    // ดึงข้อมูลเค้กจาก API เมื่อ component ทำงาน
    useEffect(() => {
        axios.get('http://localhost:3001/drink')
            .then(response => {
                setDrink(response.data); // เก็บข้อมูลเค้กใน state
            })
            .catch(error => {
                console.error('There was an error fetching the drink!', error);
            });
    }, []);

    // ฟังก์ชันเมื่อกดปุ่ม add
    const handleAddToHome = () => {
        navigate('/customer/Home'); // นำทางไปยังหน้าตะกร้า
    };

    return (
        <div>
            <img src={drinkscreen} alt="screen2"style={{ width: '100%', height: '500%' }} />
            <div className="cake-container">
                <h1>Drink</h1>
                <div className="cake-grid">
                    {Drink.map((Drink) => (
                        <div key={Drink.id} className="cake-card">
                            <img src={Drink.image_url} alt={Drink.name} className="cake-image" />
                            <p>Name: {Drink.name}</p>
                            <p className="cake-price">{Drink.price} THB</p>
                        </div>
                    ))}
                </div>
            </div>
            <button className="back-button" onClick={handleAddToHome}>Back</button>
            <ContactSection />
        </div>
    );
};

export default Drinkmenu;
