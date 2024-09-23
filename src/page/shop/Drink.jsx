import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CakeList.css';
import NavBar_component from './NavBar_component';
import { FaEdit } from "react-icons/fa";
import ContactSection from './ContactSection';

const DrinkList = () => {
    const [Drink, setDrink] = useState([]);

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

    return (
        <div>
            {/* <NavBar_component /> */}

            <div className="cake-container">

                <h1>Drink</h1>
                <div className="cake-grid">
                    {Drink.map((Drink) => (
                        <div key={Drink.id} className="cake-card">
                            <img src={Drink.image_url} alt={Drink.name} className="cake-image" />
                            <p>Name: {Drink.name}</p>
                            <p>Stock: {Drink.quantity}</p>
                            <p className="cake-price">{Drink.price} THB</p>
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

export default DrinkList;
