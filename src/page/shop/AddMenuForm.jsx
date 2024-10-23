import React, { useState, useRef } from 'react';
import Modal from 'react-modal';
import './AddMenuForm.css';

Modal.setAppElement('#root');

const AddMenuForm = ({ isOpen, onRequestClose, onSave }) => {
    const nameRef = useRef();
    const priceRef = useRef();
    const stockRef = useRef();
    const ingredientsRef = useRef();
    const imgRef = useRef();
    const [category, setCategory] = useState('Cake');

    function handleSave() {
        const newProduct = {
            name_bakery: nameRef.current.value,
            category: category,  // ตรวจสอบว่า category ถูกส่งอย่างถูกต้อง
            ingredients: ingredientsRef.current.value,
            price: priceRef.current.value,
            quantity: stockRef.current.value ? parseInt(stockRef.current.value) : 0,
            img: imgRef.current.value,
        };
        console.log(newProduct);  // ตรวจสอบค่า category ใน console
        onSave(newProduct);
        onRequestClose();
    }
    
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="edit-modal"
            overlayClassName="modal-overlay"
        >
            <div className="edit-container">
                <h2 style={{ fontWeight: "bold" }}>Add New Menu</h2>
                <div className="edit-content">
                    <div className="form-section">
                        <label>Name:</label>
                        <input type="text" ref={nameRef} placeholder="Enter bakery name" />

                        <label>Ingredients:</label>
                        <input type="text" ref={ingredientsRef} placeholder="Enter ingredients" />

                        <label>Stock:</label>
                        <input type="number" ref={stockRef} placeholder="Enter stock quantity" />


                        <label>Price (THB):</label>
                        <input type="number" ref={priceRef} placeholder="Enter price" />

                        <label>Image URL:</label>
                        <input type="text" ref={imgRef} placeholder="Enter image URL" />

                        <label>Category:</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="Cake">Cake</option>
                            <option value="Cookie">Cookie</option>
                            <option value="Drink">Drink</option>
                            <option value="Other">Other</option>
                        </select>


                        <div className="form-actions">
                            <button className="save-button" onClick={handleSave}>SAVE</button>
                            <button className="cancel-button" onClick={onRequestClose}>CANCEL</button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default AddMenuForm;
