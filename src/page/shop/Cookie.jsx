import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StyleMenu.css';
import NavBar_component from './NavBar_component';
import { FaEdit } from "react-icons/fa";
import ContactSection from './ContactSection';
import EditForm from './EditForm';
import AddProductForm from './AddProductForm';

const CookieList = () => {
    const [cookies, setCookies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const URL = "http://localhost:5000";

    useEffect(() => {
        axios.get(`${URL}/api/products_shop/cookie`)
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
    }, []);

    const openEditForm = (cookie) => {
        if (cookie) {
            setSelectedProduct(cookie);
            setIsEditOpen(true);
        }
    };

    const [isAddFormOpen, setIsAddFormOpen] = useState(false);

    const openAddForm = () => {
        setIsAddFormOpen(true);
    };

    const closeAddForm = () => {
        setIsAddFormOpen(false);
    };


    const handleSaveProduct = (updatedProduct) => {
        axios.put(`${URL}/api/updateproduct/${updatedProduct.id}`, updatedProduct)
            .then((response) => {
                if (response.data.status === "ok") {
                    // ตรวจสอบผลลัพธ์ที่ได้รับ
                    console.log("Updated product successfully:", updatedProduct);

                    // ปรับปรุง state ของ cookies ที่นี่
                    setCookies(prevCookies =>
                        prevCookies.map(cookie =>
                            cookie.id === updatedProduct.id ? { ...cookie, ...updatedProduct } : cookie
                        )
                    );
                    setIsEditOpen(false); // ปิด Modal
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
                    setCookies(prevCookies => [...prevCookies, response.data.product]);
                    setIsAddFormOpen(false); // ปิดฟอร์ม
                }
            })
            .catch(error => {
                console.error("Error adding product", error);
            });
    };

    return (
        <div>
            <NavBar_component />
            <div className="cake-container">
                <h1>Cookies</h1>
                {isLoading ? (
                    <p>Loading cookies...</p>
                ) : (
                    <div className="cake-grid">
                        {cookies.length > 0 ? (
                            cookies.map((cookie) => (
                                <div key={cookie.id} className="cake-card">
                                    <img src={cookie.img} alt={cookie.name_bakery} className="cake-image" />
                                    <p style={{ fontWeight: "bold" }}>{cookie.name_bakery}</p>
                                    <p><span style={{ fontWeight: "bold" }}>Stock: </span>{cookie.quantity}</p>
                                    <p className="cake-price">{cookie.price} THB</p>
                                    <button className="edit-button" onClick={() => openEditForm(cookie)}> <FaEdit /> </button>
                                </div>
                            ))
                        ) : (
                            <p>No cookies available.</p>
                        )}
                    </div>
                )}
                <button className="add-button" onClick={openAddForm}>+</button>

            </div>

            <EditForm
                isOpen={isEditOpen}
                onRequestClose={() => setIsEditOpen(false)}
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

export default CookieList;
