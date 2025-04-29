// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Button, Container, Navbar, Nav } from 'react-bootstrap';
import AddPatientPage from './pages/AddPatientPage';
import PatientListPage from './pages/PatientListPage';
import PatientClaimsPage from './pages/PatientClaimsPage';
import AddClaimPage from './pages/AddClaims';

function App() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">Medical Billing App</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/add-patient">Add Patient</Nav.Link>
            <Nav.Link as={Link} to="/patients">Patient List</Nav.Link>
            <Nav.Link as={Link} to="/claims">Claims List</Nav.Link>
         
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route path="/" element={
            <>
              <h2>Welcome to the Medical Billing App</h2>
              <Button variant="primary">Test Button</Button>
            </>
          } />
          <Route path="/add-patient" element={<AddPatientPage />} />
          <Route path="/patients" element={<PatientListPage />} />
          <Route path="/claims" element={<PatientClaimsPage />} />
          <Route path="/add-claims" element={<AddClaimPage />} />
          
        </Routes>
      </Container>
    </Router>
  );
}

export default App;


/*

// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddPatientPage from './pages/AddPatientPage';
import PatientListPage from './pages/PatientListPage';
import { Button, Container, Navbar, Nav } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/add-patient">Add Patient</Link></li>
            <li><Link to="/patients">Patient List</Link></li> {/* 👈 corrected path */
  /*          </ul>
            </nav>
    
            <Routes>
              <Route path="/add-patient" element={<AddPatientPage />} />
              <Route path="/patients" element={<PatientListPage />} />
            </Routes>
          </div>
        </Router>
      );
    }
    
    export default App;
*/    