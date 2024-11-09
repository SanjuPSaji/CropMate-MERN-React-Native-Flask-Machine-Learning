import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../api';
import Cookies from 'js-cookie';
import axios from 'axios';

const languageName = Cookies.get("languageName");


const Ideal = ({ cropName, soilConditions }) => {
  const [adjustmentSuggestion, setAdjustmentSuggestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [buttonVisible, setButtonVisible] = useState(true);  const { t } = useTranslation();


  const getSoilAdjustmentSuggestion = async () => {
    const instruction = (languageName === "Default" || languageName === "English") ? '' : ` Give instructions in stict ${languageName} Language with no other words than the ${languageName} words.`;
    const url = "https://chatgpt-42.p.rapidapi.com/chatgpt";
    const headers = {
      "Content-Type": "application/json",
      "x-rapidapi-key": api,
      "x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
    };

    // Format the soil conditions into a readable string for GPT
    const conditionsText = `Nitrogen: ${soilConditions[0]}, Phosphorus: ${soilConditions[1]}, Potassium: ${soilConditions[2]}, Temperature: ${soilConditions[3]}°C, Humidity: ${soilConditions[4]}%, pH: ${soilConditions[5]}, Rainfall: ${soilConditions[6]} mm`;

    const payload = {
      messages: [
        {
          role: "user",
          content: `Given the following soil conditions for ${cropName}: ${conditionsText}.
          Please compare these values to the ideal conditions for growing ${cropName} and suggest adjustments the farmer should make to optimize the soil based on their soil condition data and environment for this crop.${instruction}`,
        },
      ],
      web_access: false,
    };

    try {
      console.log(payload.messages)
      const response = await axios.post(url, payload, { headers });
      setAdjustmentSuggestion(response.data.result); // Adjust this line according to your response structure
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error.message);
      setError("Failed to fetch soil adjustment suggestion.");
    } finally {
      setLoading(false);
    }
  };

  const formatSuggestion = (suggestion) => {
    const parts = suggestion.split(/\n/).map((line, index) => {
      // Split on bold and italic markers
      const lineParts = line.split(/(\*\*.*?\*\*|\*.*?\*)/).filter(Boolean);
      return (
        <p key={index}>
          {lineParts.map((part, idx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={idx}>{part.slice(2, -2)}</strong>; // Bold text
            } else if (part.startsWith('*') && part.endsWith('*')) {
              return <em key={idx}>{part.slice(1, -1)}</em>; // Italic text
            } else {
              return part; // Regular text
            }
          })}
        </p>
      );
    });
    return parts;
  };
  

  const handleAskSuggestion = () => {
    setLoading(true); // Set loading state before fetching
    setError(null); // Clear any previous error
    setButtonVisible(false); // Hide the button after clicking
    getSoilAdjustmentSuggestion();
  };

  useEffect(() => {
    setAdjustmentSuggestion(''); // Reset suggestion when cropName or soilConditions change
    setButtonVisible(true); // Show the button again
  }, [cropName, soilConditions]);

  return (
    <div className='grow_container'>
      <h3>{t("Ideal")}{t(cropName)}</h3>
      {buttonVisible && (
        <button onClick={handleAskSuggestion} style={styles.askButton}>
          <span style={{color:'black' }}>{t("Ask")}</span>
          <img 
            src="ai.svg" 
            alt="AI icon" 
            style={{ width: '24px', height: '24px', verticalAlign: 'middle', marginLeft:'-2px' }} // Set the image size
          />
          <span style={{ marginLeft: '2px', color:'black' }}>{t("Sugg")}</span>
        </button>
      )}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {adjustmentSuggestion && formatSuggestion(adjustmentSuggestion)}
    </div>
  );
};

const styles = {
  askButton: {
    margin: '10px 0',
    padding: '8px 12px',
    fontSize: '16px',
    cursor: 'pointer',
    border: '1px solid black',
    backgroundColor: "#c7e8ff",
  },
};

export default Ideal;
