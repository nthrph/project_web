import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CakeList.css';
import NavBar_component from './NavBar_component';
import { FaEdit } from "react-icons/fa";
import ContactSection from './ContactSection';

const CookieList = () => {
    const [Cookie, setCookies] = useState([]);

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

    return (
        <div>

            <div className="cake-container">

                <h1>Cookie</h1>
                <div className="cake-grid">
                    {Cookie.map((Cookie) => (
                        <div key={Cookie.id} className="cake-card">
                            <img src={Cookie.image_url} alt={Cookie.name} className="cake-image" />
                            <p>Name: {Cookie.name}</p>
                            <p>Stock: {Cookie.quantity}</p>
                            <p className="cake-price">{Cookie.price} THB</p>
                            <button className="edit-button"><FaEdit /></button>
                        </div>
                    ))}
                </div>
                <button className="add-button">+</button>
            </div>
            <ContactSection />
        </div>
    );
};

export default CookieList;
