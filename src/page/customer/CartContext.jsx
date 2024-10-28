import React, { createContext, useState, useContext, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        // Load cart items from localStorage
        const storedCart = localStorage.getItem('cartItems');
        return storedCart ? JSON.parse(storedCart) : [];
    });

    useEffect(() => {
        // Save cart items to localStorage whenever cartItems changes
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(i => i.id === item.id);
            if (existingItem) {
                // If the item exists, increase the quantity
                return prevItems.map(i =>
                    i.id === item.id ? { ...i, quantity: (i.quantity || 1) + (item.quantity || 1) } : i
                );
            }
            // If it doesn't exist, add it
            return [...prevItems, { ...item, quantity: item.quantity || 1 }];
        });
    };

    const removeFromCart = (itemToRemove) => {
        setCartItems((prevItems) => prevItems.filter(item => item.id !== itemToRemove.id));
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems'); // Clear from localStorage as well
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, getTotalPrice }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
