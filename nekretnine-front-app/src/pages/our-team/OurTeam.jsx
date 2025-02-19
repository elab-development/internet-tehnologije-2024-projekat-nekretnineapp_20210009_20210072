import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OurTeam.css";
import ceo from "../../assets/ceo.jpg";
import coo from "../../assets/coo.jpg";
import cto from "../../assets/cto.jpg";

const teamMembers = [
  { name: "John Doe", role: "Chief Executive Officer", image: ceo },
  { name: "Jane Smith", role: "Chief Operations Officer", image: coo },
  { name: "Mark Johnson", role: "Chief Technology Officer", image: cto },
];

const OurTeam = () => {
  const [quotes, setQuotes] = useState({});

  useEffect(() => {
    const fetchQuotes = async () => {
      const newQuotes = {};

      for (const member of teamMembers) {
        try {
          const response = await axios.get("https://dummyjson.com/quotes/random");

          if (response.data && response.data.quote) {
            newQuotes[member.name] = response.data.quote;
          } else {
            throw new Error("No quote found");
          }
        } catch (error) {
          console.error(`Error fetching quote for ${member.name}:`, error);
          newQuotes[member.name] =
            "Leadership is the capacity to translate vision into reality.";
        }
      }

      setQuotes(newQuotes);
    };

    fetchQuotes();
  }, []);

  return (
    <div className="our-team-container">
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
