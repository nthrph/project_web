import React, { useState, useRef, useEffect } from 'react'; 
import Modal from 'react-modal';
import './EditForm.css'; 

Modal.setAppElement('#root');

const EditForm = ({ isOpen, onRequestClose, product, onSave }) => { 
    const nameRef = useRef();
    const priceRef = useRef();
    const stockRef = useRef();
    const ingredientsRef = useRef();
    const [category, setCategory] = useState('Cake'); 

    useEffect(() => {
        if (product) {
            setCategory(product.category || 'Cake');
            if (nameRef.current) nameRef.current.value = product.name_bakery || "";
            if (priceRef.current) priceRef.current.value = product.price || "";
            if (stockRef.current) stockRef.current.value = product.quantity || "";
            if (ingredientsRef.current) ingredientsRef.current.value = product.ingredients || "";
        }
    }, [product]);

    function handleSave() {
        if (!product) return; 
        const updatedProduct = {
            id: product.id,
            name_bakery: nameRef.current.value,
            category,
            ingredients: ingredientsRef.current.value,
            price: priceRef.current.value,
            quantity: stockRef.current.value,
            img: product.img
        };
        console.log(updatedProduct); 
        onSave(updatedProduct); 
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
                <h2 style={{ fontWeight: "bold" }}>{product?.name_bakery}</h2>
                <div className="edit-content">
                    <div className="image-section">
                        {product && (
                            <img src={product.img} alt={product.name} className="product-image" />
                        )}
                    </div>
                    <div className="form-section">
                        <label>Name:</label>
                        <input type="text" ref={nameRef} defaultValue={product?.name_bakery || ""} />

                        <label>Ingredients:</label>
                        <input type="text" ref={ingredientsRef} defaultValue={product?.ingredients || ""} />

                        <label>Stock:</label>
                        <input type="number" ref={stockRef} defaultValue={product?.quantity || 0} />

                        <label>Price (THB):</label>
                        <input type="number" ref={priceRef} defaultValue={product?.price || 0} />

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

export default EditForm;
