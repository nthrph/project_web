import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../shop/StyleMenu.css';
import '../customer/PopupForm.css';
import './Menu.css';

import NavBar_customer from '../customer/NavBar_customer';
import ContactSection from '../shop/ContactSection';
import PopupForm from '../customer/PopupForm';
import AddProductForm from '../shop/AddProductForm';

import cakescreen from '../../images/cakescreen.png';
import { useNavigate } from 'react-router-dom'; // ใช้ useNavigate สำหรับนำทาง



const Cakemenu = () => {
    const [cakes, setCakes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isPopOpen, setIsPopOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const navigate = useNavigate(); // สร้างฟังก์ชัน navigate

    const URL = "http://localhost:5000";

    useEffect(() => {
        axios.get(`${URL}/api/products_shop/cake`)
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
    }, []);

    const openPopupForm = (cake) => {
        if (cake) {
            setSelectedProduct(cake);
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

                    // ปรับปรุง state ของ cakes ที่นี่
                    setCakes(prevCakes =>
                        prevCakes.map(cake =>
                            cake.id === updatedProduct.id ? { ...cake, ...updatedProduct } : cake
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
            })
            .catch(error => {
                console.error("Error adding product", error);
            });
    };
    
    return (
        <div>
            <NavBar_customer />
            <img src={cakescreen} alt="screen2"style={{ width: '100%', height: '500%' }} />
            <div className="cake-container">
                <h1>Cake</h1>
                {isLoading ? (
                    <p>Loading cakes...</p>
                ) : (
                    <div className="cake-grid">
                        {cakes.length > 0 ? (
                            cakes.map((cake) => (
                                <div key={cake.id} className="cake-card"onClick={() => openPopupForm(cake)}>
                                    <img src={cake.img} alt={cake.name_bakery} className="cake-image" />
                                    <p style={{ fontWeight: "bold" }}>{cake.name_bakery}</p>
                                    <p><span style={{ fontWeight: "bold" }}>Stock: </span>{cake.quantity}</p>
                                    <p className="cake-price">{cake.price} THB</p>
                                    {/* <button className="edit-button" onClick={() => openPopupForm(cake)}> <FaEdit /> </button> */}
                                </div>
                            ))
                        ) : (
                            <p>No cakes available.</p>
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

export default Cakemenu;
