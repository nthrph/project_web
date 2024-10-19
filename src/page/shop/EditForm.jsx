import React, { useState, useRef, useEffect } from 'react'; // เพิ่ม useEffect ที่นี่
import Modal from 'react-modal';
import './EditForm.css'; // ไฟล์ CSS สำหรับจัดรูปแบบฟอร์ม

Modal.setAppElement('#root'); // กำหนด root element สำหรับ Modal

const EditForm = ({ isOpen, onRequestClose, product, onSave }) => { // เพิ่ม onSave ใน props
    const nameRef = useRef();
    const priceRef = useRef();
    const stockRef = useRef();
    const ingredientsRef = useRef(); // เพิ่ม ingredientsRef
    const [category, setCategory] = useState('Cake'); // ตั้งค่าเริ่มต้นเป็น 'Cake'

    // ใช้ useEffect เพื่ออัปเดต category เมื่อ product เปลี่ยนแปลง
    useEffect(() => {
        if (product) {
            setCategory(product.category || 'Cake'); // กำหนด category จาก product หากมี
        }
    }, [product]);

    function handleSave() {
        if (!product) return; // ถ้า product เป็น null จะไม่ทำอะไร
        const updatedProduct = {
            id: product.id, // ต้องส่ง ID ของผลิตภัณฑ์
            name_bakery: nameRef.current.value,
            category,
            ingredients: ingredientsRef.current.value, // ใช้ ingredientsRef
            price: priceRef.current.value,
            quantity: stockRef.current.value,
            img: product.img // หรือให้ผู้ใช้เปลี่ยนก็ได้
        };
        console.log(updatedProduct); // ส่งข้อมูลไปอัปเดต
        onSave(updatedProduct); // เรียกฟังก์ชันที่ส่งมาจาก CakeList
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
                <h2>Edit Menu: {product?.name}</h2> {/* Display product name */}
                <div className="edit-content">
                    <div className="image-section">
                        {product && (
                            <img src={product.img} alt={product.name} className="product-image" />
                        )}
                    </div>
                    <div className="form-section">
                        <label>Name:</label>
                        <input type="text" defaultValue={product?.name} ref={nameRef} />

                        <label>Menu Type:</label>
                        <div className="radio-group">
                            <label>
                                <input type="radio" name="category" value="Cake" checked={category === 'Cake'} onChange={() => setCategory('Cake')} />
                                Cake
                            </label>
                            <label>
                                <input type="radio" name="category" value="Cookie" checked={category === 'Cookie'} onChange={() => setCategory('Cookie')} />
                                Cookie
                            </label>
                            <label>
                                <input type="radio" name="category" value="Drink" checked={category === 'Drink'} onChange={() => setCategory('Drink')} />
                                Drink
                            </label>
                        </div>

                        <label>Price:</label>
                        <input type="number" defaultValue={product?.price} ref={priceRef} />

                        <label>Stock:</label>
                        <input type="number" defaultValue={product?.quantity} ref={stockRef} />

                        <label>Ingredients:</label>
                        <input type="text" defaultValue={product?.ingredients} ref={ingredientsRef} />

                        <div className="form-actions">
                            <button className="save-button" onClick={handleSave}>Save</button>
                            <button className="cancel-button" onClick={onRequestClose}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>

        </Modal>
    );
};

export default EditForm;
