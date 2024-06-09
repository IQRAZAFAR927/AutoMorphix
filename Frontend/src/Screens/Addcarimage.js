// AddCarImage.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddCarimage() {
  return (
    <div className="bg-image" style={{
      backgroundImage: 'url("Background.jpeg")', // Use the correct background image path
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh'
    }}>
      <header className="w-100 text-white text-center py-3 fixed-top" style={{ backgroundColor: '#ac632c' }}>
        <h1>AutoMorphix</h1>
      </header>

      {/* Adjust the maximum width smaller than the AddCar component */}
      <div className="container d-flex flex-column justify-content-center align-items-center h-100">
        <div className="card border-0" style={{ 
         marginTop: '100px',
         maxWidth: '1200px',
         maxHeight:'500px',
        padding:'10px',
         backgroundColor: 'rgba(194, 167, 148, 0.95)', // Container background color
         borderRadius: '15px',
         boxShadow: '0 0 5px rgba(172,99,44,255), 0 0 5px rgba(172,99,44,255) inset'
        }}>
          <h3 className="text-center mb-4" style={{ fontWeight: 'bold', color: 'black' }}>ADD CAR</h3>

          {/* Container for the image upload section */}
          <div className="container text-center" style={{
             minWidth: '400px',
         
            backgroundColor: '#ac632c',
            borderRadius: '15px',
            padding: '1rem',
          }}>
            <div className="dotted-container" style={{
              border: '3px dashed white',
              borderRadius: '15px',
              padding: '10px',
              position: 'relative',
            }}>
              {/* Image upload placeholder */}
              <img src={"Addcar.png"} alt="Upload" style={{ maxWidth: '50%', height: 'auto', marginBottom: '20px' }} />
              <p style={{ color: 'white', fontWeight: 'bold' }}>Add your image here</p>
              <p style={{ color: 'white' }}>Drop your image</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCarimage;
