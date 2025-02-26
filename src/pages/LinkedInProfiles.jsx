import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button, Container, Row, Col, Form } from "react-bootstrap";
import profilesData from "../data/profiles.json"; // Import JSON data

const LinkedInProfiles = () => {
  const [selectedBranch, setSelectedBranch] = useState("All");

  // Extract unique branch names from JSON data
  const branches = ["All", ...new Set(profilesData.map(profile => profile.Branch))];

  // Filter profiles based on selected branch
  const filteredProfiles = selectedBranch === "All"
    ? profilesData
    : profilesData.filter(profile => profile.Branch === selectedBranch);

  return (
    <div className="page-container">
    <Container className="mt-4">
      <h1 className="text-center text-primary">LinkedIn Profiles</h1>
      
      {/* Dropdown to filter by branch */}
      <Form className="mb-4">
        <Form.Group controlId="branchSelect">
          <Form.Label>Select Branch</Form.Label>
          <Form.Select value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)}>
            {branches.map(branch => (
              <option key={branch} value={branch}>{branch}</option>
            ))}
          </Form.Select>
        </Form.Group>
      </Form>

      {/* Display LinkedIn Profile Cards */}
      <Row className="g-4">
        {filteredProfiles.map((profile, index) => (
          <Col md={6} key={index}>
            <Card className="shadow-sm border-2 border-primary">
              <Card.Body>
                <Card.Title className="fw-bold text-dark">{profile["Alumni Name"]}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{profile.Role}</Card.Subtitle>
                <Card.Text><strong>Branch:</strong> {profile.Branch}</Card.Text>
                <Button variant="primary" onClick={() => window.open(profile.Profile, "_blank")}>
                  Connect on LinkedIn
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    </div>
  );
};

export default LinkedInProfiles;
