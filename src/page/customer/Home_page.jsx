import React from 'react';
import homescreen from '../../images/screen2.png';
import cake1 from '../../images/c1.png';
import cake2 from '../../images/c2.png';
import cake3 from '../../images/c3.png';

import '../../page/style/Home.css';


const Home = () => {
  return (
    <div>
      <img src={homescreen} alt="screen2"style={{ width: '100%', height: '500%' }} />
      <h1 className="h1">Cake</h1>
      <div className="image-container">
        <img src={cake1} alt="screen2" className="smaller-image" />
        <img src={cake2} alt="screen2" className="smaller-image" />
        <img src={cake3} alt="screen2" className="smaller-image" />
      </div>
      
    </div>
  );
};

export default  Home