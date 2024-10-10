import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap Modal

import Footer from '../components/Footer';
import ModifierHeader from '../components/EditHeader';

function AllCarModels() {
  const [models, setModels] = useState([]);
  const [showModal, setShowModal] = useState(false); // Track modal visibility
  const [currentModelId, setCurrentModelId] = useState(null); // Track which model is being accepted/rejected
  const [comments, setComment] = useState(''); // Track comment input
  const [isRejecting, setIsRejecting] = useState(false); // Track whether we are accepting or rejecting

  useEffect(() => {
    axios.get('http://localhost:3000/model/getallmodels')
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

  const handleAcceptModel = (id) => {
    setCurrentModelId(id); // Set the current model ID
    setIsRejecting(false); // We're accepting the model
    setShowModal(true); // Show the comment modal
  };

  const handleRejectModel = (id) => {
    setCurrentModelId(id); // Set the current model ID
    setIsRejecting(true); // We're rejecting the model
    setShowModal(true); // Show the comment modal
  };

  // Function to submit comment (or accept/reject with comment)
  const handleSubmitComment = () => {
    if (!currentModelId) return;

    // If the user leaves the comments empty, send it as "No comments" or omit it
    const commentText = comments.trim() === '' ? 'No comments' : comments.trim();

    const url = isRejecting
      ? `http://localhost:3000/model/reject_model/${currentModelId}`
      : `http://localhost:3000/model/accept_model/${currentModelId}`;

    axios.put(url, { comments: commentText })
      .then(() => {
        // First, remove the accepted/rejected model from the state
        setModels(prevModels => prevModels.filter(model => model._id !== currentModelId));

        // Reset state after successful submission
        setShowModal(false); // Hide the modal after submission
        setComment(''); // Clear the comment input
        alert(`Model ${isRejecting ? 'rejected' : 'accepted'} ${commentText === 'No comments' ? 'without any comments' : 'with your comment'}`);
      })
      .catch(error => console.error(`Error ${isRejecting ? 'rejecting' : 'accepting'} model with comment`, error));
  };

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <ModifierHeader />
      <div className="container mt-5 pt-5">
        <h3 className="mb-4">Latest Car Models</h3>
        <div className="row">
          {models.map(model => (
            <div key={model._id} className="col-md-4 mb-4">
              <div className={`card ${model.status === 'accepted' ? 'border-success' : model.status === 'rejected' ? 'border-danger' : ''}`} style={{ transition: 'border 0.3s' }}>
                <div className="card-body" 
                style= {{ background: 'linear-gradient(to right, #d9d9d9, #bfbfbf)', 
                 boxShadow: '0 10px 20px rgba(0, 0, 0, 0.25)', 
                 borderRadius:'5px', 
                 transition: 'box-shadow 0.3s ease'}}>
                  <h5 className="card-title">{model.Car_model}</h5>
                  <p className="card-text"><strong>Steering:</strong> {model.Stearing}</p>
                  <p className="card-text"><strong>Mirrors:</strong> {model.Mirrors}</p>
                  <p className="card-text"><strong>Spoiler:</strong> {model.Spoiler}</p>
                  <p className="card-text"><strong>Seats:</strong> {model.Seats}</p>
                  <p className="card-text"><strong>Gear Knob:</strong> {model.Gear_knob}</p>

                  <button className="btn btn-success me-2" style={{marginLeft:'100px'}} onClick={() => handleAcceptModel(model._id)}>
                    <i className="bi bi-check-lg"></i>
                  </button>
                  <button className="btn btn-danger" onClick={() => handleRejectModel(model._id)}>
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />

      {/* Modal for Comment */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isRejecting ? 'Reject' : 'Accept'} Model - Add Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            className="form-control mb-3"
            rows="4"
            value={comments}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Enter your comment here (optional)"
          />
        </Modal.Body>
        <Modal.Footer>
          {/* Cancel will submit without any user-provided comment */}
          <Button variant="btn" style={{color:'white', backgroundColor:'red'}} onClick={() => handleSubmitComment()}>
            {isRejecting ? 'Cancel' : 'Cancel'}
          </Button>
          {/* Submit will use the user's input */}
          <Button variant="primary" onClick={handleSubmitComment}>
            {isRejecting ? 'Comment' : 'Comment'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AllCarModels;
