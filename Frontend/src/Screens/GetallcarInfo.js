import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function CarManagement() {
  const [cars, setCars] = useState([]);
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

  const handleAddNewCar = () => {
    navigate('/addcar');
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Header />
      <div className="container mt-5">
        <h3 className="text-center mb-4">Car Operations</h3>
        <button className="btn btn-success mb-3" onClick={handleAddNewCar}>
          Add New Car
        </button>
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
            {cars.map(car => (
              <tr key={car.Register_num}>
                <td>{car.Brand}</td>
                <td>{car.Model}</td>
                <td>{car.Year}</td>
                <td>{car.Register_num}</td>
                <td>
                  <button className="btn btn-info" onClick={() => handleUpdate(car.Register_num)}>
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(car.Register_num)}>
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
}

export default CarManagement;
