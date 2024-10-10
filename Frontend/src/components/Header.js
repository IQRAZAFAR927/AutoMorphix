import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { useLocation } from 'react-router-dom'; // Import useLocation
import { Dropdown, Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  const location = useLocation(); // Get current location

  // Inline styles for buttons, including transitions
  const buttonBaseStyle = {
    padding: '10px 20px',
    borderRadius: '20px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    backgroundColor: '#1e526b',
    color: 'white',
    fontFamily: '"Poppins", sans-serif' // Add custom font here
  };

  const buttonBaseStyleLogin = {
    padding: '10px 20px',
    borderRadius: '20px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    color: 'white',
    fontFamily: 'Black 900' // Add custom font here
  };

  // Style for active link
  const activeLinkStyle = {
    color: '#1e526b', // Tomato color for demonstration
    borderBottom: '3px solid #1e526b',
    fontWeight: 'bold'
  };

  // Style for navigation links
  const navLinkStyle = {
    margin: '0 20px', // Adjust the space between links
    fontSize: '1.2rem', // Font size
    fontFamily: '"Poppins", sans-serif', // Add your custom font here
    color: '#000', // Default color
    transition: 'color 0.3s ease' // Smooth color transition
  };

  return (
    <header className="bg-light" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000 }}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light py-0">
        <div className="container-fluid">
          <Link to="/admin" className="navbar-brand d-flex align-items-center ms-3" style={{ fontWeight: 'bold' }}>
            <img src="logo3.png" alt="Logo" style={{ height: '70px', marginRight: '15px' }} />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-center">
            <div className="navbar-nav mx-auto" style={{ fontWeight: 'bold' }}>
              <Link to="/" className="nav-link fs-5" style={location.pathname === '/' ? { ...navLinkStyle, ...activeLinkStyle } : navLinkStyle}>
                Home
              </Link>
              <Link to="/aboutus" className="nav-link fs-5" style={location.pathname === '/aboutus' ? { ...navLinkStyle, ...activeLinkStyle } : navLinkStyle}>
                About
              </Link>
              <Link to="/contactus" className="nav-link fs-5" style={location.pathname === '/contactus' ? { ...navLinkStyle, ...activeLinkStyle } : navLinkStyle}>
                Contact
              </Link>
            </div>
            <div className="navbar-nav">
              <Link to="/signup" className="btn btn-outline-dark mx-2" style={buttonBaseStyle}
                onMouseEnter={e => { e.target.style.transform = 'scale(1.1)'; e.target.style.boxShadow = '0 0 15px #000'; }}
                onMouseLeave={e => { e.target.style.transform = 'none'; e.target.style.boxShadow = 'none'; }}>
                Signup
              </Link>
              <Link to="/login" className="btn btn-secondary shadow" style={buttonBaseStyleLogin}
                onMouseEnter={e => { e.target.style.transform = 'scale(1.1)'; e.target.style.boxShadow = '0 0 15px #000'; }}
                onMouseLeave={e => { e.target.style.transform = 'none'; e.target.style.boxShadow = 'none'; }}>
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
