import React from 'react';
import './Header.css';


function Header() {
  return (
    <div className="header-container">
      <img src={"Background.jpeg"} alt="Background" className="background-img" />
      <div className="content">
        <h1 className="heading">AutoMorphix</h1>
      </div>
    </div>
  );
}

export default Header;
