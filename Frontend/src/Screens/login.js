import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function SigninPage() {
  const navigate = useNavigate();
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
      const data = await response.json();

      console.log('Login success:', data);
      localStorage.setItem('token', data.token);
      alert('Login Successful!');
      navigate('/admin');
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
      <div className="container d-flex justify-content-center align-items-center h-100">
        <div className="card border-0" style={{
          marginTop: '-550px',
          maxWidth: '700px',
          minHeight: '50vh',
          backgroundColor: '#b69e8c',
          borderRadius: '15px',
          border: '2px solid #ac632c'
        }}>

          <div className="row no-gutters align-items-center">
            <div className="col-md-6 d-flex justify-content-center" >
              <img src="login.png" style={{
                borderRadius: '10px',
                margin: '5px',
                marginTop: '60px',
                height: '50%',
                width: '50%'
              }} alt="Login Visual" className="img-fluid" />
            </div>

            <div className="col-md-1 d-flex justify-content-center align-items-center">
              <div className="vertical-line" style={{
                backgroundColor: 'red',
                width: '5px',
                height: '250px',
              }}></div>
            </div>

            <div className="col-md-5 d-flex flex-column p-4">
              <div className="my-2" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <div className="small-line" style={{
                  height: '5px',
                  width: '40px',
                  backgroundColor: '#ac632c',
                  marginBottom: '20px',
                }}></div>
                <p style={{ margin: 0, fontWeight: 'bold' }}>Login as Admin user</p>
              </div>
              <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
                <div className="mb-3" style={{ maxWidth: '250px', margin: 'auto' }}>
                  <input type="text" name='username' className="form-control" placeholder="Username" value={formData.username} onChange={handleChange} />
                </div>
                <div className="mb-3" style={{ maxWidth: '250px', margin: 'auto' }}>
                  <input type="password" name='password' className="form-control" placeholder="Password" value={formData.password} onChange={handleChange} />
                </div>

                <div className="d-flex justify-content-center align-items-center flex-column">
                  <p className="mb-2">Don't have an account?</p>
                  <p className='mb-2' type="button" onClick={goToSignUppage} style={{ color: 'blue', fontWeight: 'bold' }}>Create Account</p>
                  <button type="submit" className="btn" style={{ backgroundColor: '#ac632c', color: 'white' }}>Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SigninPage;
