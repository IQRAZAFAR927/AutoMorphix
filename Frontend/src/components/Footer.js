import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Footer() {
  return (
    <footer className="text-center text-white py-3" style={{ backgroundColor: 'grey' }}>
      <div className="container">
        <div className="text-center mb-3">
          <strong>AUTOMORPHIX</strong>
        </div>
        <div className="d-flex justify-content-center align-items-center my-2">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="mx-3" style={{ cursor: 'pointer', color:'white' }}>
            <i className="bi bi-facebook"></i>
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="mx-3" style={{ cursor: 'pointer', color:'white' }}>
            <i className="bi bi-instagram"></i>
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="mx-3" style={{ cursor: 'pointer' ,color:'white'}}>
            <i className="bi bi-youtube"></i>
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="mx-3" style={{ cursor: 'pointer', color:'white' }}>
            <i className="bi bi-twitter"></i>
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="mx-3" style={{ cursor: 'pointer' , color:'white'}}>
            <i className="bi bi-linkedin"></i>
          </a>
          <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" className="mx-3" style={{ cursor: 'pointer' , color:'white'}}>
            <i className="bi bi-tiktok"></i>
          </a>
        </div>
        <hr style={{ borderTop: '1px solid #fff' }} />
        <div className="text-center mt-2">
          <span>© 2024 AutoMorphix, Inc. All rights reserved.</span> | <a href="#" className="text-white" style={{ textDecoration: 'none' }}>Legal Stuff</a> 
        </div>
      </div>
    </footer>
  );
}

export default Footer;
