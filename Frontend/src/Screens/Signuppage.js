//import React from 'react';
import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure Bootstrap is imported
import Header from '../components/Header';
import Footer from '../components/Footer';



function SignUpPage() 
{
  console.log("SignUpPage is rendering");
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
   setFormData(prevFormData => ({
     ...prevFormData,
     [name]: value,
   }));
 };

 const handleSubmit = async (e) => {
   e.preventDefault();

   // Check for empty fields and display alerts if any
   for (const key in formData) {
    if (!formData[key]) {
      alert(`${key.charAt(0).toUpperCase() + key.slice(1)} field cannot be empty.`);
      return;
    }
  }
   // Check for alphabets in firstname and lastname
   if (!/^[A-Za-z]+$/.test(formData.firstname) || !/^[A-Za-z]+$/.test(formData.lastname)) {
     alert('Firstname and Lastname must contain only alphabets.');
     return;
   }

   // Check for valid email format
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (!emailRegex.test(formData.email)) {
     alert('Please enter a valid email address.');
     return;
   }

   // Check for spaces in username and password
   if (/\s/.test(formData.username) || /\s/.test(formData.password)) {
     alert('Username and Password cannot contain spaces.');
     return;
   }

   // Password validation rules
   const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
   if (!passwordRegex.test(formData.password)) {
     alert('Password must be at least 8 characters long with at least one uppercase letter, one digit, and one special character.');
     return;
   }

   try {
     const response = await fetch('http://localhost:3000/admin1/signup', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(formData),
     });
     const data = await response.json();
     if (response.ok) {
       alert('User saved successfully');
       console.log("User saved successfully", data);
       navigate('/');
       setFormData({
         firstname: '',
         lastname: '',
         email: '',
         username: '',
         password: ''
       });
     } else {
       alert('Signup failed: ${data.message}');
       console.log('Signup failed:', data.message);
     }
   } catch (error) {
     alert('Error during user saving.');
     console.error('Error during user saving:', error);
   }
 };


 return (
  <div>
    <Header /> {/* Fixed Header */}
    <div className="d-flex flex-column justify-content-center align-items-center vh-100" style={{ marginTop: '50px', backgroundColor:'#D3D3D3' }}>
      <div className="card border-0 shadow-lg" style={{ 
        maxWidth: '500px', 
        width: '100%', 
        padding: '30px', 
        backgroundColor: 'grey',
        borderRadius: '15px',
         boxShadow: '0 0 5px rgba(172,99,44,255), 0 0 5px rgba(172,99,44,255) inset'
      }}>
        <h2 className="text-center mb-4" style={{ fontWeight: 'bold', color: 'white' }}>Sign Up</h2>
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
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
    <Footer /> {/* Fixed Footer */}
  </div>
);
}

export default SignUpPage;