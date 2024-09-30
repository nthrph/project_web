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
    const [Cake, setCakes] = useState([]);
    const [Cookie, setCookies] = useState([]);
    const [Drink, setDrink] = useState([]);

    const [selectedCake, setSelectedCake] = useState(null); // สำหรับเก็บเค้กที่เลือก
    const [selectedCookie, setSelectedCookie] = useState(null); // สำหรับเก็บเค้กที่เลือก
    const [selectedDrink, setSelectedDrink] = useState(null); // สำหรับเก็บเค้กที่เลือก

    const [userName, setUserName] = useState('');
    const [piece, setPiece] = useState(1); // สร้าง state สำหรับเก็บจำนวนสินค้า

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

        axios.get('http://localhost:3001/home_cookie')
            .then(response => {
                setCookies(response.data); // เก็บข้อมูลเค้กใน state
            })
            .catch(error => {
                console.error('There was an error fetching the cookie!', error);
            });

        axios.get('http://localhost:3001/home_drink')
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
        // ฟังก์ชันสำหรับเลือกเค้กเพื่อแสดง Pop-up
        const handleCookieClick = (Cookie) => {
            setSelectedCookie(Cookie); // กำหนดเค้กที่เลือก
        };
        // ฟังก์ชันสำหรับเลือกเค้กเพื่อแสดง Pop-up
        const handleDrinkClick = (Drink) => {
            setSelectedDrink(Drink); // กำหนดเค้กที่เลือก
        };

        // ฟังก์ชันสำหรับปิด Pop-up
        const closeModal = () => {
            setSelectedCake(null);
            setSelectedCookie(null);
            setSelectedDrink(null); // ล้างเค้กที่เลือกเมื่อปิด
        };

        const handleNameSubmit = () => {
            axios.post('http://localhost:3001/name', { cookieId: selectedCookie.id, name: userName })
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
            <img src={homescreen} alt="screen2"style={{ width: '100%', height: '500%' }} />

            <div className="menu-container">

                <h1>Cakes</h1>
                <div className="menu-grid">
                    {Cake.map((cake) => (
                        <div key={cake.id} className="menu-card"onClick={() => handleCakeClick(cake)}>
                            <img src={cake.image_url} alt={cake.name} className="menu-image" />
                            <p style={{fontWeight:"bold" }}> {cake.name}</p>
                            <p><span style={{fontWeight: "bold"}}>Stock : </span>{cake.quantity}</p>
                            <p className="menu-price">{cake.price} THB</p>
                        </div>
                    ))}
                    <button className="add-button" onClick={handleAddToCake}>+</button>
                </div>

                <h1>Cookie</h1>
                <div className="menu-grid">
                    {Cookie.map((Cookie) => (
                        <div key={Cookie.id} className="menu-card" onClick={() => handleCookieClick(Cookie)}>
                            <img src={Cookie.image_url} alt={Cookie.name} className="menu-image" />
                            <p style={{fontWeight:"bold" }}> {Cookie.name}</p>
                            <p><span style={{fontWeight: "bold"}}>Stock : </span>{Cookie.quantity}</p>
                            <p className="menu-price">{Cookie.price} THB</p>

                        </div>
                    ))}
                    <button className="add-button" onClick={handleAddToCookie}>+</button>
                </div>
                
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
                    <button className="add-button" onClick={handleAddToDrink}>+</button>
                </div>
            </div>

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
                                max={selectedCake.piece} // จำกัดไม่ให้เกินจำนวนสต็อก
                                className="piece-input"
                            />
                            </div>
                            {/* กล่องข้อความสำหรับผู้ใช้ป้อนคอมเมนต์ */}
                            <p>Name:
                                <textarea
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    placeholder="Enter your Name here..."
                                    rows="5" // ปรับจำนวนแถวตามต้องการ
                                    cols="50" // ปรับจำนวนคอลัมน์ตามต้องการ
                                    // className="user-comment-box"
                                />
                            </p>

                            {/* กดปุ่มส่งไป Database */}
                            <button className="addcart-button" onClick={handleNameSubmit}>ADD TO CART</button>
                            <button className="order-button">ORDER</button>
                        </div>
                    </div>
                )}
            {selectedCookie && (
                    <div className="modal" onClick={closeModal}> {/* คลิกพื้นที่ข้างนอกจะปิด pop-up */}
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}> {/* หยุดการปิด pop-up เมื่อคลิกใน pop-up */}
                            <span className="close-button" onClick={closeModal}>&times;</span>
                            <img src={selectedCookie.image_url} alt={selectedCookie.name} className="modal-image" />
                            <h2>{selectedCookie.name}</h2>
                            <p className='stockpop-text'>Stock: {selectedCookie.quantity}</p>
                            <p className='pricepop-text'>Price: {selectedCookie.price} THB</p>
                            <p className='in-text'>Ingredients: <br/>{selectedCookie.ingredients}</p>

                            {/* กล่องใส่จำนวนชิ้น */}
                            <div className="piece-container">
                            <label htmlFor="piece">Piece:</label>
                            <input
                                type="number"
                                id="piece"
                                value={piece}
                                onChange={(e) => setPiece(e.target.value)} // เก็บค่าเมื่อผู้ใช้เปลี่ยน
                                min="1"
                                max={selectedCookie.piece} // จำกัดไม่ให้เกินจำนวนสต็อก
                                className="piece-input"
                            />
                            </div>

                            {/* กล่องข้อความสำหรับผู้ใช้ป้อนคอมเมนต์ */}
                            <p>Name:
                                <textarea
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    placeholder="Enter your Name here..."
                                    rows="5" // ปรับจำนวนแถวตามต้องการ
                                    cols="50" // ปรับจำนวนคอลัมน์ตามต้องการ
                                    // className="user-comment-box"
                                />
                            </p>

                            {/* กดปุ่มส่งไป Database */}
                            <button className="addcart-button" onClick={handleNameSubmit}>ADD TO CART</button>
                            <button className="order-button">ORDER</button>
                        </div>
                    </div>
                )}
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
                                max={selectedDrink.piece} // จำกัดไม่ให้เกินจำนวนสต็อก
                                className="piece-input"
                            />
                            </div>

                            {/* กล่องข้อความสำหรับผู้ใช้ป้อนคอมเมนต์ */}
                            <p>Name:
                                <textarea
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    placeholder="Enter your Name here..."
                                    rows="5" // ปรับจำนวนแถวตามต้องการ
                                    cols="50" // ปรับจำนวนคอลัมน์ตามต้องการ
                                    // className="user-comment-box"
                                />
                            </p>

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

export default Home;
