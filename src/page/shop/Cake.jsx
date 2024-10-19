import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StyleMenu.css';
import NavBar_component from './NavBar_component';
import { FaEdit } from "react-icons/fa";
import ContactSection from './ContactSection';
import EditForm from './EditForm';
import AddProductForm from './AddProductForm';

const CakeList = () => {
    const [cakes, setCakes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

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

    const openEditForm = (cake) => {
        if (cake) {
            setSelectedProduct(cake);
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

                    // ปรับปรุง state ของ cakes ที่นี่
                    setCakes(prevCakes =>
                        prevCakes.map(cake =>
                            cake.id === updatedProduct.id ? { ...cake, ...updatedProduct } : cake
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
            <NavBar_component />
            <div className="cake-container">
                <h1>Cake</h1>
                {isLoading ? (
                    <p>Loading cakes...</p>
                ) : (
                    <div className="cake-grid">
                        {cakes.length > 0 ? (
                            cakes.map((cake) => (
                                <div key={cake.id} className="cake-card">
                                    <img src={cake.img} alt={cake.name_bakery} className="cake-image" />
                                    <p style={{ fontWeight: "bold" }}>{cake.name_bakery}</p>
                                    <p><span style={{ fontWeight: "bold" }}>Stock: </span>{cake.quantity}</p>
                                    <p className="cake-price">{cake.price} THB</p>
                                    <button className="edit-button" onClick={() => openEditForm(cake)}> <FaEdit /> </button>
                                </div>
                            ))
                        ) : (
                            <p>No cakes available.</p>
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

export default CakeList;
