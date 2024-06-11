import React, { useState, useEffect } from 'react';
import { useNavigate , useParams} from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const UpdateCar = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    regNumber: '',
    ImagePath: ''
});
const { regNumber } = useParams();
  // State variables to store car information
  // const [brand, setBrand] = useState('');
  // const [model, setModel] = useState('');
  // const [year, setYear] = useState('');
  // const [regNumber, setRegNumber] = useState('');

  // Fetch car data when the component mounts
  useEffect(() => {
    // Fetch the user data from the server
    const fetchCarData = async () => {
        const response = await fetch(`http://localhost:3000/car/getonecar/${regNumber}`,{
          method:'GET',
          headers:{
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        console.log(data);
        if (response.ok) {
            setFormData({
                model: data.model,
                brand: data.brand,
                year: data.year,
                regNumber: data.regNumber,
                ImagePath: data.ImagePath
            });
        } else {
            alert('Failed to fetch car data.');
        }
    };

    fetchCarData();
}, [regNumber]);

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
  }));
};

//   useEffect(() => {
//     // Fetch the user data from the server
//     const fetchUserData = async () => {
//       const response = await fetch(`http://localhost:3000/car/getonecar/${registrationNumber}`),{
//           method:'GET',
//           headers:{
//             'Content-Type': 'application/json'
//           }
//         });
//         const data = await response.json();
//         console.log(data);
//         if (response.ok) {
//             setFormData({
//                 firstname: data.firstname,
//                 lastname: data.lastname,
//                 email: data.email,
//                 username: data.username,
//                 password: ''
//             });
//         } else {
//             alert('Failed to fetch user data.');
//         }
//     };

//     fetchUserData();
// }, [userId]);
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const response = await fetch(`http://localhost:3000/car/updatecar/${regNumber}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (response.ok) {
        alert('Car updated successfully');
        navigate('/car-management'); // Redirect to car management page after successful update
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to update car. Please try again.');
      }
    } catch (error) {
      console.error('Error updating car:', error);
      alert('Error updating car. Please try again.');
    }
  };

  return (
    // <div className="bg-image" style={{ backgroundImage: 'url("Background.jpeg")', backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>
    //   <header className="w-100 text-white text-center py-3 fixed-top" style={{ backgroundColor: '#ac632c' }}>
    //     <h1>AutoMorphix</h1>
    //   </header>

    //   <div className="container d-flex flex-column justify-content-center align-items-center h-100  bg-opacity-25">
    //     <div className="card border-0" style={{ marginTop: '50px', minWidth: '900px', minHeight: '70vh', backgroundColor: 'rgba(194, 167, 148, 0.95)', borderRadius: '15px', padding: '20px', boxShadow: '0 0 5px rgba(172,99,44,255), 0 0 5px rgba(172,99,44,255) inset' }}>
    <div style={{ position: 'relative', minHeight: '100vh' }}>
        <Header style={{ position: 'sticky', top: '0', zIndex: 9999 }} />
        <div className="container d-flex flex-row justify-content-center align-items-center h-100 bg-opacity-25" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
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

          

<h6 className="text-center mb-4" style={{ fontSize: '2rem', fontWeight: 'bold', color: 'black' }}>Update User</h6>
          
            <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="model" className="form-label font-weight-bold" style={{ fontWeight: 'bold' }}>Model:</label>
                <input type="text" name='model' id="model" className="form-control" placeholder="Enter model name" value={formData.model} onChange={handleChange} />
              </div>
              <div className="col">
                <label htmlFor="brand" className="form-label font-weight-bold" style={{ fontWeight: 'bold' }}>Brand:</label>
                <input type="text" name='brand' id="brand" className="form-control" placeholder="Enter Brand" value={formData.brand} onChange={handleChange} />
              </div>
              <div className="col">
                <label htmlFor="year" className="form-label font-weight-bold" style={{ fontWeight: 'bold' }}>Year:</label>
                <input type="Number" name='year' id="year" className="form-control" placeholder="Enter Year" value={formData.year} onChange={handleChange} />
              </div>
              <div className="col">
                <label htmlFor="regNumber" className="form-label font-weight-bold" style={{ fontWeight: 'bold' }}>Register_num:</label>
                <input type="Number" name='regNumber' id="regNumber" className="form-control" placeholder="Enter Register_num" value={formData.regNumber} onChange={handleChange} />
              </div>
              <div className="col">
                <label htmlFor="ImagePath" className="form-label font-weight-bold" style={{ fontWeight: 'bold' }}>Image File:</label>
                <input type="file" name='ImagePath' id="ImagePath" className="form-control" placeholder="Enter Image" value={formData.regNumber} onChange={handleChange} />
              </div>

              


              </div>   
            </form>
        </div>
    </div>
  <Footer/>
</div>
    
  
  );
};

export default UpdateCar;
