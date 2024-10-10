import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Header1 from '../components/Header_profile';

function UpdateModifier() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    username: ''

  });
  const navigate = useNavigate();
  const { modifierId } = useParams(); // Assuming you're passing userId as a URL param

  useEffect(() => {
    // Fetch the user data from the server
    const fetchModifierData = async () => {
      const response = await fetch(`http://localhost:3000/modifier/getoneModifier/${modifierId}`,{
        method:'GET',
        headers:{
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setFormData({
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          username: data.username
        });
      } else {
        alert('Failed to fetch modifier data.');
      }
    };

    fetchModifierData();
  }, [modifierId]);

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);  // Log the name of the field and value being set
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
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
    if (/\s/.test(formData.username) ) {
      alert('Username cannot contain spaces.');
      return;
    }

    // Password validation rules
    // const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
    // if (!passwordRegex.test(formData.password)) {
    //   alert('Password must be at least 8 characters long with at least one uppercase letter, one digit, and one special character.');
    //   return;
    // }

    try {
      const response = await fetch(`http://localhost:3000/modifier/updatemodifier/${modifierId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (response.ok) {
        alert('Modifier updated successfully');
        navigate('/getallmodifier'); // Redirect to the user list
      } else {
        alert(result.message || 'Failed to update user. Please try again.');
      }
    } catch (error) {
      alert('Error during user update.');
      console.error('Error during user update:', error);
    }
  };


  return (
    <div className="d-flex flex-column vh-100" style={{marginTop: '50px', backgroundColor:'#D3D3D3'}}>
      <Header1 />
      <div className="container d-flex flex-column justify-content-center align-items-center mt-5 pt-5">
        <div className="card p-4" 
        style={{
          width: '100%', 
          maxWidth: '500px',  
          backgroundColor: 'grey',
           borderRadius: '15px', 
          boxShadow: 'grey',
          marginBottom:'50px'
        }}>
          <h2 className="text-center mb-3" style={{ color: 'white' }}>Update Modifier</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="firstname" className="form-label text-white">First Name</label>
              <input type="text" className="form-control" id="firstname" name="firstname" value={formData.firstname} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="lastname" className="form-label text-white">Last Name</label>
              <input type="text" className="form-control" id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-white">Email</label>
              <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label text-white">Username</label>
              <input type="text" className="form-control" id="username" name="username" value={formData.username} onChange={handleChange} />
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn" 
                style={{ backgroundColor: '#1e526b', color: 'white', fontWeight: 'bold' }}>
                Update Modifier
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UpdateModifier;