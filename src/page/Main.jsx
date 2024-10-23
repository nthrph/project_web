import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Main.css';

const Main = () => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [tel, setTel] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleShoppingClick = () => {
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ตรวจสอบว่ากรอกข้อมูลครบถ้วนหรือไม่
    if (name.trim() === "" || tel.trim() === "") {
      setErrorMessage("Please fill in both fields.");
      return;
    }

    // ล้างข้อความแจ้งเตือน
    setErrorMessage('');

    // ส่งข้อมูลไปยัง API
    try {
      const response = await fetch("http://localhost:5000/api/addcart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name_customer: name, tel: tel })
      });

      const result = await response.json();
      if (response.ok) {
        setSuccessMessage("Data added successfully!");
        // นำทางไปยัง path /customer/Home
        navigate("/customer/Home");
      } else {
        setErrorMessage(`Failed to submit: ${result.message}`);
      }
    } catch (error) {
      setErrorMessage(`Error: ${error.message}`);
    }
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
              {/* แสดงข้อความเตือนหากกรอกข้อมูลไม่ครบ */}
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              {successMessage && <p className="success-message">{successMessage}</p>}
              <button className="submit-button" type="submit">SUBMIT</button>
            </form>
          </div>
        )}
      </div>

      {/* ปุ่ม Store ที่มุมซ้ายล่าง */}
      <button className="store-button" onClick={handleStoreClick}>
        Store
      </button>
    </div>
  );
};

export default Main;
