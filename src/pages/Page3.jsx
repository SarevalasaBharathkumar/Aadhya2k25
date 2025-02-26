import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";  // Import Link
import "../styles/pages.css";

const Page3 = () => {
    return (
        <div className="page-container">
            <Container className="mt-5">
                {/* Heading and Description */}
                <div className="text-center mb-4">
                    <h2 className="fw-bold">Explore Opportunities & Collaborations</h2>
                    <p className="text-muted">
                        Connect with recruiters, researchers, and peers to boost your career and interests. 
                        Find job postings, team up for hackathons, and explore clubs that align with your passion.
                    </p>
                </div>

                {/* Three Grids */}
                <Row className="g-4">
                    {/* Internship & Job Posting Board */}
                    <Col md={4}>
                        <Link to="/jobportal" className="text-decoration-none">
                            <Card className="h-100 custom-card">
                                <Card.Body className="text-center">
                                    <Card.Title className="text-primary fw-bold">Internship & Job Board</Card.Title>
                                    <Card.Text>
                                        Browse job openings and internship postings from top companies and universities. 
                                        Apply easily and take your first step toward a successful career.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>

                    {/* Hackathon & Project Collaboration */}
                    <Col md={4}>
                        <Card className="h-100 custom-card">
                            <Card.Body className="text-center">
                                <Card.Title className="text-success fw-bold">Hackathon & Project Hub</Card.Title>
                                <Card.Text>
                                    Find teammates, join hackathons, and collaborate on research projects. 
                                    Work together to create innovative solutions and gain hands-on experience.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Club & Society Discussion */}
                    <Col md={4}>
                        <Card className="h-100 custom-card">
                            <Card.Body className="text-center">
                                <Card.Title className="text-danger fw-bold">Club & Society Discussions</Card.Title>
                                <Card.Text>
                                    Connect with student communities, explore clubs, and engage in discussions. 
                                    Discover extracurricular activities that align with your interests and hobbies.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Page3;
