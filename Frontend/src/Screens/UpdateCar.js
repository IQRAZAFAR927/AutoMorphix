import React, { useState } from 'react';
//import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UpdateCar = () => {

  let navigate= useNavigate();

  const goToUpdateimage=()=>{
    navigate('/addimage');
  }
  const [model, setModel] = useState('');
  const [brand, setBrand] = useState('');
  const [year, setYear] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');

  const handleModelChange = (e) => {
    setModel(e.target.value);
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleRegistrationNumberChange = (e) => {
    setRegistrationNumber(e.target.value);
  };

  // const handleSubmit = () => {
  //   console.log(`Car Model: ${model}, Brand: ${brand}, Year: ${year}, Registration Number: ${registrationNumber}`);
  // };

  return (
    <div className="bg-image" style={{
        backgroundImage: 'url("Background.jpeg")', // Replace with your actual background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh'
      }}>
        <header className="w-100 text-white text-center py-3 fixed-top" style={{ backgroundColor: '#ac632c' }}>
          <h1>AutoMorphix</h1>
        </header>

        <div className="container d-flex flex-column justify-content-center align-items-center h-100  bg-opacity-25">
        <div className="card border-0" style={{ 
            marginTop: '50px',
            minWidth: '900px',
            minHeight: '70vh',
            backgroundColor: 'rgba(194, 167, 148, 0.95)', // Container background color
            borderRadius: '15px',
            padding: '20px',
            boxShadow: '0 0 5px rgba(172,99,44,255), 0 0 5px rgba(172,99,44,255) inset' // Reflective effect
        }}>

          <h3 className="text-center mb-4" style={{ fontSize: '2rem', fontWeight: 'bold', color: 'black' }}>Update Car Details</h3>
          <div className="container text-center" style={{
            minWidth: '700px',
            minHeight: '50vh',
            backgroundColor:'#ac632c',
            boxShadow: '0 0 5px black, 0 0 5px black inset',
            borderRadius: '15px',
            padding: '100px',
            marginBottom: '10px',
            position: 'relative', 
            margintop:'100px'// Needed for absolute positioning of the inner container
          }}>

          <div className="row mb-4" >
            <div className="col-md-6">
                <select
                    className="form-select mb-4"
                    value={brand}
                    onChange={handleBrandChange}
                    style={{margintop:'100px'}}
                >
                   <option value="">Corolla</option>
                    <option>City</option>
                    <option>Civic</option>
                    <option>WagonR</option>
                    <option>Mehran</option>
                </select>
            </div>
            <div className="col-md-6">
                <select
                    className="form-select mb-3"
                    value={model}
                    onChange={handleModelChange}
                >
                     <option value="">GLI</option>
                    <option>Honda</option>
                    <option>Toyota</option>
                    <option>Suzuki</option>
                </select>
            </div>
            </div>

            <div className="row">
            <div className="col-md-6">
                <select
                    className="form-select mb-3"
                    value={year}
                    onChange={handleYearChange}
                >
                    <option value="">2021</option>
                    <option>1992</option>
                    <option>1995-2000</option>
                    <option>2008</option>
                    <option>2008-2012 (Reborn)</option>
                    <option>2009-2012</option>
                    <option>2012-2015 (Rebirth)</option>
                    <option>2009-2020</option>
                    <option>2016-2020</option>
                    <option>2016-2022 (X)</option>
                </select>
            </div>
            <div className="col-md-6">
                <input
                    type='text'
                    placeholder='Registration Number'
                    value={registrationNumber}
                    onChange={handleRegistrationNumberChange}
                    className="form-control"
                />
            </div>
          </div>
                
          <div className="text-center mt-4" onClick={goToUpdateimage}> 
            <button className="btn text-white bold">Change Image</button>
          </div>
        </div>
      </div>
    </div>

 </div>

  );
};

export default UpdateCar;