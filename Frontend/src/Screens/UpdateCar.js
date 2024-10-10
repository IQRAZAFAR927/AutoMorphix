import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header1 from '../components/Header_profile';
import Footer from '../components/Footer';


const UpdateCar = () => {
 
 console.log("Execute the Update car infromation:");


  const [formData, setFormData] = useState({
    Brand: '',
    Model: '',
    Year: '',
    Register_num: ''
  });
  const { Register_num } = useParams();
  console.log("Register_num from params:", Register_num);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/car/getonecar/${Register_num}`);
        const data = response.data;  // Axios automatically handles JSON response
        if (data) {
          setFormData({
            Brand: data.Brand,
            Model: data.Model,
            Year: data.Year,
            Register_num: data.Register_num
          });
        } else {
          console.error('No data returned from the server');
          alert('Failed to fetch car data');
        }
      } catch (error) {
        console.error('Failed to fetch car data:', error);
        alert('Failed to fetch car data: ' + error.message);
      }
    };
  
    fetchCarData();
  }, [Register_num]);
  
  

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
    try {
      const response = await axios.put(`http://localhost:3000/car/updatecar/${Register_num}`, formData);
      if (response.status === 200) {
        alert('Car updated successfully');
        navigate('/car-management'); // Redirect to the car management page
      } else {
        throw new Error('Failed to update car');
      }
    } catch (error) {
      console.error('Error updating car:', error);
      alert('Failed to update car: ' + error.message);
    }
  };
  


  return (
    <div className="d-flex flex-column vh-100" style={{marginTop: '50px', backgroundColor:'#D3D3D3'}}>
      <Header1/>
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
              <h2 className="card-title text-center mb-4">Update Car</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="brand">Brand</label>
                  <input type="text" className="form-control" id="brand" name="brand" value={formData.Brand} onChange={handleChange} required />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="model">Model</label>
                  <input type="text" className="form-control" id="model" name="model" value={formData.Model} onChange={handleChange} required />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="year">Year</label>
                  <input type="number" className="form-control" id="year" name="year" value={formData.Year} onChange={handleChange} required />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="regNumber">Register Number</label>
                  <input type="text" className="form-control" id="regNumber" name="regNumber" value={formData.Register_num} onChange={handleChange} required />
                </div>
               
                <div className="d-flex justify-content-center">
              <button type="submit" className="btn" 
                style={{ backgroundColor: '#1e526b', color: 'white', fontWeight: 'bold' }}>
                Update Car
              </button>
            </div>
              </form>
            </div>
          </div>
      
      <Footer />
    </div>
  );
};

export default UpdateCar;
