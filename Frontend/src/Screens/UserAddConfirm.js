import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
// import { Alert } from 'bootstrap';
import { useNavigate } from 'react-router-dom';

function Userconfirm() {

    let navigate= useNavigate();

    const goToUserManagement=()=>{
        alert('Ok');
      navigate('/admindashboard');
}
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
            User Added Successfully
          </p>
          <button className="btn text-right"onClick={goToUserManagement} style={{fontWeight:'bold', maxWidth: '200px', color:'white' }}>
            OK
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Userconfirm;
