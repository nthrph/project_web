import React from 'react';
import { FaEdit, FaHome, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // นำเข้า useNavigate สำหรับการนำทาง
import mainscreen from '../images/mainscreen.png'; // นำเข้ารูปภาพ

const Main = () => {
    const navigate = useNavigate(); // สร้างฟังก์ชัน navigate

    // ฟังก์ชันที่ถูกเรียกเมื่อกดปุ่ม Shopping
    const handleShoppingClick = () => {
        navigate('/customer/Home'); // นำทางไปที่หน้า Home
    };

    // ฟังก์ชันที่ถูกเรียกเมื่อกดปุ่ม Store
    const handleStoreClick = () => {
        navigate('/shop/Status'); // นำทางไปที่หน้า Status
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh' }}> {/* ตั้ง height เป็น 100vh เพื่อให้เต็มหน้าจอ */}
            {/* ภาพที่ใช้เป็นพื้นหลัง */}
            <img 
                src={mainscreen} 
                alt="screen2" 
                style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover', 
                    position: 'absolute',
                    top: 0,
                    left: 0
                }} 
            />

            {/* ปุ่มที่ทับบนภาพ */}
            <button 
                style={{ 
                    position: 'absolute', 
                    top: '50%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)', 
                    padding: '10px 20px', 
                    fontSize: '32px',
                    backgroundColor: '#885035', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
                onClick={handleShoppingClick} // เพิ่ม onClick เพื่อเรียกฟังก์ชัน handleShoppingClick
            >
                <FaShoppingCart /> Shopping
            </button>

            <button 
                style={{ 
                    position: 'absolute', 
                    top: '90%', 
                    left: '10%', 
                    transform: 'translate(-50%, -50%)', 
                    padding: '10px 20px', 
                    fontSize: '32px',
                    backgroundColor: '#565B3C', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
                onClick={handleStoreClick} // เพิ่ม onClick เพื่อเรียกฟังก์ชัน handleStoreClick
            >
                <FaHome /> Store
            </button>

        </div>
    );
};

export default Main;
