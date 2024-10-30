import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom'; 
import { CartContext } from './CartContext';
import './PopupForm.css';

Modal.setAppElement('#root');

const PopupForm = ({ isOpen, onRequestClose, product }) => { 
    const [quantity, setQuantity] = useState(1);
    const [note, setNote] = useState('');
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate(); 

    useEffect(() => {
        if (product) {
            setQuantity(1);
        }
    }, [product]);

    async function handleSave() {
        if (!product) return;

        if (quantity > product.quantity) {
            alert('The quantity exceeds the available stock. Please enter a valid amount.');
            return;
        }

        const updatedProduct = {
            id: product.id, // Ensure the product has an id
            name: product.name_bakery,
            ingredients: product.ingredients,
            price: product.price,
            quantity: quantity, // Set the quantity for cart
            img: product.img,
            stock: product.quantity,
            note:note

        };

        addToCart(updatedProduct);
        onRequestClose(); 
        navigate('/customer/cart'); // Update the route to match your routes
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
                            min="1" 
                            max={product?.quantity || 1} 
                            value={quantity} 
                            onChange={(e) => setQuantity(parseInt(e.target.value))} 
                        />
                        <label>Note:</label><input type="text-ed" value={note} 
                            onChange={(e) => setNote(e.target.value)} >
                            </input>

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
