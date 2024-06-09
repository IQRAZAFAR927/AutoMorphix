import React, { useState } from 'react';
import './EditCarDetails.css';

function EditCarDetails() {
  const [model, setModel] = useState('');
  const [brand, setBrand] = useState('');
  const [year, setYear] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  // const [image, setImage] = useState(''); // Commented out as it is not being used
      
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
      
  // const handleImageChange = (e) => {
  //   setImage(e.target.value);
  // };
      
  const handleSubmit = () => {
    console.log(`Car Model: ${model}, Brand: ${brand}, Year: ${year}, Registration Number: ${registrationNumber}`);
    // Add image information to the log if needed
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="w-1/2 mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Edit Car Details</h2>
        <div className='carDetailsDiv'>
            <div className="mb-4">
                <select
                    className="block w-full p-2 border border-gray-300 rounded"
                    value={model}
                    onChange={handleModelChange}
                >
                    <option value="">Model</option>
                    <option>City</option>
                    <option>Civic</option>
                    <option>WagonR</option>
                    <option>Mehran</option>
                    <option>Corolla</option>
                </select>
                <select
                    className="block w-full p-2 border border-gray-300 rounded"
                    value={brand}
                    onChange={handleBrandChange}
                >
                    <option value="">Brand</option>
                    <option>Honda</option>
                    <option>Toyota</option>
                    <option>Suzuki</option>
                </select>
            </div>
            <div className="mb-4">
                <select
                    className="block w-full p-2 border border-gray-300 rounded"
                    value={year}
                    onChange={handleYearChange}
                >
                    <option value="">Year</option>
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
                <input
                    type='text'
                    placeholder='Registration Number'
                    value={registrationNumber}
                    onChange={handleRegistrationNumberChange}
                    className="block w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="mb-4 uploadImgBtn">
              <button
                  className="block w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={handleSubmit}
              >
                  Change Image
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default EditCarDetails;
