import React from "react";
import "./OurTeam.css";
import ceo from "../../assets/ceo.jpg";
import coo from "../../assets/coo.jpg";
import cto from "../../assets/cto.jpg";

const teamMembers = [
  {
    name: "John Doe",
    role: "Chief Executive Officer",
    motto: "Innovation distinguishes between a leader and a follower.",
    image: ceo, // Replace with actual image path
  },
  {
    name: "Jane Smith",
    role: "Chief Operations Officer",
    motto: "Leadership is not about titles, it is about impact.",
    image: coo, // Replace with actual image path
  },
  {
    name: "Mark Johnson",
    role: "Chief Technology Officer",
    motto: "Technology empowers business transformation.",
    image: cto, // Replace with actual image path
  },
];

const OurTeam = () => {
  return (
    <div className="our-team-container">
      <h2 className="team-title">Meet Our Team</h2>
      <div className="team-members">
        {teamMembers.map((member, index) => (
          <div className="team-member" key={index}>
            <img src={member.image} alt={member.name} className="team-member-image" />
            <h3 className="team-member-name">{member.name}</h3>
            <p className="team-member-role">{member.role}</p>
            <p className="team-member-motto">"{member.motto}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurTeam;
