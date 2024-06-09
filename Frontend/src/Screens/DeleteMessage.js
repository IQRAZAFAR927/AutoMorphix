import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

import { useNavigate } from 'react-router-dom';

function Deleteconfirm() {
  // Add a handler for the OK button if needed
  let navigate = useNavigate();
  const handleOkClick = () => {
    // Navigate to another route or perform any other action
    alert('Ok Clicked');
    navigate(-2);
  };

  const handlecancelClick = () => {
    // Navigate to another route or perform any other action
    navigate(-2);

  };

  return (
    <div className="bg-image" style={{
      backgroundImage: 'url("Background.jpeg")', // Replace with your actual background image
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh'
    }}>
      <header className="w-100 text-white text-center py-3 fixed-top" style={{ backgroundColor: '#ac632c' }}>
        <h1>AutoMorphix</h1>
      </header>

      <div className="container d-flex flex-column justify-content-center align-items-center h-100">
        <div className="card border-0" style={{ 
          marginTop: '50px',
          minWidth: '800px',
          minHeight: '60vh',
          backgroundColor: '#c2a794',
          borderRadius: '15px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 0 5px rgba(172,99,44,255), 0 0 5px rgba(172,99,44,255) inset'
        }}>
          {/* Nested container/card for confirmation message */}
          <div className="confirmation-card" style={{
            backgroundColor: '#ac632c', // Light background for the nested card
            padding: '20px',
            borderRadius: '15px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
            textAlign: 'center',
            maxWidth: '400px' // Set a max-width for the nested card
          }}>
            <p className="text-center" style={{ fontSize: '1rem', color: 'White' }}>
            Are you sure you want to remove?
          </p>
          <div className="d-flex justify-content-between" style={{ paddingTop: '20px' }}>
            <button className="btn" onClick={handleOkClick} style={{ fontWeight: 'bold', color: 'white', backgroundColor: '#ac632c' }}>
              OK
            </button>
            {/* Using margin to add space between the buttons */}
            <div style={{ width: '20px' }}></div> {/* This div acts as a spacer */}
            <button className="btn " onClick={handlecancelClick} style={{ fontWeight: 'bold', color: 'white', backgroundColor: '#ac632c' }}>
              Cancel
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Deleteconfirm;
