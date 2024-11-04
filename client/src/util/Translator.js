import React, { useEffect } from 'react';
import axios from 'axios';
import api from '../api';


const Translator = ({ textsToTranslate, targetLang, onTranslated }) => {
  useEffect(() => {
    const translateTexts = async () => {
      // Check if the target language is the same as the source language
      if (targetLang === 'en' || targetLang === 'deff') {
        onTranslated(textsToTranslate); // If same, return original texts
        return;
      }

      const options = {
        method: 'POST',
        url: 'https://microsoft-translator-text-api3.p.rapidapi.com/translate',
        params: {
          to: targetLang,
          from: 'en',
          textType: 'plain',
        },
        headers: {
          'x-rapidapi-key': api,
          'x-rapidapi-host': 'microsoft-translator-text-api3.p.rapidapi.com',
          'Content-Type': 'application/json',
        },
        data: textsToTranslate.map(text => ({ text })),
      };

      try {
        const response = await axios.request(options);
        const translatedTexts = response.data.map(item => item.translations[0].text);
        onTranslated(translatedTexts);
      } catch (error) {
        console.error('Error translating:', error.response ? error.response.data : error.message);
        onTranslated([]); // Handle failure
      }
    };

    if (textsToTranslate.length > 0) {
      translateTexts();
    }
  }, [textsToTranslate, targetLang, onTranslated]);

  return null; // This component does not render anything
};

export default Translator;
