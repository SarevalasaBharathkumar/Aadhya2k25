import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsPlus, BsTrash, BsCheck, BsX, BsSearch } from "react-icons/bs";
import "../styles/pages.css"; // Import CSS


// Sample Database
const allClubs = [
  { id: 1, name: "Tech Club", coordinators: ["coordinator1@example.com"], members: ["student1@example.com", "student2@example.com"], events: ["Hackathon", "Workshop"], joinRequests: ["Alice", "Bob"] },
  { id: 2, name: "Music Club", coordinators: ["coordinator2@example.com"], members: ["student3@example.com", "student4@example.com"], events: ["Concert", "Practice Session"], joinRequests: ["Charlie", "David"] },
  { id: 3, name: "Sports Club", coordinators: ["coordinator1@example.com", "coordinator3@example.com"], members: ["student5@example.com", "student6@example.com"], events: ["Football Match", "Cricket League"], joinRequests: ["Eve", "Frank"] }
];

// Simulated Logged-in User
const loggedInUser = "coordinator1@example.com"; // Change for testing

const Page2 = () => {
  const studentClubs = allClubs.filter(club => club.members.includes(loggedInUser) || club.coordinators.includes(loggedInUser));

  const [clubs, setClubs] = useState(studentClubs);
  const [selectedClub, setSelectedClub] = useState(null);
  const [isCoordinatorMode, setIsCoordinatorMode] = useState(false);
  const [showAllClubs, setShowAllClubs] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchAllQuery, setSearchAllQuery] = useState("");

  const handleSelectClub = (club) => setSelectedClub(club);
  const toggleCoordinatorMode = () => setIsCoordinatorMode(!isCoordinatorMode);

  const addEvent = () => {
    const newEvent = prompt("Enter new event name:");
    if (newEvent) {
      setSelectedClub(prev => ({ ...prev, events: [...prev.events, newEvent] }));
    }
  };

  const deleteEvent = (event) => {
    setSelectedClub(prev => ({ ...prev, events: prev.events.filter(e => e !== event) }));
  };

  const removeMember = (member) => {
    setSelectedClub(prev => ({ ...prev, members: prev.members.filter(m => m !== member) }));
  };

  const acceptRequest = (student) => {
    setSelectedClub(prev => ({ 
      ...prev, 
      members: [...prev.members, student], 
      joinRequests: prev.joinRequests.filter(s => s !== student) 
    }));
  };

  const rejectRequest = (student) => {
    setSelectedClub(prev => ({ ...prev, joinRequests: prev.joinRequests.filter(s => s !== student) }));
  };

  const handleJoinClub = (club) => {
    alert(`Join request sent for ${club.name}`);
  };

  const filteredClubs = clubs.filter(club => club.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredAllClubs = allClubs.filter(club => club.name.toLowerCase().includes(searchAllQuery.toLowerCase()));

  return (
    <div className="page-container">
    <div className="container py-4">
      <h1 className="text-center mb-4">My Clubs</h1>

      {/* Search & Toggle All Clubs */}
      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search My Clubs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="btn btn-secondary" onClick={() => setShowAllClubs(!showAllClubs)}>
          {showAllClubs ? "View My Clubs" : "View All Clubs"}
        </button>
      </div>

      {/* Clubs List */}
      {!showAllClubs ? (
        <div className="row g-3">
          {filteredClubs.map(club => (
            <div key={club.id} className="col-md-4">
              <div 
                className={`card p-3 text-center ${selectedClub?.id === club.id ? "border-primary shadow-lg" : ""}`}
                onClick={() => handleSelectClub(club)}
                style={{ cursor: "pointer" }}
              >
                <h5 className="card-title">{club.name}</h5>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Search Bar for All Clubs */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search All Clubs..."
              value={searchAllQuery}
              onChange={(e) => setSearchAllQuery(e.target.value)}
            />
          </div>
          <div className="row g-3">
            {filteredAllClubs.map(club => (
              <div key={club.id} className="col-md-4">
                <div className="card p-3 text-center">
                  <h5 className="card-title">{club.name}</h5>
                  {club.members.includes(loggedInUser) || club.coordinators.includes(loggedInUser) ? (
                    <span className="badge bg-success">Joined</span>
                  ) : (
                    <button className="btn btn-primary btn-sm mt-2" onClick={() => handleJoinClub(club)}>Join</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Club Information Panel */}
      {selectedClub && (
        <div className="col-md-6 mx-auto mt-4">
          <div className="card p-4 shadow-lg">
            <div className="d-flex justify-content-between">
              <h2 className="text-primary">{selectedClub.name}</h2>
              <button className="btn btn-outline-danger btn-sm" onClick={() => setSelectedClub(null)}>
                <BsX size={20} />
              </button>
            </div>

            {/* Coordinator Toggle Switch */}
            {selectedClub.coordinators.includes(loggedInUser) && (
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={isCoordinatorMode}
                  onChange={toggleCoordinatorMode}
                  id="coordinatorModeSwitch"
                />
                <label className="form-check-label" htmlFor="coordinatorModeSwitch">
                  Enable Coordinator Mode
                </label>
              </div>
            )}

            {/* Events Section */}
            <h4 className="mt-3">Events</h4>
            <ul className="list-group mb-2">
              {selectedClub.events.map(event => (
                <li key={event} className="list-group-item d-flex justify-content-between align-items-center">
                  {event}
                  {isCoordinatorMode && <button className="btn btn-sm btn-danger" onClick={() => deleteEvent(event)}><BsTrash size={18} /></button>}
                </li>
              ))}
            </ul>
            {isCoordinatorMode && <button className="btn btn-primary mb-3" onClick={addEvent}><BsPlus size={18} /> Add Event</button>}

            {/* Members Section */}
            <h4>Members</h4>
            <ul className="list-group mb-2">
              {selectedClub.members.map(member => (
                <li key={member} className="list-group-item d-flex justify-content-between align-items-center">
                  {member}
                  {isCoordinatorMode && <button className="btn btn-sm btn-danger" onClick={() => removeMember(member)}><BsTrash size={18} /></button>}
                </li>
              ))}
            </ul>

            {/* Join Requests */}
            {isCoordinatorMode && (
              <>
                <h4>Join Requests</h4>
                <ul className="list-group">
                  {selectedClub.joinRequests.map(student => (
                    <li key={student} className="list-group-item d-flex justify-content-between align-items-center">
                      {student}
                      <div>
                        <button className="btn btn-sm btn-success me-2" onClick={() => acceptRequest(student)}><BsCheck size={18} /></button>
                        <button className="btn btn-sm btn-danger" onClick={() => rejectRequest(student)}><BsX size={18} /></button>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Page2;
