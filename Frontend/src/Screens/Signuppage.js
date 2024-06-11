//import React from 'react';
import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure Bootstrap is imported
import Header from '../components/Header';
import Footer from '../components/Footer';



function SignUpPage() 
{
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
     const response = await fetch('http://localhost:3000/admin/signup', {
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
    // <div className="bg-image" style={{
    //   backgroundImage: 'url("Background.jpeg")', // Replace with your actual background image
    //  // backgroundsize: 'contain',
    //   backgroundSize: 'cover',
    //   backgroundPosition: 'center',
    //   height: '100vh'
    // }}>
    //   <header className="w-100 text-white text-center py-2 fixed-top" style={{ backgroundColor: '#ac632c' }}>
    //     <h1>AutoMorphix</h1>
    //   </header>
     <div>
      <Header/>

      <div className="container d-flex flex-column justify-content-center align-items-center h-100">
        <div className="card border-0" style={{ 
          maxWidth: '700px',
          backgroundColor: '#b49d8b', // Container background color
          borderRadius: '15px',
          padding: '20px',
          marginTop:'-600px',
          
        }}>
         <h6 className="text-center mb-4" style={{ fontSize: '2rem', fontWeight: 'bold', color: 'black' }}>Signup Page</h6> {/* Add User heading */}
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="firstName" className="form-label font-weight-bold" style={{fontWeight:'bold'}}>First Name:</label>
              <input type="text" name='firstname' id="firstName" className="form-control" placeholder="Enter first name" value={formData.firstname} onChange={handleChange} />
            </div>
            <div className="col">
              <label htmlFor="lastName" className="form-label font-weight-bold" style={{fontWeight:'bold'}} >Last Name:</label>
              <input type="text" name='lastname' id="lastName" className="form-control" placeholder="Enter last name" value={formData.lastname} onChange={handleChange}/>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label font-weight-bold" style={{fontWeight:'bold'}} >Email:</label>
            <input type="email" name='email' id="email" className="form-control" placeholder="Enter email" value={formData.email} onChange={handleChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label font-weight-bold" style={{fontWeight:'bold'}} >Username:</label>
            <input type="text" name='username' id="username" className="form-control" placeholder="Choose a username" value={formData.username} onChange={handleChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label font-weight-bold"style={{fontWeight:'bold'}} >Password:</label>
            <input type="password"name='password' id="password" className="form-control" placeholder="Create a password" value={formData.password} onChange={handleChange}/>
          </div>
          <div className="d-flex justify-content-center">
          <button type="submit" className="btn mt-3" 
                style={{ backgroundColor: '#ac632c', color: 'white' ,fontWeight:'bold'}}>SignUp</button>
          </div>
          
       </form>
        
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default SignUpPage;