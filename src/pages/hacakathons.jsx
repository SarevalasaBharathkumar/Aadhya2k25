import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Card, Row, Col, Container } from "react-bootstrap";
import hackathons from "../data/hackathons"; // Separate file to manage hackathon data
import "../styles/pages.css";

const HackathonHub = () => {
  const [selectedHackathon, setSelectedHackathon] = useState(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="page-container">
      <Container className="mt-4">
        {/* Hero Section */}
        <div className="text-center mb-5">
          <h1 className="fw-bold heading-purple">Hackathon & Project Hub</h1>
          <p className="text-muted">
            Find teammates, join hackathons, and collaborate on research projects. Work together to create innovative solutions and gain hands-on experience.
          </p>
        </div>

        {/* Hackathon List */}
        <Row className="g-4">
          {hackathons.map((hackathon) => (
            <Col md={6} key={hackathon.id}>
              <Card
                className="shadow-sm hackathon-card" // Added purple border class
                onClick={() => {
                  setSelectedHackathon(hackathon);
                  setShowModal(true);
                }}
              >
                <Card.Body>
                  <Card.Title className="fw-bold" >{hackathon.name}</Card.Title>
                  <Card.Subtitle className="text-muted">Deadline: {hackathon.deadline}</Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Hackathon Details Modal */}
        {selectedHackathon && (
          <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title style={{color:"purple"}}>{selectedHackathon.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p><strong>Problem Statement:</strong> {selectedHackathon.problemStatement}</p>
              <p><strong>Stages:</strong> {selectedHackathon.stages}</p>
              <p><strong>Prizes:</strong> {selectedHackathon.prizes}</p>
              <p><strong>Final Round Location:</strong> {selectedHackathon.location}</p>
              <p><strong>Deadline:</strong> {selectedHackathon.deadline}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
              <Button variant="primary">Apply Now</Button>
            </Modal.Footer>
          </Modal>
        )}
      </Container>
    </div>
  );
};

export default HackathonHub;
