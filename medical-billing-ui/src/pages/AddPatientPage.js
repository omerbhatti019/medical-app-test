// src/pages/AddPatientPage.js
/*import React, { useState } from 'react';

function AddPatientPage() {
  const [patient, setPatient] = useState({
    name: '',
    insurance_id: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://127.0.0.1:5000/patients/patient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(patient)
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert('Patient added successfully!');
        setPatient({ id: '', name: '', insurance_id: '' });
      } else {
        alert('Error: ' + data.error);
      }
  
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong');
    }
  };

  return (
    <div>
      <h2>Add Patient</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="id"
          placeholder="Patient id"
          value={patient.id}
          onChange={handleChange}
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={patient.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="insurance_id"
          placeholder="Insurance_id"
          value={patient.insurance_id}
          onChange={handleChange}
        />
        <button type="submit">Add Patient</button>
      </form>
    </div>
  );
}

export default AddPatientPage;
*/


// src/pages/AddPatientPage.js
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

function AddPatientPage() {
  const [patient, setPatient] = useState({
    id: '',
    name: '',
    insurance_id: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://127.0.0.1:5000/patients/patient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(patient)
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert('Patient added successfully!');
        setPatient({ id: '', name: '', insurance_id: '' });
      } else {
        alert('Error: ' + data.error);
      }
  
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Add Patient</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formPatientId">
                  <Form.Label>Patient ID</Form.Label>
                  <Form.Control
                    type="number"
                    name="id"
                    placeholder="Enter patient ID"
                    value={patient.id}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    value={patient.name}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formInsuranceId">
                  <Form.Label>Insurance ID</Form.Label>
                  <Form.Control
                    type="number"
                    name="insurance_id"
                    placeholder="Enter insurance ID"
                    value={patient.insurance_id}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Add Patient
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AddPatientPage;
