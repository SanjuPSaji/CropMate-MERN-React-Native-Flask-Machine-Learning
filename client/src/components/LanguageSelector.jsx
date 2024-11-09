// src/LanguageSelector.jsx
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLanguage } from '@fortawesome/free-solid-svg-icons'; 
import url from '../url'; 
import { useTranslation } from 'react-i18next';

const LanguageSelector = ({ selectedLanguage, setSelectedLanguage }) => {
  const userId = Cookies.get('id');
  const { t } = useTranslation();

  const languages = [
    { code: 'deff', name: 'Default', full: 'Default' },
    { code: 'en', name: 'English', full: 'English'  },
    { code: 'hi', name: 'हिंदी (Hindi)', full: 'Hindi'   },
    { code: 'ml', name: 'മലയാളം (Malayalam)', full: 'Malayalam'   },
    { code: 'gu', name: 'ગુજરાતી (Gujarati)', full: 'Gujarati'   },
    { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)', full: 'Punjabi'   },
    { code: 'bn', name: 'বাংলা (Bengali)' , full: 'Bengali'  },
    { code: 'kn', name: 'ಕನ್ನಡ (Kannada)' , full: 'Kannada'  },
    { code: 'mr', name: 'मराठी (Marathi)', full: 'Marathi'   },
    { code: 'or', name: 'ଓଡିଆ (Oriya)' , full: 'Oriya'  },
    { code: 'ta', name: 'தமிழ் (Tamil)' , full: 'Tamil'  },
    { code: 'te', name: 'తెలుగు (Telugu)', full: 'Telugu'   },
    { code: 'ur', name: 'اردو (Urdu)', full: 'Urdu'   },
];


  const handleLanguageChange = async (event) => {
    const newLanguage = event.target.value;
    const selectedLang = languages.find(lang => lang.code === newLanguage)?.full || "English";
    if (window.confirm(`${t('AlterS')}${selectedLang}?`)) {
      try {
        const response = await axios.post(`${url}/updateLanguage`, { userId, language: newLanguage });

        if (response.data.success) {
          setSelectedLanguage(newLanguage);
          Cookies.set('language', newLanguage);
          Cookies.set('languageName', selectedLang);
          window.location.reload();
        } else {
          alert("Failed to update language. Please try again.");
        }
      } catch (error) {
        // console.log('Error updating language:', error.response ? error.response.data : error.message);
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="dropdown" style={{ flex: 1, margin: 20 }}>
      <h6 style={{ marginBottom: 20, textAlign: 'center', fontSize: 20 }}>
      {t('Langelect')}{' '}
        <FontAwesomeIcon icon={faLanguage} shake style={{ color: '#00d5ff', fontSize: 25 }} />
      </h6>

      <select
        value={selectedLanguage}
        onChange={handleLanguageChange}
        className="form-select"
        style={{ backgroundColor: '#d5eeff' }}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
