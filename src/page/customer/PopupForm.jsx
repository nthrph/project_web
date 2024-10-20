import React, { useState, useEffect } from 'react'; 
import Modal from 'react-modal';
import './PopupForm.css'; 

Modal.setAppElement('#root');

const PopupForm = ({ isOpen, onRequestClose, product, onSave }) => { 
    const [quantity, setQuantity] = useState(1); // เก็บจำนวนสินค้าที่ผู้ใช้เลือก

    useEffect(() => {
        if (product) {
            setQuantity(1); // รีเซ็ตค่าเริ่มต้นเป็น 1 ทุกครั้งที่เปลี่ยนสินค้า
        }
    }, [product]);

    function handleSave() {
        if (!product) return; 
        const updatedProduct = {
            id: product.id,
            name_bakery: product.name_bakery,
            price: product.price,
            quantity, // จำนวนสินค้าที่ผู้ใช้เลือก
            img: product.img
        };
        onSave(updatedProduct); // ส่งข้อมูลไปยังฟังก์ชัน onSave
        onRequestClose(); // ปิด Modal
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="edit-modal"
            overlayClassName="modal-overlay"
        >
            <div className="edit-container">
                <h2 style={{ fontWeight: "bold" }}>{product?.name_bakery}</h2>
                <div className="edit-content">
                    <div className="image-section">
                        {product && (
                            <img src={product.img} alt={product.name_bakery} className="product-image" />
                        )}
                    </div>
                    <div className="form-section">
                        <p><strong>Ingredients:</strong> {product?.ingredients}</p>
                        <p><strong>Stock:</strong> {product?.quantity}</p>
                        <p><strong className="cake-price">{product?.price} THB</strong> </p>

                        <label>Piece:</label>
                        <input 
                            type="number" 
                            min="0" 
                            max={product?.quantity || 1} 
                            value={quantity} 
                            onChange={(e) => setQuantity(e.target.value)} 
                        />

                        <div className="form-actions">
                            <button className="save-button" onClick={handleSave}>ADD TO CART</button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default PopupForm;