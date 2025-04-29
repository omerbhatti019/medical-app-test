// src/pages/PatientListPage.js
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';

function PatientListPage() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/patients/get_patients')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch patients');
        }
        return response.json();
      })
      .then((data) => {
        setPatients(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Patient List</h2>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        {patients.map((patient) => (
          <Col md={6} lg={4} key={patient.id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{patient.name}</Card.Title>
                <Card.Text>
                  <strong>ID:</strong> {patient.id} <br />
                  <strong>Insurance ID:</strong> {patient.insurance_id}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default PatientListPage;
