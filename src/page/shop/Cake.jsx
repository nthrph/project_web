import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CakeList.css';
import NavBar_component from './NavBar_component';
import { FaEdit } from "react-icons/fa";
import { TbBackground } from 'react-icons/tb';
import ContactSection from './ContactSection';

const CakeList = () => {
    const [cakes, setCakes] = useState([]);

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

    return (
        <div>
            {/* <NavBar_component /> */}

            <div className="cake-container">

                <h1>Cake</h1>
                <div className="cake-grid">
                    {cakes.map((cake) => (
                        <div key={cake.id} className="cake-card">
                            <img src={cake.image_url} alt={cake.name} className="cake-image" />
                            <p style={{fontWeight:"bold" }}> {cake.name}</p>
                            <p><span style={{fontWeight: "bold"}}>Stock : </span>{cake.quantity}</p>
                            <p className="cake-price">{cake.price} THB</p>
                            <button className="edit-button"> <FaEdit /> </button>
                        </div>
                    ))}
                </div>
                <button className="add-button">+</button>
            </div>
                <ContactSection />
        </div>

    );
};

export default CakeList;
