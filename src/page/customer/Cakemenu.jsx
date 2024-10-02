import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Menu.css';
import { FaEdit } from "react-icons/fa";
import { TbBackground } from 'react-icons/tb';
import ContactSection from '../shop/ContactSection';
import NavBar_customer from '../customer/NavBar_customer';

import { useNavigate } from 'react-router-dom'; // ใช้ useNavigate สำหรับนำทาง

import cakescreen from '../../images/cakescreen.png';


const Cakemenu = () => {
    const [cakes, setCakes] = useState([]);
    const [selectedCake, setSelectedCake] = useState(null); // สำหรับเก็บเค้กที่เลือก
    const navigate = useNavigate(); // สร้างฟังก์ชัน navigate

    const [userName, setUserName] = useState('');
    const [piece, setPiece] = useState(''); // สร้าง state สำหรับเก็บจำนวนสินค้า

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
    // const handleAddToCart = () => {
    //     navigate('/customer/Cart'); // นำทางไปยังหน้าตะกร้า
    // };
    // const handleAddToOrder = () => {
    //     navigate('/customer/Order'); // นำทางไปยังหน้าตะกร้า
    // };
    // ฟังก์ชันสำหรับเลือกเค้กเพื่อแสดง Pop-up
    const handleCakeClick = (cake) => {
        setSelectedCake(cake); // กำหนดเค้กที่เลือก
    };

    // ฟังก์ชันสำหรับปิด Pop-up
    const closeModal = () => {
        setSelectedCake(null); // ล้างเค้กที่เลือกเมื่อปิด
        setPiece(); // รีเซ็ตค่า piece กลับเป็นค่าเริ่มต้น
    };

    const handleNameSubmit = () => {
        axios.post('http://localhost:3001/name', { cakeId: selectedCake.id, name: userName })
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
            <img src={cakescreen} alt="screen2"style={{ width: '100%', height: '500%' }} />
            <div className="menu-container">

                <h1>Cake</h1>
                <div className="menu-grid">
                    {cakes.map((cake) => (
                        <div key={cake.id} className="menu-card" onClick={() => handleCakeClick(cake)}>
                            <img src={cake.image_url} alt={cake.name} className="menu-image" />
                            <p style={{fontWeight:"bold" }}> {cake.name}</p>
                            <p><span style={{fontWeight: "bold"}}>Stock : </span>{cake.quantity}</p>
                            <p className="menu-price">{cake.price} THB</p>
                        </div>
                    ))}
                </div>
            </div>
                <button className="back-button" onClick={handleAddToHome}>Back</button>

                {/* Pop-up */}
                {selectedCake && (
                    <div className="modal" onClick={closeModal}> {/* คลิกพื้นที่ข้างนอกจะปิด pop-up */}
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}> {/* หยุดการปิด pop-up เมื่อคลิกใน pop-up */}
                            <span className="close-button" onClick={closeModal}>&times;</span>
                            <img src={selectedCake.image_url} alt={selectedCake.name} className="modal-image" />
                            
                            <h2>{selectedCake.name}</h2>
                            <p className='stockpop-text'>Stock: {selectedCake.quantity}</p>
                            <p className='pricepop-text'>Price: {selectedCake.price} THB</p>
                            <p className='in-text'>Ingredients: <br/>{selectedCake.ingredients}</p>

                            {/* กล่องใส่จำนวนชิ้น */}
                            <div className="piece-container">
                            <label htmlFor="piece">Piece:</label>
                            <input
                                type="number"
                                id="piece"
                                value={piece}
                                onChange={(e) => setPiece(e.target.value)} // เก็บค่าเมื่อผู้ใช้เปลี่ยน
                                min="1"
                                max={selectedCake.quantity} // จำกัดไม่ให้เกินจำนวนสต็อก
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

export default Cakemenu;

