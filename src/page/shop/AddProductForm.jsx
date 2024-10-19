import React, { useState } from 'react';

const AddProductForm = ({ isOpen, onRequestClose, onSave }) => {
    const [newProduct, setNewProduct] = useState({
        name: '',
        menuType: 'Cake',
        ingredients: '',
        price: '',
        stock: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({
            ...newProduct,
            [name]: value
        });
    };

    const handleSave = () => {
        // เรียกใช้งานฟังก์ชัน onSave
        onSave(newProduct);
        onRequestClose(); // ปิดฟอร์มหลังจากบันทึกข้อมูล
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Add New Menu</h2>
                <form>
                    <div>
                        <label>Name: </label>
                        <input type="text" name="name" value={newProduct.name} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Menu Type: </label>
                        <div>
                            <label><input type="radio" name="menuType" value="Cake" checked={newProduct.menuType === 'Cake'} onChange={handleChange} /> Cake</label>
                            <label><input type="radio" name="menuType" value="Cookie" checked={newProduct.menuType === 'Cookie'} onChange={handleChange} /> Cookie</label>
                            <label><input type="radio" name="menuType" value="Drink" checked={newProduct.menuType === 'Drink'} onChange={handleChange} /> Drink</label>
                        </div>
                    </div>
                    <div>
                        <label>Ingredient: </label>
                        <textarea name="ingredients" value={newProduct.ingredients} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Price: </label>
                        <input type="number" name="price" value={newProduct.price} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Stock: </label>
                        <input type="number" name="stock" value={newProduct.stock} onChange={handleChange} />
                    </div>
                    <button type="button" onClick={handleSave}>Save</button>
                    <button type="button" onClick={onRequestClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default AddProductForm;
