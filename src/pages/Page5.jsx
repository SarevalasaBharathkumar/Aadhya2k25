import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import profileImage from "./download.jpeg";
import { FaLinkedin, FaTwitter } from "react-icons/fa";

import "../styles/pages.css";

const initialAlumniData = [
  { id: 1, name: "Alice Johnson", jobTitle: "Software Engineer", email: "alice@example.com", linkedin: "#", twitter: "#", photo: profileImage, achievements: "Developed AI-powered tools for automation." },
  { id: 2, name: "Bob Smith", jobTitle: "Financial Analyst", email: "bob@example.com", linkedin: "#", twitter: "#", photo: profileImage, achievements: "Led a successful market analysis project." },
  { id: 3, name: "Charlie Lee", jobTitle: "Marketing Manager", email: "charlie@example.com", achievements: "Launched successful marketing campaigns.", linkedin: "https://linkedin.com/in/charlie", twitter: "https://twitter.com/charlie", photo: profileImage, details: "Charlie leads the marketing team at DEF Agency and drives innovative campaigns." },
];

const AlumniDirectory = () => {
  const navigate = useNavigate();
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [showWebinars, setShowWebinars] = useState(false);
  const [newWebinar, setNewWebinar] = useState({ title: "", description: "", date: "", zoomLink: "" });
  
  const [webinars, setWebinars] = useState([
    { id: 1, title: "AI in the Industry", description: "A talk on AI advancements by an industry expert.", date: "March 5, 2025", zoomLink: "https://zoom.us/example1" },
    { id: 2, title: "Career Growth Strategies", description: "Tips and insights on career advancement.", date: "March 12, 2025", zoomLink: "https://zoom.us/example2" }
  ]);

  const openProfile = (alumni) => setSelectedAlumni(alumni);
  const closeProfile = () => setSelectedAlumni(null);
  const toggleWebinars = () => {
    setShowWebinars(!showWebinars);
  };
  const handleWebinarInputChange = (e) => setNewWebinar({ ...newWebinar, [e.target.name]: e.target.value });

  const addWebinar = () => {
    setWebinars([...webinars, { id: webinars.length + 1, ...newWebinar }]);
    setNewWebinar({ title: "", description: "", date: "", zoomLink: "" });
  };

  return (
    <div className="page-container">
      <div className="container my-5">
        <button className="btn btn-secondary mb-3 ms-2" onClick={toggleWebinars}>{showWebinars ? "Back to Alumni" : "Go to Webinars"}</button>
        <button className="btn btn-info mb-3 ms-2" onClick={() => navigate("/linkedin")}>Go to Networking</button>
        
        {showWebinars ? (
          <div>
            <h2 className="text-center mb-4">Upcoming Webinars</h2>
            <button className="btn btn-success mb-3" onClick={() => setShowWebinars(!showWebinars)}>Add Webinar</button>
            <div className="row">
              {webinars.map((webinar) => (
                <div key={webinar.id} className="col-md-4 mb-3">
                  <div className="card p-3 shadow d-flex flex-column justify-content-between" style={{ height: "100%" }}>
                    <div>
                      <h5>{webinar.title}</h5>
                      <p>{webinar.description}</p>
                      <p><strong>Date:</strong> {webinar.date}</p>
                    </div>
                    <a href={webinar.zoomLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-auto">
                      Join Webinar
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="row">
            <div className={`col-md-${selectedAlumni ? "4" : "12"} overflow-auto`} style={{ maxHeight: "80vh" }}>
              {initialAlumniData.map((alumni) => (
                <div key={alumni.id} className="card m-2 p-2 text-center shadow alumni-card border border-secondary" style={{ cursor: "pointer", width: "100%" }} onClick={() => openProfile(alumni)}>
                  <img src={alumni.photo} alt={alumni.name} className="card-img-top rounded-circle mx-auto" style={{ width: "100px", height: "100px" }} />
                  <div className="card-body">
                    <h6 className="card-title">{alumni.name}</h6>
                    <p className="card-text text-muted">{alumni.jobTitle}</p>
                  </div>
                </div>
              ))}
            </div>
            {selectedAlumni && (
              <div className="col-md-8">
                <div className="card p-4 shadow">
                  <button className="btn btn-outline-danger align-self-end" onClick={closeProfile}>Close ❌</button>
                  <div className="text-center">
                    <img src={selectedAlumni.photo} alt={selectedAlumni.name} className="rounded-circle my-3" style={{ width: "150px", height: "150px" }} />
                    <h3>{selectedAlumni.name}</h3>
                    <h5 className="text-primary">{selectedAlumni.jobTitle}</h5>
                    <p className="text-muted">{selectedAlumni.achievements}</p>
                    <p>Email: {selectedAlumni.email}</p>
                    <div>
                      <a href={selectedAlumni.linkedin} className="me-3"><FaLinkedin size={30} color="#0077b5" /></a>
                      <a href={selectedAlumni.twitter}><FaTwitter size={30} color="#1da1f2" /></a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlumniDirectory;
