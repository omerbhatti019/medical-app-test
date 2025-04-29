import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner, Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';  // For navigation (React Router v6)

function PatientClaimsPage() {
  const [claims, setClaims] = useState([]);  // 'claims' should be an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // For navigating to another page

  useEffect(() => {
    fetch('http://127.0.0.1:5000/claims/get_claims')  // Update endpoint if needed
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch claims');
        }
        return response.json();
      })
      .then((data) => {
        setClaims(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleButtonClick = () => {
    navigate('/add-claims');  // Navigate to the Add Claim page
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Patient Claims</h2>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {/* Display claims if available */}
      {claims.length > 0 ? (
        <Row>
          {claims.map((claim) => (
            <Col md={6} lg={4} key={claim.id} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{claim.patient_name}</Card.Title> {/* Assuming claim has a 'patient_name' */}
                  <Card.Text>
                    <strong>Claim ID:</strong> {claim.id} <br />
                    <strong>Status:</strong> {claim.status} <br />
                    <strong>Amount:</strong> ${claim.amount}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center">
          <Alert variant="info">No claims found. You can add a new claim.</Alert>
        </div>
      )}

      {/* Button to navigate to Add Claim Page */}
      <div className="text-center mt-4">
        <Button variant="primary" onClick={handleButtonClick}>
          Add New Claim
        </Button>
      </div>
    </Container>
  );
}

export default PatientClaimsPage;
