import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const storedCart = localStorage.getItem('cartItems');
        return storedCart ? JSON.parse(storedCart) : [];
    });

    const [customerInfo, setCustomerInfo] = useState(() => {
        const storedInfo = localStorage.getItem('customerInfo');
        return storedInfo ? JSON.parse(storedInfo) : { name: '', tel: '' };
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem('customerInfo', JSON.stringify(customerInfo));
    }, [customerInfo]);

    const updateCustomerInfo = (name, tel) => {
        setCustomerInfo({ name, tel });
    };

    const addToCart = (item) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(i => i.id === item.id);
            if (existingItem) {
                return prevItems.map(i =>
                    i.id === item.id ? { ...i, quantity: (i.quantity || 1) + (item.quantity || 1) } : i
                );
            }
            return [...prevItems, { ...item, quantity: item.quantity || 1 }];
        });
    };

    const removeFromCart = (itemToRemove) => {
        setCartItems((prevItems) => prevItems.filter(item => item.id !== itemToRemove.id));
    };

    const clearCart = () => {
        setCartItems([]); 
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
    };

    const OrderAll = async () => {
        const ordersmenu = cartItems.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            note: item.note || ''
        }));

        const { name, tel } = customerInfo;
        const orders = {
            cartItems: ordersmenu,
            customerInfo: { name, tel } 
        };

        try {
            const response = await axios.post('http://localhost:5000/api/addOrders', orders);
            if (response.status === 201) {
                alert('Order placed successfully!');
                console.log(orders);
                clearCart(); 
            }
        } catch (error) {
            console.log(orders);
            console.error("Error placing order:", error.response ? error.response.data : error.message);
            alert("Failed to place order. Please try again.");
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, getTotalPrice, OrderAll, updateCustomerInfo, customerInfo }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
