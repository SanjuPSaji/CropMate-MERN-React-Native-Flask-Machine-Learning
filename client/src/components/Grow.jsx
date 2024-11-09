import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../api';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

const languageName = Cookies.get("languageName");

const Grow = ({ cropName }) => {
  const [growingSuggestion, setGrowingSuggestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [buttonVisible, setButtonVisible] = useState(true);
  const { t } = useTranslation();

  const getGrowingSuggestion = async (cropName) => {
    const instruction = (languageName === "Default" || languageName === "English") ? '' : ` Give instructions in ${languageName} Language with no other words than the ${languageName} words.`;
    const url = "https://chatgpt-42.p.rapidapi.com/chatgpt";
    const headers = {
      "Content-Type": "application/json",
      "x-rapidapi-key": api,
      "x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
    };
    const payload = {
      messages: [{ role: "user", content: `How to grow ${cropName}?${instruction}` }], 
      web_access: false,
    };

    try {
      console.log(payload)
      const response = await axios.post(url, payload, { headers });
      const suggestion = response.data.result;
      setGrowingSuggestion(suggestion);
      console.log(suggestion);
    } catch (error) {
      console.error("Error:", error.message);
      setError("Failed to fetch growing suggestion.");
    } finally {
      setLoading(false);
    }
  };

  const formatSuggestion = (suggestion) => {
    const parts = suggestion.split(/\n/).map((line, index) => {
      const lineParts = line.split(/(\*\*.*?\*\*)/).filter(Boolean);
      return (
        <p key={index}>
          {lineParts.map((part, idx) =>
            part.startsWith('**') && part.endsWith('**') ? (
              <strong key={idx}>{part.slice(2, -2)}</strong>
            ) : (
              part
            )
          )}
        </p>
      );
    });
    return parts;
  };

  const handleAskSuggestion = () => {
    setLoading(true);
    setError(null);
    setButtonVisible(false);
    getGrowingSuggestion(cropName);
  };

  useEffect(() => {
    setGrowingSuggestion('');
    setButtonVisible(true);
  }, [cropName]);

  return (
    <div className="grow_container">
      <h3>{t('HowGrow')}{t(cropName)}?</h3>
      {buttonVisible && (
        <button onClick={handleAskSuggestion} style={styles.askButton}>
          <span style={{color:'black' }}>{t("Ask")}</span>
          <img 
            src="ai.svg" 
            alt="AI icon" 
            style={{ width: '24px', height: '24px', verticalAlign: 'middle', marginLeft:'-2px' }} 
          />
          <span style={{ marginLeft: '2px' ,color:'black'}}>{t("Sugg")}</span>
        </button>
      )}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {growingSuggestion && formatSuggestion(growingSuggestion)}
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

export default Grow;
