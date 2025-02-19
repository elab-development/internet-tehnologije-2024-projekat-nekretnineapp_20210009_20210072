import React from "react";
import "./OurTeam.css";
import ceo from "../../assets/ceo.jpg";
import coo from "../../assets/coo.jpg";
import cto from "../../assets/cto.jpg";
import useQuotes from "../../hooks/useQuotes"; // Import the custom hook
import { Link } from "react-router-dom";

const teamMembers = [
  { name: "John Doe", role: "Chief Executive Officer", image: ceo },
  { name: "Jane Smith", role: "Chief Operations Officer", image: coo },
  { name: "Mark Johnson", role: "Chief Technology Officer", image: cto },
];

const OurTeam = () => {
  const quotes = useQuotes(teamMembers); // Fetch quotes using the custom hook

  return (
    <div className="our-team-container">
      <nav className="breadcrumbs-4">
              <Link to="/">Home</Link> / <span>Our Team</span>
      </nav>
      <h2 className="team-title">Meet Our Team</h2>
      <div className="team-members">
        {teamMembers.map((member, index) => (
          <div className="team-member" key={index}>
            <img src={member.image} alt={member.name} className="team-member-image" />
            <h3 className="team-member-name">{member.name}</h3>
            <p className="team-member-role">{member.role}</p>
            <p className="team-member-motto">"{quotes[member.name] || "Loading quote..."}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurTeam;
