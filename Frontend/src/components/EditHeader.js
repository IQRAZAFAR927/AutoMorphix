import React, { useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, Modal, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

function ModifierHeader() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get current location for active link styling

  const handleLogout = () => {
    navigate('/'); // Navigate to the admin page on confirming logout
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
            <div className="navbar-nav mx-auto content-justify" style={{ fontWeight: 'bold' }}>
              <Link to="/modifier_Home" className="nav-link fs-5" style={{ ...navLinkStyle, ...(location.pathname === '/modifier_Home' ||  location.pathname === '/modifier'? { ...navLinkStyle, ...activeLinkStyle } : navLinkStyle) }}>Home</Link>
              <Dropdown>
                <Dropdown.Toggle as={Link} className="nav-link fs-5" 
                 style={{ ...navLinkStyle, ...(location.pathname.includes('/getallmodels') ||
                          location.pathname.includes('/getacceptmodels') ||
                          location.pathname.includes('/getrejectmodels') ? { ...navLinkStyle, ...activeLinkStyle } : navLinkStyle) }}>
                  Models
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/getallmodels">Latest Models</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/getacceptmodels">Accepted Models</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/getrejectmodels">Rejected Models</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Link to="/about_modals" className="nav-link fs-5" style={location.pathname === '/about_modals' ? { ...navLinkStyle, ...activeLinkStyle } : navLinkStyle}>
                About
              </Link>
              <Link to="/Modals_contact" className="nav-link fs-5" style={location.pathname === '/Modals_contact' ? { ...navLinkStyle, ...activeLinkStyle } : navLinkStyle}>
                Contact
              </Link>
            </div>
            <Dropdown alignRight>
              <Dropdown.Toggle as={Link} id="dropdown-profile" style={{ backgroundColor: 'transparent', borderColor: 'transparent' }}>
                <img src="profile_icon.jpg" alt="Profile" style={{ width: '30px', height: '30px' }} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/myprofile_modifier">My Profile</Dropdown.Item>
                <Dropdown.Item onClick={() => setShowLogoutModal(true)}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)} style={{ backgroundColor: 'Red', color: 'white', fontWeight: 'bold' }}>Cancel</Button>
          <Button variant="primary" onClick={handleLogout} style={{ backgroundColor: 'Green', color: 'white', fontWeight: 'bold' }}>OK</Button>
        </Modal.Footer>
      </Modal>
    </header>
  );
}

export default ModifierHeader;
