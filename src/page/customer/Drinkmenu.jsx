import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../shop/StyleMenu.css';
import '../customer/PopupForm.css';
import './Menu.css';

import NavBar_customer from '../customer/NavBar_customer';
import ContactSection from '../shop/ContactSection';
import PopupForm from '../customer/PopupForm';
import AddProductForm from '../shop/AddProductForm';

import drinkscreen from '../../images/drinkscreen.png';
import { useNavigate } from 'react-router-dom'; // ใช้ useNavigate สำหรับนำทาง



const Drinkmenu = () => {
    const [drinks, setDrinks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isPopOpen, setIsPopOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const navigate = useNavigate(); // สร้างฟังก์ชัน navigate

    const URL = "http://localhost:5000";

    useEffect(() => {
        axios.get(`${URL}/api/products_shop/drink`)
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

    const openPopupForm = (drink) => {
        if (drink) {
            setSelectedProduct(drink);
            setIsPopOpen(true);
        }
    };

    const [isAddFormOpen, setIsAddFormOpen] = useState(false);

    const openAddForm = () => {
        setIsAddFormOpen(true);
    };

    const closeAddForm = () => {
        setIsAddFormOpen(false);
    };

    const handleAddToHome = () => {
        navigate('/customer/Home'); // นำทางไปยังหน้าตะกร้า
    };


    const handleSaveProduct = (updatedProduct) => {
        axios.put(`${URL}/api/updateproduct/${updatedProduct.id}`, updatedProduct)
            .then((response) => {
                if (response.data.status === "ok") {
                    // ตรวจสอบผลลัพธ์ที่ได้รับ
                    console.log("Updated product successfully:", updatedProduct);

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
            <img src={drinkscreen} alt="screen2"style={{ width: '100%', height: '500%' }} />
            <div className="cake-container">
                <h1>Drink</h1>
                {isLoading ? (
                    <p>Loading drinks...</p>
                ) : (
                    <div className="cake-grid">
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
                            <p>No drinks available.</p>
                        )}
                    </div>
                )}
                <button className="back-button" onClick={handleAddToHome}>Back</button>

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

export default Drinkmenu;