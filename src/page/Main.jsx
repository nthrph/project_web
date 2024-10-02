import React, { useState } from 'react';
import { FaEdit, FaHome, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // นำเข้า useNavigate สำหรับการนำทาง
import mainscreen from '../images/mainscreen.png'; // นำเข้ารูปภาพ
import './Main.css'; // นำเข้าไฟล์ CSS

const Main = () => {
    const [Name, setName] = useState('');
    const [Phone, setPhone] = useState('');
    const [selectedLogin, setSelectedLogin] = useState(false);
    const navigate = useNavigate();

    const handleShoppingClick = () => {
        setSelectedLogin(true);
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        if (Name.trim() === '') {
            alert('Please Enter your Name');
            return;
        }
        if (Phone.trim() === '') {
            alert('Please Enter your Phone Number');
            return;
        }

        console.log('ข้อมูลที่ถูกส่ง:', Name, Phone);
        navigate('/customer/Home');
    };

    const closeModal = () => {
        setSelectedLogin(false);
        setName('');
    };

    const handleStoreClick = () => {
        navigate('/shop/Status');
    };
    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
            {/* ภาพที่ใช้เป็นพื้นหลัง */}
            <img 
                src={mainscreen} 
                alt="screen2" 
                className="background-img" 
            />

            {/* ปุ่ม Shopping */}
            <button 
                className="shopping-button"
                onClick={handleShoppingClick}
            >
                <FaShoppingCart /> Shopping
            </button>

            {/* ปุ่ม Store */}
            <button 
                className="store-button"
                onClick={handleStoreClick}
            >
                <FaHome /> Store
            </button>

            {/* Pop-up */}
            {selectedLogin && (
                <div className="modal" onClick={closeModal}>
                    <div className="modal-contentM" onClick={(e) => e.stopPropagation()}>
                        <span className="close-button" onClick={closeModal}>&times;</span>
                        
                        {/* ฟอร์มสำหรับกรอก */}
                        <form onSubmit={handleSubmit}>
                            <h1> Contact</h1>
                            <label htmlFor="name">Name : </label>
                            <input 
                                type="text" 
                                id="name" 
                                value={Name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your Name"
                            /><br/>

                            <label htmlFor="phone">Tel : </label>
                            <input 
                                type="text" 
                                id="phone" 
                                value={Phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Enter your Phone Number"
                            />
                            
                            {/* ปุ่ม Submit */}
                            <button type="submit">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Main;
//     return (
//         <div style={{ position: 'relative', width: '100%', height: '100vh' }}> {/* ตั้ง height เป็น 100vh เพื่อให้เต็มหน้าจอ */}
//             {/* ภาพที่ใช้เป็นพื้นหลัง */}
//             <img 
//                 src={mainscreen} 
//                 alt="screen2" 
//                 style={{ 
//                     width: '100%', 
//                     height: '100%', 
//                     objectFit: 'cover', 
//                     position: 'absolute',
//                     top: 0,
//                     left: 0
//                 }} 
//             />

//             {/* ปุ่มที่ทับบนภาพ */}
//             <button 
//                 style={{ 
//                     position: 'absolute', 
//                     top: '50%', 
//                     left: '50%', 
//                     transform: 'translate(-50%, -50%)', 
//                     padding: '10px 20px', 
//                     fontSize: '32px',
//                     backgroundColor: '#885035', 
//                     color: 'white', 
//                     border: 'none', 
//                     borderRadius: '5px',
//                     cursor: 'pointer'
//                 }}
//                 onClick={handleShoppingClick} // เพิ่ม onClick เพื่อเรียกฟังก์ชัน handleShoppingClick
//             >
//                 <FaShoppingCart /> Shopping
//             </button>

//             <button 
//                 style={{ 
//                     position: 'absolute', 
//                     top: '90%', 
//                     left: '10%', 
//                     transform: 'translate(-50%, -50%)', 
//                     padding: '10px 20px', 
//                     fontSize: '32px',
//                     backgroundColor: '#565B3C', 
//                     color: 'white', 
//                     border: 'none', 
//                     borderRadius: '5px',
//                     cursor: 'pointer'
//                 }}
//                 onClick={handleStoreClick} // เพิ่ม onClick เพื่อเรียกฟังก์ชัน handleStoreClick
//             >
//                 <FaHome /> Store
//             </button>

//             {/* Pop-up */}
//             {selectedLogin && (
//                     <div className="modal" onClick={closeModal}> {/* คลิกพื้นที่ข้างนอกจะปิด pop-up */}
//                         <div className="modal-content" onClick={(e) => e.stopPropagation()}> {/* หยุดการปิด pop-up เมื่อคลิกใน pop-up */}
//                             <span className="close-button" onClick={closeModal}>&times;</span>
//                         </div>
//                     </div>
//                 )}

//         </div>
//     );
// };

// export default Main;
