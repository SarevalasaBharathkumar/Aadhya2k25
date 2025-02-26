import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsPlus, BsTrash, BsCheck, BsX } from "react-icons/bs";
import "../styles/pages.css";
import tech from '../components/images/tech.jpeg';
import arts from '../components/images/arts.jpeg';
import dance from '../components/images/dance.jpeg';
import music from '../components/images/music.jpg';
import sports from '../components/images/sports.jpeg';
import yoga from '../components/images/yoga.png';

// Sample Database with Logos
const allClubs = [
    {
        id: 1,
        name: "Tech Club",
        logo: tech,
        coordinators: ["coordinator1@example.com"],
        members: ["student1@example.com", "student2@example.com"],
        events: ["Hackathon", "Workshop"],
        joinRequests: ["student7@example.com"]
    },
    {
        id: 2,
        name: "Music Club",
        logo: music,
        coordinators: ["coordinator2@example.com"],
        members: ["student3@example.com", "student4@example.com"],
        events: ["Concert", "Practice Session"],
        joinRequests: []
    },
    {
        id: 3,
        name: "Sports Club",
        logo: sports,
        coordinators: ["coordinator1@example.com", "coordinator3@example.com"],
        members: ["student5@example.com", "student6@example.com"],
        events: ["Football Match", "Cricket League"],
        joinRequests: ["student8@example.com"]
    },
    {
        id: 4,
        name: "Dance Club",
        logo: dance,
        coordinators: ["coordinator2@example.com", "coordinator5@example.com"],
        members: ["student5@example.com", "student6@example.com","student7@example.com"],
        events: ["FlashMob", "Stage Performance"],
        joinRequests: ["student8@example.com"]
    },
    {
        id: 5,
        name: "Arts Club",
        logo: arts,
        coordinators: ["coordinator8@example.com", "coordinator9@example.com"],
        members: ["student5@example.com", "student9@example.com"],
        events: ["Drawing Competition"],
        joinRequests: ["student10@example.com"]
    },
    {
        id: 6,
        name: "Yoga Club",
        logo: yoga,
        coordinators: ["coordinator0@example.com", "coordinator10@example.com"],
        members: ["student7@example.com", "student9@example.com"],
        events: ["Yoga Performance"],
        joinRequests: ["student5@example.com"]
    }
];

// Simulated Logged-in User
const loggedInUser = "coordinator1@example.com";

const Page2 = () => {
    const studentClubs = allClubs.filter(club => club.members.includes(loggedInUser) || club.coordinators.includes(loggedInUser));

    const [clubs, setClubs] = useState(studentClubs);
    const [selectedClub, setSelectedClub] = useState(null);
    const [isCoordinatorMode, setIsCoordinatorMode] = useState(false);
    const [showAllClubs, setShowAllClubs] = useState(false);
    const [joinRequests, setJoinRequests] = useState({});

    const handleSelectClub = (club) => setSelectedClub(club);
    const toggleCoordinatorMode = () => setIsCoordinatorMode(!isCoordinatorMode);

    const handleJoinClub = (club) => {
        setJoinRequests((prevRequests) => ({ ...prevRequests, [club.id]: true }));
    };

    const handleRemoveMember = (member) => {
        if (selectedClub) {
            const updatedClub = { ...selectedClub, members: selectedClub.members.filter(m => m !== member) };
            setSelectedClub(updatedClub);
            setClubs(clubs.map(club => (club.id === selectedClub.id ? updatedClub : club)));
        }
    };

    const handleRemoveEvent = (event) => {
        if (selectedClub) {
            const updatedClub = { ...selectedClub, events: selectedClub.events.filter(e => e !== event) };
            setSelectedClub(updatedClub);
            setClubs(clubs.map(club => (club.id === selectedClub.id ? updatedClub : club)));
        }
    };

    const handleAcceptRequest = (requester) => {
        if (selectedClub) {
            const updatedClub = {
                ...selectedClub,
                members: [...selectedClub.members, requester],
                joinRequests: selectedClub.joinRequests.filter(req => req !== requester)
            };
            setSelectedClub(updatedClub);
            setClubs(clubs.map(club => (club.id === selectedClub.id ? updatedClub : club)));
        }
    };

    const handleRejectRequest = (requester) => {
        if (selectedClub) {
            const updatedClub = {
                ...selectedClub,
                joinRequests: selectedClub.joinRequests.filter(req => req !== requester)
            };
            setSelectedClub(updatedClub);
            setClubs(clubs.map(club => (club.id === selectedClub.id ? updatedClub : club)));
        }
    };

    return (
        <div className="page-container d-flex">
            {/* Clubs Section */}
            <div className={`clubs-container ${selectedClub ? "w-50" : "w-100"} p-3`}>
                <h1 className="text-center">My Clubs</h1>
                <p>University clubs provide students with opportunities to explore their interests, develop skills, and connect with like-minded peers. Clubs like the Film Club, Art Club, Tech Club, and Dance Club allow students to engage in activities such as filmmaking, creative arts, coding, and performing arts. Participating in these clubs enhances the college experience while fostering teamwork, creativity, and leadership skills.</p>
                {/* Toggle Button to View All Clubs */}
                <button className="btn btn-secondary my-2" onClick={() => setShowAllClubs(!showAllClubs)}>
                    {showAllClubs ? "View My Clubs" : "View All Clubs"}
                </button>

                {/* Display Clubs */}
                <div className="row g-3">
                    {(showAllClubs ? allClubs : clubs).map((club) => (
                        <div key={club.id} className="col-md-3">
                            <div
                                className={`card p-3 text-center ${selectedClub?.id === club.id ? "border-primary shadow-lg" : ""}`}
                                onClick={() => handleSelectClub(club)}
                                style={{ cursor: "pointer" }}
                            >
                                <div style={{"display":"flex",justifyContent:"space-between"}}>
                                <img src={club.logo} alt={`${club.name} Logo`} className="club-logo" />
                                <div style={{padding:"10px"}}>
                                <h2 className="card-title">{club.name}</h2>
                                </div>
                                </div>
                                {showAllClubs ? (
                                    club.members.includes(loggedInUser) || club.coordinators.includes(loggedInUser) ? (
                                        <span className="btn badge bg-secondary">Joined</span>
                                    ) : joinRequests[club.id] ? (
                                        <span className="btn badge bg-warning">Requested</span>
                                    ) : (
                                        <button className="btn badge btn-primary" onClick={(e) => {
                                            e.stopPropagation();
                                            handleJoinClub(club);
                                        }}>Join</button>
                                    )
                                ) : null}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Club Information Window (Visible Only When a Club is Selected) */}
            {selectedClub && (
                <div className="club-info-container w-50 p-4 shadow-lg">
                    <div className="d-flex justify-content-between">
                        <h2 className="text-primary">{selectedClub.name}</h2>
                        <button className="btn btn-outline-danger btn-sm" onClick={() => setSelectedClub(null)}>
                            <BsX size={20} />
                        </button>
                    </div>

                    {/* Club Logo */}
                    <div className="text-center">
                        <img src={selectedClub.logo} alt={`${selectedClub.name} Logo`} className="club-info-logo" />
                    </div>

                    {/* Coordinators Section */}
                    <h4 className="mt-3">Coordinators</h4>
                    <ul className="list-group">
                        {selectedClub.coordinators.map((coordinator, index) => (
                            <li key={index} className="list-group-item">{coordinator}</li>
                        ))}
                    </ul>

                    {/* Coordinator Mode Toggle */}
                    {selectedClub.coordinators.includes(loggedInUser) && (
                        <div className="form-check form-switch mt-3">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={isCoordinatorMode}
                                onChange={toggleCoordinatorMode}
                            />
                            <label className="form-check-label">Enable Coordinator Mode</label>
                        </div>
                    )}

                    {/* Events Section */}
                    <h4 className="mt-3">Events</h4>
                    <ul className="list-group">
                        {selectedClub.events.map(event => (
                            <li key={event} className="list-group-item d-flex justify-content-between">
                                {event}
                                {isCoordinatorMode && <button className="btn btn-sm btn-danger" onClick={() => handleRemoveEvent(event)}><BsTrash size={18} /></button>}
                            </li>
                        ))}
                    </ul>

                    {/* Members Section */}
                    <h4 className="mt-3">Members</h4>
                    <ul className="list-group">
                        {selectedClub.members.map(member => (
                            <li key={member} className="list-group-item d-flex justify-content-between">
                                {member}
                                {isCoordinatorMode && <button className="btn btn-sm btn-danger" onClick={() => handleRemoveMember(member)}><BsTrash size={18} /></button>}
                            </li>
                        ))}
                    </ul>

                    {/* Join Requests */}
                    {isCoordinatorMode && selectedClub.joinRequests.length > 0 && (
                        <>
                            <h4 className="mt-3">Join Requests</h4>
                            <ul className="list-group">
                                {selectedClub.joinRequests.map(requester => (
                                    <li key={requester} className="list-group-item d-flex justify-content-between">
                                        {requester}
                                        <div>
                                            <button className="btn btn-sm btn-success me-2" onClick={() => handleAcceptRequest(requester)}><BsCheck size={18} /></button>
                                            <button className="btn btn-sm btn-danger" onClick={() => handleRejectRequest(requester)}><BsX size={18} /></button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Page2;
