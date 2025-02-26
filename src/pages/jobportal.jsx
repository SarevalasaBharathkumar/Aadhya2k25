import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form, Card, Row, Col } from "react-bootstrap";
import jobListings from "../data/jobListings"; // Import job data
import "../styles/pages.css";

const JobPortal = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Filter jobs based on search and type
  const filteredJobs = jobListings.filter(
    (job) =>
      job.role.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterType === "All" || job.type === filterType)
  );

  return (
    <div className="page-container">
      <div className="container mt-4">
        <h2 className="text-center mb-4">Explore Internships & Job Openings</h2>

        {/* Search and Filter Controls */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Search by role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col md={4}>
            <Form.Select onChange={(e) => setFilterType(e.target.value)}>
              <option value="All">All</option>
              <option value="Internship">Internship</option>
              <option value="Remote">Remote</option>
              <option value="Full-time">Full-time</option>
            </Form.Select>
          </Col>
        </Row>

        {/* Job Listings */}
        <Row className="g-4">
          {filteredJobs.length === 0 ? (
            <p className="text-center text-muted">No jobs found.</p>
          ) : (
            filteredJobs.map((job) => (
              <Col md={6} key={job.id}>
                <Card className="shadow-sm custom-card" style={{ cursor: "pointer" }} onClick={() => {
                  setSelectedJob(job);
                  setShowModal(true);
                }}>
                  <Card.Body>
                    <Card.Title className="fw-bold text-primary">{job.title}</Card.Title>
                    <Card.Subtitle className="text-muted">{job.company}</Card.Subtitle>
                    <Card.Text className="mt-2">
                      <strong>Role:</strong> {job.role} <br />
                      <strong>Type:</strong> {job.type}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>

        {/* Job Details Modal */}
        {selectedJob && (
          <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>{selectedJob.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p><strong>Company:</strong> {selectedJob.company}</p>
              <p><strong>Role:</strong> {selectedJob.role}</p>
              <p><strong>Type:</strong> {selectedJob.type}</p>
              <p><strong>Description:</strong> {selectedJob.description}</p>
              <p><strong>Vacancies:</strong> {selectedJob.vacancies}</p>
              <p><strong>Deadline:</strong> {selectedJob.deadline}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
              <Button variant="primary">Apply Now</Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default JobPortal;
