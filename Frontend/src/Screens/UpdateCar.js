import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const UpdateCar = () => {
  const navigate = useNavigate();
  const { Register_num } = useParams();
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    Register_num: '',
    ImagePath: ''
  });

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/car/getonecar/${Register_num}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setFormData({
          brand: data.brand,
          model: data.model,
          year: data.year,
          Register_num: data.Register_num,
          ImagePath: data.ImagePath
        });
        console.log(data);
      } catch (error) {
        console.error('Failed to fetch car data:', error);
        alert('Failed to fetch car data.');
      }
    };

   // fetchCarData();
   
  }, [Register_num]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/car/updatecar/${Register_num}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      alert('Car updated successfully');
      navigate('/car-management');
    } catch (error) {
      console.error('Error updating car:', error);
      alert('Error updating car. Please try again.');
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Header style={{ position: 'sticky', top: '0', zIndex: 9999 }} />
      <video autoPlay muted loop playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -1 }}>
        <source src="bg-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="container d-flex flex-column justify-content-center align-items-center h-100 bg-opacity-25" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <div
          className="card border-0"
          style={{
            marginTop: '10px',
            minWidth: '600px',
            minHeight: '60vh',
            marginBottom: '100px',
            marginLeft: '100px',
            backgroundColor: 'rgba(194, 167, 148, 0.95)',
            borderRadius: '15px',
            padding: '20px',
            boxShadow: '0 0 5px rgba(172,99,44,255), 0 0 5px rgba(172,99,44,255) inset'
          }}
        >
          <h3 className="text-center mb-4" style={{ fontSize: '2rem', fontWeight: 'bold', color: 'black' }}>Update Car</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="brand" className="font-weight-bold">Brand:</label>
              <input type="text" name="brand" id="brand" className="form-control" placeholder="Enter Brand" value={formData.brand} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="model" className="font-weight-bold">Model:</label>
              <input type="text" name="model" id="model" className="form-control" placeholder="Enter Model" value={formData.model} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="year" className="font-weight-bold">Year:</label>
              <input type="number" name="year" id="year" className="form-control" placeholder="Enter Year" value={formData.year} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="regNumber" className="font-weight-bold">Register Number:</label>
              <input type="text" name="regNumber" id="regNumber" className="form-control" placeholder="Enter Register Number" value={formData.regNumber} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="ImagePath" className="font-weight-bold">Image File:</label>
              <input type="file" name="ImagePath" id="ImagePath" className="form-control" onChange={handleChange} />
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn mt-3" style={{ backgroundColor: '#ac632c', color: 'white', fontWeight: 'bold' }}>Update</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UpdateCar;
