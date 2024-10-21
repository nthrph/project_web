import React, { useState, useEffect } from 'react'; 
import Modal from 'react-modal';
import axios from 'axios'; 
import './PopupForm.css'; 

Modal.setAppElement('#root');

const PopupForm = ({ isOpen, onRequestClose, product, onSave }) => { 
    const [quantity, setQuantity] = useState(1); // Track the selected quantity

    useEffect(() => {
        if (product) {
            setQuantity(1); // Reset to 1 each time a new product is selected
        }
    }, [product]);

    async function handleSave() {
        if (!product) return;
    
        // Check if the quantity exceeds stock
        if (quantity > product.quantity) {
            alert('The quantity exceeds the available stock. Please enter a valid amount.');
            return;
        }
    
        const updatedProduct = {
            name: product.name_bakery,
            ingredients: product.ingredients,
            price: product.price,
            piece: quantity,
            img_url: product.img
        };
    
        try {
            // Send data to the backend to add the product to the cart
            await axios.post('http://localhost:5000/menu/save', updatedProduct);
            
            // Deduct the quantity from the stock on the frontend
            const newStock = product.quantity - quantity;
            product.quantity = newStock;
    
            // Update stock in the backend
            await axios.post('http://localhost:5000/menu/update-stock', {
                id: product.id,
                newStock: newStock
            });
    
            onSave(updatedProduct);
    
            onRequestClose();  
        } catch (error) {
            console.error('Error saving product to the database', error);
        }
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
                            onChange={(e) => setQuantity(parseInt(e.target.value))} 
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
