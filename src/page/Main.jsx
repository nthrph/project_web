import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./customer/CartContext";
import './Main.css';

const Main = () => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState(() => {
    return localStorage.getItem('name') || '';
  });
  const [tel, setTel] = useState(() => {
    return localStorage.getItem('tel') || '';
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  
  const { updateCustomerInfo } = useCart();

  useEffect(() => {
    localStorage.setItem('name', name);
    localStorage.setItem('tel', tel);
  }, [name, tel]);

  const handleShoppingClick = () => {
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.trim() === "" || tel.trim() === "") {
      setErrorMessage("Please fill in both fields.");
      return;
    }
    updateCustomerInfo(name, tel);
    
    setSuccessMessage("Data added successfully!");
    navigate("/customer/Home",{ state: { name, tel }});
  };

  const handleStoreClick = () => {
    navigate("/shop/Cake");
  };

  return (
    <div className="background-image">
      <div className="main-container">
        <h1>La Belle Boulangerie</h1>
        {!showForm && (
          <button className="shopping-button" onClick={handleShoppingClick}>
            Shopping
          </button>
        )}

        {showForm && (
          <div className="form-container">
            <h2>Contact</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              /><br />
              <label htmlFor="tel">Tel:</label><br />
              <input
                type="text"
                id="tel"
                name="tel"
                placeholder="Enter your phone number"
                value={tel}
                onChange={(e) => setTel(e.target.value)}
              /><br />
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              {successMessage && <p className="success-message">{successMessage}</p>}
              <button className="submit-button" type="submit">SUBMIT</button>
            </form>
          </div>
        )}
      </div>

      <button className="store-button" onClick={handleStoreClick}>
        Store
      </button>
    </div>
  );
};

export default Main;
