import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Menu.css';
import NavBar_customer from '../customer/NavBar_customer';
import { FaEdit } from "react-icons/fa";
import ContactSection from '../shop/ContactSection';

import homescreen from '../../images/cookiescreen.png';
import { useNavigate } from 'react-router-dom'; // ใช้ useNavigate สำหรับนำทาง

import cookiescreen from '../../images/cookiescreen.png';



const Cookiemenu = () => {
    const [Cookie, setCookies] = useState([]);
    const navigate = useNavigate(); // สร้างฟังก์ชัน navigate

    // ดึงข้อมูลเค้กจาก API เมื่อ component ทำงาน
    useEffect(() => {
        axios.get('http://localhost:3001/cookie')
            .then(response => {
                setCookies(response.data); // เก็บข้อมูลเค้กใน state
            })
            .catch(error => {
                console.error('There was an error fetching the cookie!', error);
            });
    }, []);

    // ฟังก์ชันเมื่อกดปุ่ม add
    const handleAddToHome = () => {
        navigate('/customer/Home'); // นำทางไปยังหน้าตะกร้า
    };

    return (
        <div>
            <img src={cookiescreen} alt="screen2"style={{ width: '100%', height: '500%' }} />
            <div className="cake-container">
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
                </div>
            </div>
            <button className="back-button" onClick={handleAddToHome}>Back</button>
            <ContactSection />
        </div>
    );
};

export default Cookiemenu;
