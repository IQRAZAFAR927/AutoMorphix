import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported


function RemoveUser() {
    const [email, setEmail] = useState('');
    let navigate = useNavigate();
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handleRemoveClick = () => {
      // Implement user removal logic here
      //console.log(`Removing user with email: ${email}`);
      navigate('/Confirm_message');
    };
  
    // const handleCancelClick = () => {
    //   navigate(-1); // Go back to the previous page
    // };


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
          <h6 className="text-center mb-3" style={{ fontSize: '2rem', fontWeight: 'bold', color: 'black' }}>Delete User</h6>
          <div className="mb-3">
            <label htmlFor="userEmail" className="form-label" style={{ fontWeight: 'bold', color: 'black' }}>Enter Email</label>
            <input
              type="email"
              className="form-control"
              id="userEmail"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter user's email"
            />
          </div>
          <div className="d-flex justify-content-around">
            <button className="btn" style={{backgroundColor:'#ac632c',boxShadow:'black'}} onClick={handleRemoveClick}>Remove</button>
            {/* <button className="btn btn-secondary" onClick={handleCancelClick}>Cancel</button> */}
          </div>
         
        </div>
      </div>
    </div>
  );
}

export default RemoveUser;
