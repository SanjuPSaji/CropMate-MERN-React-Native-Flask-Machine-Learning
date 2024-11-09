import axios from 'axios';
import api from '../api';

const translateText = async (textsToTranslate, targetLang) => {
  if (targetLang === 'en' || targetLang === 'deff') {
    return textsToTranslate; // If the target language is English or the default, return the original texts
  }

  const options = {
    method: 'POST',
    url: 'https://microsoft-translator-text-api3.p.rapidapi.com/largetranslate',
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
    data: {
      sep: '|',
      text: textsToTranslate.join(' | '),
    },
  };

  try {
    const response = await axios.request(options);
    const translatedTexts = response.data.map(item => item.translations[0].text);
    return translatedTexts[0].split(' | ');
  } catch (error) {
    console.error('Error translating:', error.response ? error.response.data : error.message);
    throw new Error("Failed to translate text.");
  }
};

export default translateText;
