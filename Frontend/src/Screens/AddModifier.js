import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Header1 from '../components/Header_profile';
import Footer from '../components/Footer';

function AddModifier() {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim();
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: trimmedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation logic
    for (const key in formData) {
      if (!formData[key]) {
        alert(`${key.charAt(0).toUpperCase() + key.slice(1)} field cannot be empty.`);
        return;
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (/\s/.test(formData.username) || /\s/.test(formData.password)) {
      alert('Username and Password cannot contain spaces.');
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      alert('Password must be at least 8 characters long with at least one uppercase letter, one digit, and one special character.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/modifier/addmodifier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Modifiers saved successfully');
        setFormData({
          firstname: '',
          lastname: '',
          email: '',
          username: '',
          password: ''
        });
        navigate('/getallmodifier');
      } else {
        alert('Add user failed: ' + data.message);
      }
    } catch (error) {
      alert('Error during user saving.');
    }
  };

  return (
    <div>
      <Header1 /> {/* Fixed Header */}
      <div className="d-flex flex-column justify-content-center align-items-center vh-100" style={{ marginTop: '50px', backgroundColor:'#D3D3D3' }}>
        <div className="card border-0 shadow-lg" style={{ 
          maxWidth: '500px', 
          width: '100%', 
          padding: '30px', 
          backgroundColor: 'grey',
          borderRadius: '15px',
           boxShadow: '0 0 5px rgba(172,99,44,255), 0 0 5px rgba(172,99,44,255) inset'
        }}>
          <h2 className="text-center mb-4" style={{ fontWeight: 'bold', color: 'white' }}>Add Modifier</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label" style={{color:'white'}}>First Name</label>
              <input type="text" name="firstname" id="firstName" className="form-control" value={formData.firstname} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label" style={{color:'white'}}>Last Name</label>
              <input type="text" name="lastname" id="lastName" className="form-control" value={formData.lastname} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label"style={{color:'white'}}>Email</label>
              <input type="email" name="email" id="email" className="form-control" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label"style={{color:'white'}}>Username</label>
              <input type="text" name="username" id="username" className="form-control" value={formData.username} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label"style={{color:'white'}}>Password</label>
              <input type="password" name="password" id="password" className="form-control" value={formData.password} onChange={handleChange} required />
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn" 
                style={{ backgroundColor: '#1e526b', color: 'white', fontWeight: 'bold' }}>
                Add Modifier
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer /> {/* Fixed Footer */}
    </div>
  );
  }
  
  export default AddModifier;