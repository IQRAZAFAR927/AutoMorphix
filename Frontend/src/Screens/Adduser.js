import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Adduser() {
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
    // Remove whitespaces from value
    const trimmedValue = value.trim();
    // Update the form data
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: trimmedValue,
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
      const response = await fetch('http://localhost:3000/user/adduser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert('User saved successfully');
        console.log("User saved successfully", data);
        navigate('/user');
        setFormData({
          firstname: '',
          lastname: '',
          email: '',
          username: '',
          password: ''
        });
      } else {
        alert('Add user failed: ${data.message}');
        console.log('Add User failed:', data.message);
      }
    } catch (error) {
      alert('Error during user saving.');
      console.log('Error during user saving:', error);
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Header style={{ position: 'sticky', top: '0', zIndex: 9999 }} />
      <div className="container d-flex flex-column justify-content-center align-items-center h-100 bg-opacity-25" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <div
          className="card border-0"
          style={{
            marginTop: '50px',
            marginLeft: '200px',
            minWidth: '400px',
            minHeight: '60vh',
            marginBottom: '200px',
            backgroundColor: 'rgba(194, 167, 148, 0.95)',
            borderRadius: '15px',
            padding: '20px',
            boxShadow: '0 0 5px rgba(172,99,44,255), 0 0 5px rgba(172,99,44,255) inset',
          }}
        >
          <h6 className="text-center mb-4" style={{ fontSize: '2rem', fontWeight: 'bold', color: 'black' }}>Add User</h6>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="firstName" className="form-label font-weight-bold" style={{ fontWeight: 'bold' }}>First Name:</label>
                <input type="text" name='firstname' id="firstName" className="form-control" placeholder="Enter first name" value={formData.firstname} onChange={handleChange} />
              </div>
              <div className="col">
                <label htmlFor="lastName" className="form-label font-weight-bold" style={{ fontWeight: 'bold' }}>Last Name:</label>
                <input type="text" name='lastname' id="lastName" className="form-control" placeholder="Enter last name" value={formData.lastname} onChange={handleChange} />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label font-weight-bold" style={{ fontWeight: 'bold' }}>Email:</label>
              <input type="email" name='email' id="email" className="form-control" placeholder="Enter email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label font-weight-bold" style={{ fontWeight: 'bold' }}>Username:</label>
              <input type="text" name='username' id="username" className="form-control" placeholder="Choose a username" value={formData.username} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label font-weight-bold" style={{ fontWeight: 'bold' }}>Password:</label>
              <input type="password" name='password' id="password" className="form-control" placeholder="Create a password" value={formData.password} onChange={handleChange} />
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn mt-3" style={{ backgroundColor: '#ac632c', color: 'white', fontWeight: 'bold' }}>Add</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Adduser;
