import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ModifierHeader from '../components/EditHeader';

function Reject_CarModels() {
  const [models, setModels] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/model/getrejectmodels')
      .then(response => {
        const updatedModels = response.data.map(model => ({
          ...model,
          status: 'neutral' // neutral, accepted, rejected
        }));
        setModels(updatedModels);
      })
      .catch(error => {
        console.error('Error fetching models', error);
      });
  }, []);

 

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <Header />
      <ModifierHeader />
      <div className="container mt-5 pt-5">
        <h3 className="mb-4 text-center" style={{paddingTop:'30px', paddingBottom:'20px'}}>Reject Car Models</h3>
        <div className="row">
          {models.map(model => (
            <div key={model._id} className="col-md-4 mb-4" style={{paddingBottom:'20px'}}>
              <div className={`card ${model.status === 'accepted' ? 'border-success' : model.status === 'rejected' ? 'border-danger' : ''}`} style={{ transition: 'border 0.3s' }}>
                <div className="card-body" 
                 style=
                 {{ background: 'linear-gradient(to right, #d9d9d9, #bfbfbf)', 
                  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.25)', 
                  borderRadius:'5px', 
                  transition: 'box-shadow 0.3s ease'}}>
                  <h5 className="card-title">{model.Car_model}</h5>
                  <p className="card-text"><strong>Steering:</strong> {model.Stearing}</p>
                  <p className="card-text"><strong>Mirrors:</strong> {model.Mirrors}</p>
                  <p className="card-text"><strong>Spoiler:</strong> {model.Spoiler}</p>
                  <p className="card-text"><strong>Seats:</strong> {model.Seats}</p>
                  <p className="card-text"><strong>Gear Knob:</strong> {model.Gear_knob}</p>
                  <p className="card-text"><strong>Comment:</strong> {model.Comments}</p>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Reject_CarModels;
