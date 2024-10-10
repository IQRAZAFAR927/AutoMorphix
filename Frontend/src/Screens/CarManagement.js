import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Header1 from '../components/Header_profile';

function CarManagement() {
  const [cars, setCars] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCars, setSelectedCar] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/car/getallcars')
      .then(response => {
        setCars(response.data);
      })
      .catch(error => {
        console.error('Error fetching cars', error);
      });
  }, []);

  const handleDelete = (Register_num) => {
    if (!Register_num) {
      console.error("Registration number is undefined.");
      return;
    }

    if (window.confirm('Are you sure you want to delete this car?')) {
      console.log("Deleting the car with registration number:", Register_num);
      axios.delete(`http://localhost:3000/car/deletecar/${Register_num}`)
        .then(() => {
          setCars(cars.filter(car => car.Register_num !== Register_num));
          console.log("Successfully deleted the car with registration number:", Register_num);
          alert("Sucessfully delete the car");
        })
        .catch(error => {
          console.error('Error deleting car:', error);
          alert("Error deleting the car: " + (error.response?.data?.message || "Unknown Error"));
        });
    }
};

  

 
  const handleUpdate = (Register_num) => {
    navigate(`/updatecar/${Register_num}`);
  };

  const handleAddNewCar = () => {
    navigate('/addcar');
  };

  const handleViewInfo = (Register_num) => {
    const car = cars.find(car => car.Register_num === Register_num);
    handleShowDetails(car);
  };
  const handleShowDetails = (car) => {
    setSelectedCar(car);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedCar(null);
  };

  return (
<div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
<Header1/>
<div className="container mt-5 pt-5">
  <div className="d-flex justify-content-between align-items-center mb-4">
    <h3>Car Management</h3>
    <div>
      <button className="btn btn-success me-2" onClick={handleAddNewCar}>
        <i className="bi bi-plus-lg"></i>
      </button>
      
    </div>
  </div>
  <div className="table-responsive">
    <table className="table table-striped">
      <thead>
        <tr>
              <th>Brand</th>
              <th>Model</th>
              <th>Year</th>
              <th>Reg#</th>
              <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {cars.map(car=> (
          <tr key={car._id}>
            <td>{car.Brand}</td>
            <td>{car.Model}</td>
            <td>{car.Year}</td>
            <td>{car.Register_num}</td>
            <td>
              <button className="btn text-primary me-2" onClick={() => handleUpdate(car.Register_num)}>
                <i className="bi bi-pencil-fill"></i>
              </button>
              <button className="btn text-danger me-2" onClick={() => handleDelete(car.Register_num)}>
                <i className="bi bi-trash-fill"></i>
              </button>
              <button className="btn text-dark" onClick={() => handleViewInfo(car.Register_num)}>
                <i className="bi bi-info-circle-fill"></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  {showDetails && selectedCars && (
    <div className="Car-details-form" style={{
      position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
      backgroundColor: 'grey', color:'white', padding: '20px', zIndex: 1001, width: '80%', maxWidth: '500px',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
    }}>
      <h2>Car Details</h2>
      <p><strong>Brand:</strong> {selectedCars.Brand}</p>
      <p><strong>Model:</strong> {selectedCars.Model}</p>
      <p><strong>Year:</strong> {selectedCars.Year}</p>
      <p><strong>Register Number:</strong> {selectedCars.Register_num}</p>
      <button className="btn btn-secondary" style={{backgroundColor:'white', color: '#1e526b', fontWeight:'bold'}}onClick={handleCloseDetails}>Close</button>
    </div>
  )}
</div>
<Footer />
</div>
);
}

export default CarManagement;


