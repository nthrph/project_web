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
    const [selectedDrink, setSelectedDrink] = useState(null); // สำหรับเก็บเค้กที่เลือก
    const navigate = useNavigate(); // สร้างฟังก์ชัน navigate

    const [userName, setUserName] = useState('');
    const [piece, setPiece] = useState(''); // สร้าง state สำหรับเก็บจำนวนสินค้า

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

    // ฟังก์ชันสำหรับเลือกเค้กเพื่อแสดง Pop-up
    const handleDrinkClick = (Drink) => {
        setSelectedDrink(Drink); // กำหนดเค้กที่เลือก
    };

   // ฟังก์ชันปิด Pop-up และรีเซ็ตค่า
    const closeModal = () => {
        setSelectedDrink(null); // ล้างค่าที่เลือกเมื่อปิด Pop-up
        setPiece(); // รีเซ็ตค่า piece กลับเป็นค่าเริ่มต้น (1)
    };

    const handleNameSubmit = () => {
        axios.post('http://localhost:3001/name', { drinkId: selectedDrink.id, name: userName })
            .then(response => {
                console.log(response.data); // ตรวจสอบการตอบกลับจากเซิร์ฟเวอร์
                setUserName(''); // ล้างกล่องข้อความหลังจากส่ง
                closeModal(); // ปิด modal หลังจากส่งข้อความ
            })
            .catch(error => {
                console.error('Error posting name:', error);
            });
    };

    return (
        <div>
            <NavBar_customer />
            <img src={drinkscreen} alt="screen2"style={{ width: '100%', height: '500%' }} />
            <div className="menu-container">
                <h1>Drink</h1>
                <div className="menu-grid">
                    {Drink.map((Drink) => (
                        <div key={Drink.id} className="menu-card" onClick={() => handleDrinkClick(Drink)}>
                            <img src={Drink.image_url} alt={Drink.name} className="menu-image" />
                            <p style={{fontWeight:"bold" }}> {Drink.name}</p>
                            <p><span style={{fontWeight: "bold"}}></span></p>
                            <p className="menu-price">{Drink.price} THB</p>
                        </div>
                    ))}
                </div>
            </div>
            <button className="back-button" onClick={handleAddToHome}>Back</button>
            {/* Pop-up */}
            {selectedDrink && (
                    <div className="modal" onClick={closeModal}> {/* คลิกพื้นที่ข้างนอกจะปิด pop-up */}
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}> {/* หยุดการปิด pop-up เมื่อคลิกใน pop-up */}
                            <span className="close-button" onClick={closeModal}>&times;</span>
                            <img src={selectedDrink.image_url} alt={selectedDrink.name} className="modal-image" />
                            
                            <h2>{selectedDrink.name}</h2>
                            <p className='pricepop-text'>Price: {selectedDrink.price} THB</p>
                            <p className='in-text'>Ingredients: <br/>{selectedDrink.ingredients}</p>

                            {/* กล่องใส่จำนวนชิ้น */}
                            <div className="piece-container">
                            <label htmlFor="piece">Piece:</label>
                            <input
                                type="number"
                                id="piece"
                                value={piece}
                                onChange={(e) => setPiece(e.target.value)} // เก็บค่าเมื่อผู้ใช้เปลี่ยน
                                min="1"
                                className="piece-input"
                            />
                            </div>

                            {/* กดปุ่มส่งไป Database */}
                            <button className="addcart-button" onClick={handleNameSubmit}>ADD TO CART</button>
                            <button className="order-button">ORDER</button>
                        </div>
                    </div>
                )}
            <ContactSection />
        </div>
    );
};

export default Drinkmenu;
