// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './StyleMenu.css';
// import NavBar_component from './NavBar_component';
// import { FaEdit } from "react-icons/fa";
// import ContactSection from './ContactSection';

// const DrinkList = () => {
//     const [Drink, setDrink] = useState([]);

//     // ดึงข้อมูลเค้กจาก API เมื่อ component ทำงาน
//     useEffect(() => {
//         axios.get('http://localhost:5000/api/products_shop/drink')
//             .then(response => {
//                 setDrink(response.data); // เก็บข้อมูลเค้กใน state
//             })
//             .catch(error => {
//                 console.error('There was an error fetching the drink!', error);
//             });
//     }, []);

//     return (
//         <div>
//             <NavBar_component />

//             <div className="cake-container">

//                 <h1>Drink</h1>
//                 <div className="cake-grid">
//                     {Drink.map((Drink) => (
//                         <div key={Drink.id} className="cake-card">
//                             <img src={Drink.img} alt={Drink.name_bakery} className="cake-image" />
//                             <p>Name: {Drink.name_bakery}</p>
//                             <p className="cake-price">{Drink.price} THB</p>
//                             <button className="edit-button"><FaEdit /></button>
//                         </div>
//                     ))}
//                 </div>
//                 <button className="add-button">+</button>
//             </div>
//             <ContactSection />
//         </div>
//     );
// };

// export default DrinkList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StyleMenu.css';
import NavBar_component from './NavBar_component';
import { FaEdit } from "react-icons/fa";
import ContactSection from './ContactSection';
import EditForm from './EditForm';
import AddProductForm from './AddProductForm';

const DrinkList = () => {
    const [drinks, setDrinks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const URL = "http://localhost:5000";

    useEffect(() => {
        axios.get(`${URL}/api/products_shop/drink`)
            .then(response => {
                if (response.data) {
                    setDrinks(response.data);
                }
                setIsLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the drinks!", error);
                setIsLoading(false);
            });
    }, []);

    const openEditForm = (drink) => {
        if (drink) {
            setSelectedProduct(drink);
            setIsEditOpen(true);
        }
    };

    const [isAddFormOpen, setIsAddFormOpen] = useState(false);

    const openAddForm = () => {
        setIsAddFormOpen(true);
    };

    const closeAddForm = () => {
        setIsAddFormOpen(false);
    };

    const handleSaveProduct = (updatedProduct) => {
        axios.put(`${URL}/api/updateproduct/${updatedProduct.id}`, updatedProduct)
            .then((response) => {
                if (response.data.status === "ok") {
                    console.log("Updated product successfully:", updatedProduct);
                    setDrinks(prevDrinks =>
                        prevDrinks.map(drink =>
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
    
    const handleSavenewProduct = (newProduct) => {
        axios.post(`${URL}/api/addeproduct`, newProduct)
            .then(response => {
                if (response.data.status === "ok") {
                    setDrinks(prevDrinks => [...prevDrinks, response.data.product]);
                    setIsAddFormOpen(false); // ปิดฟอร์ม
                }
            })
            .catch(error => {
                console.error("Error adding product", error);
            });
    };

    return (
        <div>
            <NavBar_component />
            <div className="cake-container">
                <h1>Drinks</h1>
                {isLoading ? (
                    <p>Loading drinks...</p>
                ) : (
                    <div className="cake-grid">
                        {drinks.length > 0 ? (
                            drinks.map((drink) => (
                                <div key={drink.id} className="cake-card">
                                    <img src={drink.img} alt={drink.name_bakery} className="cake-image" />
                                    <p style={{ fontWeight: "bold" }}>{drink.name_bakery}</p>
                                    <p><span style={{ fontWeight: "bold" }}>Stock: </span>{drink.quantity}</p>
                                    <p className="cake-price">{drink.price} THB</p>
                                    <button className="edit-button" onClick={() => openEditForm(drink)}> <FaEdit /> </button>
                                </div>
                            ))
                        ) : (
                            <p>No drinks available.</p>
                        )}
                    </div>
                )}
                <button className="add-button" onClick={openAddForm}>+</button>
            </div>

            <EditForm
                isOpen={isEditOpen}
                onRequestClose={() => setIsEditOpen(false)}
                product={selectedProduct}
                onSave={handleSaveProduct}
            />

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
