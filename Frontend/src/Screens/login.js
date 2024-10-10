import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

import { useAdmin } from '../context/AdminContext';

function SigninPage() {
  const navigate = useNavigate();
  const { login } = useAdmin();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value.trim() // Trim whitespace from input value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate username and password
    const { username, password } = formData;
    const usernamePattern = /^\S+$/; // No whitespaces allowed
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // At least 8 characters, 1 special character, 1 uppercase letter, 1 digit

    if (!username || !password) {
      alert('All fields are required.');
      return;
    }

    if (!usernamePattern.test(username)) {
      alert('Username must not contain whitespace.');
      return;
    }

    if (!passwordPattern.test(password)) {
      alert('Password must be at least 8 characters long, contain at least 1 special character, 1 uppercase letter, and 1 digit.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      console.log(formData);
      // In your login function

      const data = await response.json();
      if (response.ok) {
        console.log("Successfully logged in:", data);
        login(data.admin);
  
        // Store token and role
         // Save token and user details to localStorage
         
      localStorage.setItem('token', data.token);
      localStorage.setItem('admin', JSON.stringify(data.admin));
      localStorage.setItem('adminId', data.admin._id);
  
        alert('Login Successful!');
  
        // Redirect based on role
        if (data.role === 'admin') {
          navigate('/admin');
        } else if (data.role === 'modifier') {
          navigate('/modifier');
        }
      } else {
        alert('Login failed: ' + data.message);
      }
    } catch (error) {
      console.error('Login Error: ', error);
      alert('Login failed: ' + error.message);
    }
  }

  const goToSignUppage = () => {
    navigate('/Signup');
  }

  return (
    <div>
      <Header />
      <div className="d-flex flex-column justify-content-center align-items-center vh-100" style={{ marginTop: '50px', backgroundColor:'#D3D3D3' }}>
        <div className="card shadow-lg" 
        style={{ width: '400px', borderRadius: '15px', 
        overflow: 'hidden',
        backgroundColor: 'grey', 
        boxShadow: '0 0 5px rgba(172,99,44,255), 0 0 5px rgba(172,99,44,255) inset'}}>
          <div className="card-body p-5">
            <h2 className="card-title text-center mb-4 text-white">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input type="text" className="form-control" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <input type="password" className="form-control" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn" 
                  style={{ backgroundColor: '#1e526b', color: 'white', fontWeight: 'bold' }}>
                  Login
                </button>
              </div>
              
            </form>
            <div className="text-center mt-3" style={{color:'#D3D3D3'}}>
              <p>Don't have an account? <a href="/signup" className="text" style={{color:'#1e526b', fontWeight: 'bold'}}>Sign Up</a></p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SigninPage;