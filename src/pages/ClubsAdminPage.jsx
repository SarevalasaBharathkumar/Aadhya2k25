import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

const clubsData = [
  { id: 1, name: "Tech Club", logo: "tech.jpg", coordinators: ["Alice"], members: ["Bob", "Charlie"], activities: ["Hackathon", "Workshop"] },
  { id: 2, name: "Music Club", logo: "music.jpg", coordinators: ["Dave"], members: ["Eve", "Frank"], activities: ["Concert", "Practice Session"] },
  { id: 3, name: "Art Club", logo: "art.jpg", coordinators: ["Grace"], members: ["Heidi", "Ivan"], activities: ["Painting Exhibition", "Sketching Class"] },
  { id: 4, name: "Tech Club", logo: "tech.jpg", coordinators: ["Alice"], members: ["Bob", "Charlie"], activities: ["Hackathon", "Workshop"] },
  { id: 5, name: "Music Club", logo: "music.jpg", coordinators: ["Dave"], members: ["Eve", "Frank"], activities: ["Concert", "Practice Session"] },
  { id: 6, name: "Tech Club", logo: "tech.jpg", coordinators: ["Alice"], members: ["Bob", "Charlie"], activities: ["Hackathon", "Workshop"] },
  { id: 7, name: "Music Club", logo: "music.jpg", coordinators: ["Dave"], members: ["Eve", "Frank"], activities: ["Concert", "Practice Session"] },
  { id: 8, name: "Tech Club", logo: "tech.jpg", coordinators: ["Alice"], members: ["Bob", "Charlie"], activities: ["Hackathon", "Workshop"] },
  { id: 9, name: "Music Club", logo: "music.jpg", coordinators: ["Dave"], members: ["Eve", "Frank"], activities: ["Concert", "Practice Session"] },
  { id: 10, name: "Tech Club", logo: "tech.jpg", coordinators: ["Alice"], members: ["Bob", "Charlie"], activities: ["Hackathon", "Workshop"] },
  { id: 11, name: "Music Club", logo: "music.jpg", coordinators: ["Dave"], members: ["Eve", "Frank"], activities: ["Concert", "Practice Session"] },
  
];

const AdminPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClub, setSelectedClub] = useState(null);
  const [clubs, setClubs] = useState(clubsData);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const filteredClubs = clubs.filter(club =>
    club.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const closeClubInfo = () => setSelectedClub(null);

  const addClub = () => {
    const name = prompt("Enter club name:");
    const logo = prompt("Enter club logo URL:");
    if (name) {
      setClubs([...clubs, { id: clubs.length + 1, name, logo, coordinators: [], members: [], activities: [] }]);
    }
  };

  const addCoordinator = () => {
    const name = prompt("Enter coordinator name:");
    const email = prompt("Enter coordinator email:");
    if (name && email) {
      setSelectedClub({
        ...selectedClub,
        coordinators: [...selectedClub.coordinators, `${name} (${email})`]
      });
    }
  };

  const removeCoordinator = (coord) => {
    setSelectedClub({
      ...selectedClub,
      coordinators: selectedClub.coordinators.filter(c => c !== coord)
    });
  };

  const deleteClub = () => {
    setClubs(clubs.filter(club => club.id !== selectedClub.id));
    setSelectedClub(null);
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Administration</h1>
      
      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          className="form-control w-75"
          placeholder="Search clubs..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className="btn btn-success" onClick={addClub}>Add Club</button>
      </div>

      <div className="row">
        {/* Clubs List */}
        <div className={`col-md-${selectedClub ? "8" : "12"} row g-3`}>
          {filteredClubs.map(club => (
            <div key={club.id} className="col-md-3">
              <div
                className={`card text-center p-2 ${selectedClub?.id === club.id ? "border-primary shadow-lg" : ""}`}
                onClick={() => setSelectedClub(club)}
                style={{ cursor: "pointer" }}
              >
                <img src={club.logo} alt={club.name} className="card-img-top mx-auto" style={{ width: "80px", height: "80px", borderRadius: "50%" }} />
                <div className="card-body">
                  <h5 className="card-title">{club.name}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Club Information Panel */}
        {selectedClub && (
          <div className="col-md-4">
            <div className="card p-3 shadow-lg">
              <button className="btn btn-danger btn-sm ms-auto mb-2" onClick={closeClubInfo}>Close</button>
              <h2 className="text-primary">{selectedClub.name}</h2>

              <h4 className="mt-3">Coordinators</h4>
              <ul className="list-group mb-2">
                {selectedClub.coordinators.map(coord => (
                  <li key={coord} className="list-group-item d-flex justify-content-between align-items-center">
                    {coord} <button className="btn btn-sm btn-danger" onClick={() => removeCoordinator(coord)}>Remove</button>
                  </li>
                ))}
              </ul>
              <button className="btn btn-primary mb-2" onClick={addCoordinator}>Add Coordinator</button>

              <h4>Members</h4>
              <ul className="list-group mb-2">
                {selectedClub.members.map(member => <li key={member} className="list-group-item">{member}</li>)}
              </ul>

              <h4>Activities</h4>
              <ul className="list-group mb-2">
                {selectedClub.activities.map(activity => <li key={activity} className="list-group-item">{activity}</li>)}
              </ul>

              <button className="btn btn-danger mt-3" onClick={deleteClub}>Delete Club</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
