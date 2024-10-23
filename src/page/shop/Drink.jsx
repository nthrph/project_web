import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StyleMenu.css';
import NavBar_component from './NavBar_component';
import { FaEdit } from "react-icons/fa";
import ContactSection from './ContactSection';
import EditForm from './EditForm';
import AddProductForm from './AddProductForm';

const DrinkList = () => {
    const [drink, setDrinks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isAddFormOpen, setIsAddFormOpen] = useState(false);

    const URL = "http://localhost:5000";

    // โหลดข้อมูลเค้กจากฐานข้อมูล
    useEffect(() => {
        axios.get(`${URL}/api/products_shop/drink`)
            .then(response => {
                if (response.data) {
                    setDrinks(response.data);
                }
                setIsLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the drink!", error);
                setIsLoading(false);
            });
    }, []);

    // เปิดฟอร์มแก้ไข
    const openEditForm = (drink) => {
        if (drink) {
            setSelectedProduct(drink);
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
                    setDrinks(prevCakes =>
                        prevCakes.map(drink =>
                            drink.id === updatedProduct.id ? { ...drink, ...updatedProduct } : drink
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
        axios.post(`${URL}/api/addproduct`, {
            name_bakery: newProduct.name,
            category: newProduct.category,  // ตรวจสอบว่า category ถูกส่งไป
            ingredients: newProduct.ingredients,
            price: newProduct.price,
            quantity: newProduct.quantity,
            img: newProduct.img
        })
        .then(response => {
            if (response.data.status === "ok") {
                setDrinks(prevCakes => [...prevCakes, response.data.product]);
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
                <h1>Drink</h1>
                {isLoading ? (
                    <p>Loading cakes...</p>
                ) : (
                    <div className="cake-grid">
                        {drink.length > 0 ? (
                            drink.map((drink) => (
                                <div key={drink.id} className="cake-card">
                                    <img src={drink.img} alt={drink.name_bakery} className="cake-image" />
                                    <p style={{ fontWeight: "bold" }}>{drink.name_bakery}</p>
                                    <p><span style={{ fontWeight: "bold" }}>Stock: </span>{drink.quantity}</p>
                                    <p className="cake-price">{drink.price} THB</p>
                                    <button className="edit-button" onClick={() => openEditForm(drink)}> <FaEdit /> </button>
                                </div>
                            ))
                        ) : (
                            <p>No drink available.</p>
                        )}
                    </div>
                )}
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

export default DrinkList;
