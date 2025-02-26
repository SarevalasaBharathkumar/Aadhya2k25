import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/pages.css"; // Import CSS

const Page4 = () => {
  const [activeTab, setActiveTab] = useState("schedule");
  const [rsvpedEvents, setRsvpedEvents] = useState([]);

  // Sample class schedule data
  const classSchedule = [
    { day: "Monday", time: "9:00 AM - 10:30 AM", subject: "Mathematics" },
    { day: "Tuesday", time: "11:00 AM - 12:30 PM", subject: "Physics" },
    { day: "Wednesday", time: "2:00 PM - 3:30 PM", subject: "Computer Science" },
    { day: "Thursday", time: "10:00 AM - 11:30 AM", subject: "English" },
  ];

  // Sample exam schedule
  const exams = [
    { subject: "Mathematics", date: "March 10, 2025", time: "9:00 AM" },
    { subject: "Physics", date: "March 15, 2025", time: "11:00 AM" },
    { subject: "Chemistry", date: "March 15, 2025", time: "12:00 AM" },
    { subject: "Telugu", date: "March 17, 2025", time: "9:00 AM" },
    { subject: "English", date: "April 25, 2025", time: "1:00 AM" },
    { subject: "NS", date: "April 29, 2025", time: "11:00 AM" },
    { subject: "Hindhi", date: "April 12, 2025", time: "4:00 AM" },
    { subject: "BIO tech", date: "May 25, 2025", time: "11:00 AM" },
  ];

  // Sample event calendar
  const events = [
    { id: 1, name: "Hackathon", date: "March 20, 2025" },
    { id: 2, name: "Career Fair", date: "April 5, 2025" },
    { id: 3, name: "Hacking ", date: "March 5, 2025" },
    { id: 4, name: "Project guiadance", date: "April 6, 2025" },
    { id: 5, name: "Physocology", date: "April 5, 2025" },
  ];

  // Handle RSVP
  const handleRSVP = (eventId) => {
    setRsvpedEvents([...rsvpedEvents, eventId]);
  };
return (
    <div className="page-container">
      <h1  style={{color:"purple"}}>Welcome to Student Portal</h1>
      <p className="text-center">
        Your one-stop solution for class schedules, exams, and event planning!
      </p>

      {/* Tabs Navigation */}
      <div className="container mt-4">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "schedule" ? "active" : ""}`}
              onClick={() => setActiveTab("schedule")}
            >
              Class Schedule
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "exams" ? "active" : ""}`}
              onClick={() => setActiveTab("exams")}
            >
              Exams & Reminders
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "events" ? "active" : ""}`}
              onClick={() => setActiveTab("events")}
            >
              Events & RSVP
            </button>
          </li>
        </ul>

        {/* Tab Content */}
        <div className="tab-content mt-3">
          {/* Class Schedule */}
          {activeTab === "schedule" && (
            <div className="tab-pane fade show active">
              <h4 className="text-center text-info">Your Class Schedule</h4>
              <table className="table table-bordered table-striped mt-3">
                <thead className="table-dark">
                  <tr>
                    <th>Day</th>
                    <th>Time</th>
                    <th>Subject</th>
                  </tr>
                </thead>
                <tbody>
                  {classSchedule.map((cls, index) => (
                    <tr key={index}>
                      <td>{cls.day}</td>
                      <td>{cls.time}</td>
                      <td>{cls.subject}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Exam Reminders */}
          {activeTab === "exams" && (
            <div className="tab-pane fade show active">
              <h4 className="text-center text-warning">Upcoming Exams</h4>
              <ul className="list-group mt-3">
                {exams.map((exam, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    {exam.subject} - {exam.date} at {exam.time}
                    <span className="badge bg-danger">Reminder Set</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Events with RSVP */}
          {activeTab === "events" && (
            <div className="tab-pane fade show active">
              <h4 className="text-center text-success">Upcoming Events</h4>
              <ul className="list-group mt-3">
                {events.map((event) => (
                  <li key={event.id} className="list-group-item d-flex justify-content-between align-items-center">
                    {event.name} - {event.date}
                    {rsvpedEvents.includes(event.id) ? (
                      <span className="badge bg-success">RSVP'd</span>
                    ) : (
                      <button className="btn btn-outline-primary btn-sm" onClick={() => handleRSVP(event.id)}>
                        RSVP
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page4;
