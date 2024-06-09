import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  let navigate= useNavigate();

  const goToUserManagement=()=>{
    navigate('/user');
  }
  const goToCarManagement=()=>{
    navigate('/car-management');
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

      <div className="container d-flex flex-column justify-content-center align-items-center h-100  bg-opacity-25">
        <div className="card border-0" style={{ 
            marginTop: '50px',
            minWidth: '800px',
            minHeight: '60vh',
            backgroundColor: 'rgba(194, 167, 148, 0.95)', // Container background color
            
           
            borderRadius: '15px',
            padding: '20px',
            boxShadow: '0 0 5px rgba(172,99,44,255), 0 0 5px rgba(172,99,44,255) inset' // Reflective effect
        }}>
          <h3 className="text-center mb-4" style={{ fontSize: '2rem', fontWeight: 'bold', color: 'black' }}>ADMIN DASHBOARD</h3>
          {/* The buttons are now within a flex container with space around them */}
          <div className="d-flex justify-content-around" style={{ marginTop: '7rem' }}>
            <button className="btn" onClick={goToUserManagement} style={{ fontWeight: 'bold', color: 'white', backgroundColor: '#ac632c', padding: '1rem 2rem' }}>
              User Account Management
            </button>
            <button className="btn" onClick={goToCarManagement} style={{ fontWeight: 'bold', color: 'white', backgroundColor: '#ac632c', padding: '1rem 2rem' }}>
              Car Management
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
