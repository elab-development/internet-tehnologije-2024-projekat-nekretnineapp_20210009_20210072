import { useState, useEffect } from "react";
import axios from "axios";


const useQuotes = (teamMembers) => {
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
  }, [teamMembers]);

  return quotes;
};

export default useQuotes;
