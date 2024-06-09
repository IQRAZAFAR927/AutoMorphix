import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';

function CarManagement() {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
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
    axios.delete(`http://localhost:3000/car/deletecar/${Register_num}`)
      .then(() => {
        setCars(cars.filter(car => car.Register_num !== Register_num));
      })
      .catch(error => {
        console.error('Error deleting car', error);
      });
  };

  const handleUpdate = (Register_num) => {
    navigate(`/updatecar/${Register_num}`);
  };

  const handleViewInfo = (Register_num) => {
    const carInfo = cars.find(car => car.Register_num === Register_num);
    setSelectedCar(carInfo);
    setShowInfo(true);
  };

  const handleAddNewCar = () => {
    navigate('/addcar');
  };

  return (
    <div className="bg-image" style={{
      backgroundImage: 'url("Background.jpeg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh'
    }}>
      <header className="w-100 text-white text-center py-3 fixed-top" style={{ backgroundColor: '#ac632c' }}>
        <h1>AutoMorphix</h1>
      </header>

      <div className="container d-flex flex-column justify-content-center align-items-center h-100">
        <div className="card border-0" style={{
            marginTop: '50px',
            minWidth: '800px',
            minHeight: '60vh',
            backgroundColor: 'rgba(179,158,139,255)',
            borderRadius: '15px',
            padding: '20px',
            boxShadow: '0 0 5px 0 rgba(172,99,44,255)'
        }}>
          <button className="btn btn-success mb-3" onClick={handleAddNewCar} style={{ position: 'absolute', right: 20, top: 30 ,padding:'0.25rem 0.5rem',color:'inherit',fontSize:'1rem'}}>
            <i className="bi bi-plus-lg"></i>
          </button>
          <h3 className="text-center mb-4" style={{ fontSize: '2rem', fontWeight: 'bold', color: 'black' }}>Car Operations</h3>
          <div className="d-flex flex-wrap justify-content-start">
            {cars.map(car => (
              <div key={car.Register_num} className="card m-2 d-flex flex-row" style={{ width: '25rem', backgroundColor: 'rgba(172,99,44,0.8)' }}>
                <img src={car.ImagePath || '/Addcar.png'} className="card-img-left" style={{ width: '40%', height: '100%', objectFit: 'cover' }} alt={car.Model} />
                <div className="card-body">
                  <h5 className="card-title">{car.Brand} {car.Model}</h5>
                  <p className="card-text">Year: {car.Year}</p>
                  <p className="card-text">Reg#: {car.Register_num}</p>
                  <button className="btn btn-link text-danger" onClick={() => handleDelete(car.Register_num)}>
                    <i className="bi bi-trash-fill"></i>
                  </button>
                  <button className="btn btn-link text-info" onClick={() => handleUpdate(car.Register_num)}>
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button className="btn btn-link text-secondary" onClick={() => handleViewInfo(car.Register_num)}>
                    <i className="bi bi-eye-fill"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
          {showInfo && selectedCar && (
            <div className="fixed-bottom text-black p-3 border rounded" 
            style={{margin:'0 Auto', background:'#bda28f', width: '30%', right: '10px', bottom: '250px' , boxShadow: '0px 4px 8px rgba(172,99,44,0.9)'}}>
              <div className="d-flex">
                <div style={{ width: '50%' }}>
                  <img src={selectedCar.ImagePath || '/Addcar.png'} alt={selectedCar.Model} style={{ width: '100%', height: 'auto' }} />
                </div>
                <div style={{ width: '50%' }}>
                  <h4>{selectedCar.Brand} {selectedCar.Model}</h4>
                  <p>Year: {selectedCar.Year}</p>
                  <p>Reg#: {selectedCar.Register_num}</p>
                  <button className="btn btn-secondary" onClick={() => setShowInfo(false)}>Close</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CarManagement;
