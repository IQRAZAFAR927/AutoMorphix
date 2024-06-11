import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function AdminDashboard() {
  const navigate = useNavigate();

  const goToUserManagement = () => {
    navigate('/user');
  };

  const goToCarManagement = () => {
    navigate('/car-management');
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>

      <Header style={{position:'sticky', top:'0', zIndex:9999}}/>
    {/* style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      <video autoPlay muted loop playsInline  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}>
        <source src="bg-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <header className="w-100 text-white text-center py-3 fixed-top" style={{ backgroundColor: '#ac632c' }}>
        <h1>AutoMorphix</h1>
      </header> */}

      <div className="container d-flex flex-column justify-content-center align-items-center h-100 bg-opacity-25" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <div
          className="card border-0"
          style={{
            marginTop: '10px',
            marginLeft:'200px',
            marginBottom:'110px',
            minWidth: '800px',
            minHeight: '60vh',
            backgroundColor: 'rgba(194, 167, 148, 0.95)',
            borderRadius: '15px',
            padding: '20px',
            boxShadow: '0 0 5px rgba(172,99,44,255), 0 0 5px rgba(172,99,44,255) inset',
         //  position: 'relative', zIndex: 2
          }}
        >
          <h3 className="text-center mb-4" style={{ fontSize: '2rem', fontWeight: 'bold', color: 'black' }}>
            ADMIN DASHBOARD
          </h3>
          <div className="d-flex justify-content-around" style={{ marginTop: '7rem' }}>
            <button
              className="btn"
              onClick={goToUserManagement}
              style={{ fontWeight: 'bold', color: 'white', backgroundColor: '#ac632c', padding: '1rem 2rem',position: 'relative', zIndex: 3 }}
            >
              User Account Management
            </button>
            <button
              className="btn"
              onClick={goToCarManagement}
              style={{ fontWeight: 'bold', color: 'white', backgroundColor: '#ac632c', padding: '1rem 2rem',position: 'relative', zIndex: 3 }}
            >
              Car Management
            </button>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default AdminDashboard;
