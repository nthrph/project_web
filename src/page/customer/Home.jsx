// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import CakeList from '../shop/Cake';
// import NavBar_customer from '../customer/NavBar_customer';
// import { FaEdit } from "react-icons/fa";
// import { TbBackground } from 'react-icons/tb';
// import ContactSection from '../shop/ContactSection';
// import { useNavigate } from 'react-router-dom'; // ใช้ useNavigate สำหรับนำทาง

import homescreen from '../../images/screen2.png';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../shop/StyleMenu.css';
import '../customer/PopupForm.css';
import './Menu.css';

import NavBar_customer from '../customer/NavBar_customer';
import ContactSection from '../shop/ContactSection';
import PopupForm from '../customer/PopupForm';
import AddProductForm from '../shop/AddProductForm';

// import cakescreen from '../../images/cakescreen.png';
import { useNavigate } from 'react-router-dom'; // ใช้ useNavigate สำหรับนำทาง



const Home = () => {
    const [cakes, setCakes] = useState([]);
    const [cookies, setCookies] = useState([]);
    const [drinks, setDrinks] = useState([]);

    // const [selectedCake, setSelectedCake] = useState(null); // สำหรับเก็บเค้กที่เลือก
    // const [selectedCookie, setSelectedCookie] = useState(null); // สำหรับเก็บเค้กที่เลือก
    // const [selectedDrink, setSelectedDrink] = useState(null); // สำหรับเก็บเค้กที่เลือก
    const [isLoading, setIsLoading] = useState(true);
    const [isPopOpen, setIsPopOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // const [userName, setUserName] = useState('');
    // const [piece, setPiece] = useState(''); // สร้าง state สำหรับเก็บจำนวนสินค้า

    const navigate = useNavigate(); // สร้างฟังก์ชัน navigate
    const URL = "http://localhost:5000";

    // ดึงข้อมูลเค้กจาก API เมื่อ component ทำงาน
    useEffect(() => {
        axios.get(`${URL}/api/products_shop/cakehome`)
            .then(response => {
                if (response.data) {
                    setCakes(response.data);
                }
                setIsLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the cakes!", error);
                setIsLoading(false);
            });
        axios.get(`${URL}/api/products_shop/cookiehome`)
            .then(response => {
                if (response.data) {
                    setCookies(response.data);
                }
                setIsLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the cookies!", error);
                setIsLoading(false);
            });
        axios.get(`${URL}/api/products_shop/drinkhome`)
            .then(response => {
                if (response.data) {
                    setDrinks(response.data);
                }
                setIsLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the drinks!", error);
                setIsLoading(false);
            });
    }, []);

    const openPopupForm = (product) => {
        if (product) {
            setSelectedProduct(product);
            setIsPopOpen(true);
        }
    };

    const [isAddFormOpen, setIsAddFormOpen] = useState(false);

    // const openAddForm = () => {
    //     setIsAddFormOpen(true);
    // };

    const closeAddForm = () => {
        setIsAddFormOpen(false);
    };

    const goToCake = () => {
        navigate('/customer/Cakemenu'); // นำทางไปยังหน้าตะกร้า
    };
    const goToCookie = () => {
        navigate('/customer/Cookiemenu'); // นำทางไปยังหน้าตะกร้า
    };
    const goToDrink = () => {
        navigate('/customer/Drinkmenu'); // นำทางไปยังหน้าตะกร้า
    };


    const handleSaveProduct = (updatedProduct) => {
        axios.put(`${URL}/api/updateproduct/${updatedProduct.id}`, updatedProduct)
            .then((response) => {
                if (response.data.status === "ok") {
                    // ตรวจสอบผลลัพธ์ที่ได้รับ
                    console.log("Updated product successfully:", updatedProduct);

                    setCakes(prevCakes =>
                        prevCakes.map(cake =>
                            cake.id === updatedProduct.id ? { ...cake, ...updatedProduct } : cake
                        )
                    );
                    setIsPopOpen(false); // ปิด Modal
                    setCookies(prevCookies =>
                        prevCookies.map(cookie =>
                            cookie.id === updatedProduct.id ? { ...cookie, ...updatedProduct } : cookie
                        )
                    );
                    // ปรับปรุง state ของ drinks ที่นี่
                    setDrinks(prevDrinks =>
                        prevDrinks.map(drink =>
                            drink.id === updatedProduct.id ? { ...drink, ...updatedProduct } : drink
                        )
                    );
                    setIsPopOpen(false); // ปิด Modal
                }
            })
            .catch(error => {
                console.error("Error updating product", error);
            });
    };
    
    const handleSavenewProduct = (newProduct) => {
        axios.post(`${URL}/api/addeproduct`, newProduct)
            .then(response => {
                if (response.data.status === "ok") {
                    setCakes(prevCakes => [...prevCakes, response.data.product]);
                    setIsAddFormOpen(false); // ปิดฟอร์ม
                }
                if (response.data.status === "ok") {
                    setCookies(prevCookies => [...prevCookies, response.data.product]);
                    setIsAddFormOpen(false); // ปิดฟอร์ม
                }
                if (response.data.status === "ok") {
                    setDrinks(prevDrinks => [...prevDrinks, response.data.product]);
                    setIsAddFormOpen(false); // ปิดฟอร์ม
                }
            })
            .catch(error => {
                console.error("Error adding product", error);
            });
    };
    
    return (
        <div>
            <NavBar_customer />
            <img src={homescreen} alt="screen2"style={{ width: '100%', height: '500%' }} />
            <h1>Cakes</h1>
            <div className="cakehome-grid">
                {cakes.length > 0 ? (
                    cakes.map((cake) => (
                        <div key={cake.id} className="cake-card"onClick={() => openPopupForm(cake)}>
                          <img src={cake.img} alt={cake.name_bakery} className="cake-image" />
                          <p style={{ fontWeight: "bold" }}>{cake.name_bakery}</p>
                          <p><span style={{ fontWeight: "bold" }}>Stock: </span>{cake.quantity}</p>
                          <p className="cake-price">{cake.price} THB</p>
                        </div>
                    ))
                ) : (
                    <p></p>
                )} 
                <button className="add-button" onClick={goToCake}>+</button>
            </div>
            
            <h1>Cookies</h1>
            <div className="cakehome-grid">
                {cookies.length > 0 ? (
                    cookies.map((cookie) => (
                        <div key={cookie.id} className="cake-card"onClick={() => openPopupForm(cookie)}>
                            <img src={cookie.img} alt={cookie.name_bakery} className="cake-image" />
                            <p style={{ fontWeight: "bold" }}>{cookie.name_bakery}</p>
                            <p><span style={{ fontWeight: "bold" }}>Stock: </span>{cookie.quantity}</p>
                            <p className="cake-price">{cookie.price} THB</p>
                        </div>
                    ))
                ) : (
                    <p></p>
                )}
                <button className="add-button" onClick={goToCookie}>+</button>
            </div>

            <h1>Drinks</h1>
            <div className="cakehome-grid">        
                {drinks.length > 0 ? (
                    drinks.map((drink) => (
                        <div key={drink.id} className="cake-card"onClick={() => openPopupForm(drink)}>
                            <img src={drink.img} alt={drink.name_bakery} className="cake-image" />
                            <p style={{ fontWeight: "bold" }}>{drink.name_bakery}</p>
                            <p><span style={{ fontWeight: "bold" }}>Stock: </span>{drink.quantity}</p>
                            <p className="cake-price">{drink.price} THB</p>
                        </div>
                    ))
                ) : (
                    <p></p>
                )}
                <button className="add-button" onClick={goToDrink}>+</button>
            </div>        

            <PopupForm
                isOpen={isPopOpen}
                onRequestClose={() => setIsPopOpen(false)}
                product={selectedProduct}
                onSave={handleSaveProduct}
            />

            <AddProductForm
                isOpen={isAddFormOpen}
                onRequestClose={closeAddForm}
                onSave={handleSavenewProduct}
            />


            <ContactSection />
        </div>
    );
};

export default Home;