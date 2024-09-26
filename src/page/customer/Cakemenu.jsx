import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Menu.css';
import { FaEdit } from "react-icons/fa";
import { TbBackground } from 'react-icons/tb';
import ContactSection from '../shop/ContactSection';
import NavBar_customer from '../customer/NavBar_customer';

import homescreen from '../../images/cakescreen.png';
import { useNavigate } from 'react-router-dom'; // ใช้ useNavigate สำหรับนำทาง

import cakescreen from '../../images/cakescreen.png';


const Cakemenu = () => {
    const [cakes, setCakes] = useState([]);
    const navigate = useNavigate(); // สร้างฟังก์ชัน navigate

    // ดึงข้อมูลเค้กจาก API เมื่อ component ทำงาน
    useEffect(() => {
        axios.get('http://localhost:3001/cakes')
            .then(response => {
                setCakes(response.data); // เก็บข้อมูลเค้กใน state
            })
            .catch(error => {
                console.error('There was an error fetching the cakes!', error);
            });
    }, []);

    // ฟังก์ชันเมื่อกดปุ่ม add
    const handleAddToHome = () => {
        navigate('/customer/Home'); // นำทางไปยังหน้าตะกร้า
    };

    return (
        <div>
            <img src={cakescreen} alt="screen2"style={{ width: '100%', height: '500%' }} />
            <div className="cake-container">

                <h1>Cake</h1>
                <div className="cake-grid">
                    {cakes.map((cake) => (
                        <div key={cake.id} className="cake-card">
                            <img src={cake.image_url} alt={cake.name} className="cake-image" />
                            <p style={{fontWeight:"bold" }}> {cake.name}</p>
                            <p><span style={{fontWeight: "bold"}}>Stock : </span>{cake.quantity}</p>
                            <p className="cake-price">{cake.price} THB</p>
                        </div>
                    ))}
                </div>
            </div>
                <button className="back-button" onClick={handleAddToHome}>Back</button>
                <ContactSection />
        </div>

    );
};

export default Cakemenu;

