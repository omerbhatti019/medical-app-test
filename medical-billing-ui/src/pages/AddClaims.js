import React, { useState } from 'react';
import { Button, Form, Modal, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function PatientClaimsPage() {
  const [claim, setClaim] = useState({
    patient_id: '',
    status: '',
    amount: '',
  });
  
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [loading, setLoading] = useState(false); // Loading state for AJAX request
  const [error, setError] = useState(null); // Error state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClaim((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    
    const patientId = claim.patient_id; // Get patient_id from the form
    
    try {
      const response = await fetch(`http://127.0.0.1:5000/claims/submit/${patientId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(claim), // sending the claim details
      });

      const data = await response.json();

      if (response.ok) {
        alert('Claim added successfully!');
        setClaim({ patient_id: '', status: '', amount: '' });
        setShowModal(false); // Close modal after successful submission
        navigate('/claims'); // Redirect to claims list
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleClose = () => setShowModal(false); // Close the modal without submitting
  const handleShow = () => setShowModal(true); // Open the modal

  return (
    <Container>
      <h2 className="mt-5">Patient Claims</h2>

      {/* Button to show the modal */}
      <Button variant="primary" onClick={handleShow}>
        Add New Claim
      </Button>

      {/* Modal for adding a new claim */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Claim</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formPatientId">
              <Form.Label>Patient ID</Form.Label>
              <Form.Control
                type="number"
                name="patient_id"
                placeholder="Enter Patient ID"
                value={claim.patient_id}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                name="status"
                placeholder="Enter claim status"
                value={claim.status}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAmount">
              <Form.Label>Claim Amount</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                placeholder="Enter claim amount"
                value={claim.amount}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="text-center">
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Claim'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Display error message if there is an error */}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </Container>
  );
}

export default PatientClaimsPage;
