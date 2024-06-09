// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const AddCar = () => {
//   const [model, setModel] = useState('');
//   const [brand, setBrand] = useState('');
//   const [year, setYear] = useState('');
//   const [registrationNumber, setRegistrationNumber] = useState('');
//   const [carImage, setCarImage] = useState(null);

//   const navigate = useNavigate();

//   const handleModelChange = (e) => setModel(e.target.value);
//   const handleBrandChange = (e) => setBrand(e.target.value);
//   const handleYearChange = (e) => setYear(e.target.value);
//   const handleRegistrationNumberChange = (e) => setRegistrationNumber(e.target.value);
//   const handleImageChange = (e) => setCarImage(e.target.files[0]);

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent the form from submitting in the traditional way
//     if (!model || !brand || !year || !registrationNumber || !carImage) {
//       alert('All fields including the image are required!');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('model', model);
//     formData.append('brand', brand);
//     formData.append('year', year);
//     formData.append('registrationNumber', registrationNumber);
//     formData.append('carImage', carImage);

//     try {
//       const response = await axios.post('http://localhost:3000/car/addcar', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       if (response.status === 200) {
//         alert('Car added successfully!');
//         navigate('/car-management'); // Navigate to home or another appropriate page after successful post
//       }
//     } catch (error) {
//       console.error('Failed to add car', error);
//       alert('Failed to add car: ' + (error.response?.data?.message || error.message));
//     }
//   };

//   return (
//     <>
//     <div className="bg-image" style={{
//        backgroundImage: 'url("Background.jpeg")',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         height: '100vh'
//       }}>
//         <header className="w-100 text-white text-center py-3 fixed-top" style={{ backgroundColor: '#ac632c' }}>
//           <h1>AutoMorphix</h1>
//         </header>

//         <div className="container d-flex flex-column justify-content-center align-items-center h-100 bg-opacity-25">
//           <div className="card border-0" style={{ 
//               marginTop: '50px',
//               minWidth: '900px',
//               minHeight: '70vh',
//               backgroundColor: 'rgba(194, 167, 148, 0.95)',
//               borderRadius: '15px',
//               padding: '20px',
//               boxShadow: '0 0 5px rgba(172,99,44,255), 0 0 5px rgba(172,99,44,255) inset'
//           }}>

//             <h3 className="text-center mb-4" style={{ fontSize: '2rem', fontWeight: 'bold', color: 'black' }}>ADD CAR</h3>
//             <form onSubmit={handleSubmit} style={{
//               minWidth: '700px',
//               minHeight: '50vh',
//               backgroundColor:'#ac632c',
//               boxShadow: '0 0 5px black, 0 0 5px black inset',
//               borderRadius: '15px',
//               padding: '100px',
//               marginBottom: '10px',
//               position: 'relative', 
//             }}>

//             <div className="row mb-4" >
//               <div className="col-md-6">
//                   <select
//                       className="form-select mb-4"
//                       value={brand}
//                       onChange={handleBrandChange}
//                   >
//                      <option value="">Brand</option>
//                       <option>Honda</option>
//                       <option>Toyota</option>
//                       <option>Suzuki</option>
//                   </select>
//               </div>
//               <div className="col-md-6">
//                   <select
//                       className="form-select mb-3"
//                       value={model}
//                       onChange={handleModelChange}
//                   >
//                        <option value="">Model</option>
//                       <option>City</option>
//                       <option>Civic</option>
//                       <option>WagonR</option>
//                       <option>Mehran</option>
//                       <option>Corolla</option>
//                   </select>
//               </div>
//               </div>

//               <div className="row">
//               <div className="col-md-6">
//                   <select
//                       className="form-select mb-3"
//                       value={year}
//                       onChange={handleYearChange}
//                   >
//                       <option value="">Year</option>
//                       <option>1992</option>
//                       <option>1995</option>
//                       <option>2000</option>
//                       <option>2008</option>
//                       <option>2012</option>
//                       <option>2015</option>
//                       <option>2020</option>
//                       <option>2022</option>
//                   </select>
//               </div>
//               <div className="col-md-6">
//                   <input
//                       type='text'
//                       placeholder='Registration Number'
//                       value={registrationNumber}
//                       onChange={handleRegistrationNumberChange}
//                       className="form-control"
//                   />
//               </div>
//             </div>

//             <div className="row">
//               <div className="col-md-12">
//                 <input
//                   type="file"
//                   onChange={handleImageChange}
//                   className="form-control"
//                 />
//               </div>
//             </div>

//             <div className="text-center mt-4">
//               <button type="submit" className="btn text-white bold">Submit Car</button>
//             </div>
//             </form>
//           </div>
//         </div>
//       </div>
//   </div>
//   </>
//   );
// };

// export default AddCar;







import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCar = () => {
  const [model, setModel] = useState('');
  const [brand, setBrand] = useState('');
  const [year, setYear] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [carImage, setCarImage] = useState(null);

  const navigate = useNavigate();
  const handleModelChange = (e) => setModel(e.target.value);
    const handleBrandChange = (e) => setBrand(e.target.value);
    const handleYearChange = (e) => setYear(e.target.value);
    const handleRegistrationNumberChange = (e) => setRegistrationNumber(e.target.value);
    const handleImageChange = (e) => setCarImage(e.target.files[0]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!model || !brand || !year || !registrationNumber || !carImage) {
      alert('All fields including the image are required!');
      return;
    }

    const formData = new FormData();
    formData.append('model', model);
    formData.append('brand', brand);
    formData.append('year', year);
    formData.append('registrationNumber', registrationNumber);
    formData.append('carImage', carImage);

    try {
      const response = await axios.post('http://localhost:3000/car/addcar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response.status === 200) {
        alert('Car added successfully!');
        navigate('/car-management');
      }
    } catch (error) {
      console.error('Failed to add car', error);
      alert('Failed to add car: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <>
      <div className="bg-image" style={{ backgroundImage: 'url("Background.jpeg")', backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>
        <header className="w-100 text-white text-center py-3 fixed-top" style={{ backgroundColor: '#ac632c' }}>
          <h1>AutoMorphix</h1>
        </header>
        <div className="container d-flex flex-column justify-content-center align-items-center h-100 bg-opacity-25">
          <div className="card border-0" style={{ marginTop: '50px', minWidth: '900px', minHeight: '70vh', backgroundColor: 'rgba(194, 167, 148, 0.95)', borderRadius: '15px', padding: '20px', boxShadow: '0 0 5px rgba(172,99,44,255), 0 0 5px rgba(172,99,44,255) inset' }}>
            <h3 className="text-center mb-4" style={{ fontSize: '2rem', fontWeight: 'bold', color: 'black' }}>ADD CAR</h3>
            <form onSubmit={handleSubmit} style={{
              minWidth: '700px',
              minHeight: '50vh',
              backgroundColor:'#ac632c',
              boxShadow: '0 0 5px black, 0 0 5px black inset',
              borderRadius: '15px',
              padding: '100px',
              marginBottom: '10px',
              position: 'relative', 
            }}>

            <div className="row mb-4" >
              <div className="col-md-6">
                  <select
                      className="form-select mb-4"
                      value={brand}
                      onChange={handleBrandChange}
                  >
                     <option value="">Brand</option>
                      <option>Honda</option>
                      <option>Toyota</option>
                      <option>Suzuki</option>
                  </select>
              </div>
              <div className="col-md-6">
                  <select
                      className="form-select mb-3"
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
              </div>
              </div>

              <div className="row">
              <div className="col-md-6">
                  <select
                      className="form-select mb-3"
                      value={year}
                      onChange={handleYearChange}
                  >
                      <option value="">Year</option>
                      <option>1992</option>
                      <option>1995</option>
                      <option>2000</option>
                      <option>2008</option>
                      <option>2012</option>
                      <option>2015</option>
                      <option>2020</option>
                      <option>2022</option>
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

            <div className="row">
              <div className="col-md-12">
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="form-control"
                />
              </div>
            </div>

            <div className="text-center mt-4">
              <button type="submit" className="btn text-white bold">Submit Car</button>
            </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCar;

