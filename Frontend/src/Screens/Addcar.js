import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Header1 from '../components/Header_profile';

const AddCar = () => {
  const [Brand, setBrand] = useState('');
  const [Model, setModel] = useState('');
  const [Year, setYear] = useState('');
  const [Register_num, setRegister_num] = useState('');

  const navigate = useNavigate();

  const handleBrandChange = (e) => setBrand(e.target.value);
  const handleModelChange = (e) => setModel(e.target.value);
  const handleYearChange = (e) => setYear(e.target.value);
  const handleRegistrationNumberChange = (e) => setRegister_num(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const regNumRegex = /^[A-Za-z]{1,3}\d{1,4}$/;
    if (!regNumRegex.test(Register_num)) {
      alert('Registration Number should have a maximum of 3 alphabets followed by a maximum of 4 digits with no special characters.');
      return;
    }

    

    const carData = { Brand, Model, Year, Register_num };
  
    try {
      const response = await axios.post('http://localhost:3000/car/addcar', carData);
      alert('Car added successfully!');
      navigate('/car-management');
    } catch (error) {
      alert('Failed to add car: ' + (error.response?.data?.message || error.message));
    }
  };

  
  return (
    <div>
      <Header1 />
      <div className="d-flex flex-column justify-content-center align-items-center vh-100" style={{ marginTop: '50px', backgroundColor: '#D3D3D3' }}>
        <div className="card border-0 shadow-lg" style={{
          maxWidth: '500px', 
          width: '100%', 
          padding: '30px', 
          backgroundColor: 'grey',
          borderRadius: '15px',
          boxShadow: '0 0 5px rgba(172,99,44,255), 0 0 5px rgba(172,99,44,255) inset'
        }}>
          <h2 className="text-center mb-4" style={{ fontWeight: 'bold', color: 'white' }}>Add Car</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="brand" className="form-label">Brand</label>
              <select className="form-control" id="brand" name="brand" value={Brand} onChange={handleBrandChange}>
                <option value="">Select Brand</option>
                <option value="Honda">Honda</option>
                <option value="Toyota">Toyota</option>
                <option value="Suzuki">Suzuki</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="model" className="form-label">Model</label>
              <select className="form-control" id="model" name="model" value={Model} onChange={handleModelChange}>
                <option value="">Select Model</option>
                <option value="City">City</option>
                <option value="Civic">Civic</option>
                <option value="WagonR">WagonR</option>
                <option value="Mehran">Mehran</option>
                <option value="Corolla">Corolla</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="year" className="form-label">Year</label>
              <select className="form-control" id="year" name="year" value={Year} onChange={handleYearChange}>
                <option value="">Select Year</option>
                <option value="1992">1992</option>
                <option value="1995">1995</option>
                <option value="2000">2000</option>
                <option value="2005">2005</option>
                <option value="2010">2010</option>
                <option value="2015">2015</option>
                <option value="2020">2020</option>
                <option value="2022">2022</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="registrationNumber" className="form-label">Registration Number</label>
              <input type="text" className="form-control" id="registrationNumber" name="registrationNumber" value={Register_num} onChange={handleRegistrationNumberChange} />
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary">Add Car</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddCar;
