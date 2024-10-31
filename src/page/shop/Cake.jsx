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
    const [isAddFormOpen, setIsAddFormOpen] = useState(false);

    const URL = "http://localhost:5000";

    // โหลดข้อมูลเค้กจากฐานข้อมูล
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

    // เปิดฟอร์มแก้ไข
    const openEditForm = (cake) => {
        if (cake) {
            setSelectedProduct(cake);
            setIsEditOpen(true);
        }
    };

    // เปิดฟอร์มเพิ่มสินค้า
    const openAddForm = () => {
        setIsAddFormOpen(true);
    };

    // ปิดฟอร์มเพิ่มสินค้า
    const closeAddForm = () => {
        setIsAddFormOpen(false);
    };

    // ฟังก์ชันสำหรับบันทึกสินค้าที่แก้ไข
    const handleSaveProduct = (updatedProduct) => {
        axios.put(`${URL}/api/updateproduct/${updatedProduct.id}`, updatedProduct)
            .then((response) => {
                if (response.data.status === "ok") {
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

    // ฟังก์ชันสำหรับบันทึกสินค้าที่เพิ่มใหม่
    const handleSavenewProduct = (newProduct) => {
        console.log("Data sent to backend:", newProduct);  // ตรวจสอบว่า category ถูกส่งไปจริง
        axios.post(`${URL}/api/addeproduct`, {
            name_bakery: newProduct.name,
            category: newProduct.category,  // ตรวจสอบว่า category ถูกส่งไป
            ingredients: newProduct.ingredients,
            price: newProduct.price,
            quantity: newProduct.quantity,
            img: newProduct.img
        })
        .then(response => {
            if (response.data.status === "ok") {
                setCakes(prevCakes => [...prevCakes, response.data.product]);
                setIsAddFormOpen(false);  // ปิดฟอร์ม
            } else {
                alert("Failed to add product. Please try again.");
            }
        })
        .catch(error => {
            console.error("Error adding product", error);
            alert("An error occurred while adding the product.");
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
                            cakes.map((cake, index) => {
                               
                                if (!cake) {
                                    console.warn(`Cake at index ${index} is undefined`); // แจ้งเตือนเมื่อมีค่า undefined
                                    return null; // ข้ามไป
                                }

                                return (
                                    <div key={cake.id} className="cake-card">
                                        <img src={cake.img || "default-image.jpg"} alt={cake.name_bakery || "Cake"} className="cake-image" />
                                        <p style={{ fontWeight: "bold" }}>{cake.name_bakery || "Unnamed Cake"}</p>
                                        <p><span style={{ fontWeight: "bold" }}>Stock: </span>{cake.quantity || 0}</p>
                                        <p className="cake-price">{cake.price ? `${cake.price} THB` : "Price not available"}</p>
                                        <button className="edit-button" onClick={() => openEditForm(cake)}> <FaEdit /> </button>
                                    </div>
                                );
                            })
                        ) : (
                            <p>No cakes available.</p>
                        )}
                    </div>
                )};
                <button className="add-button" onClick={openAddForm}>+</button>
            </div>

            {/* Modal สำหรับแก้ไขสินค้า */}
            <EditForm
                isOpen={isEditOpen}
                onRequestClose={() => setIsEditOpen(false)}
                product={selectedProduct}
                onSave={handleSaveProduct}
            />

            {/* Modal สำหรับเพิ่มสินค้าใหม่ */}
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