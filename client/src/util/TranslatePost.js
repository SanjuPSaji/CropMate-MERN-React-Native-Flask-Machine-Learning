import api from '../api';
import axios from 'axios';

// Function to detect the language of the provided text
export const detectLanguage = async (texts) => {
    console.log(texts)
  //   if (targetLang === 'deff') {
  //     return texts; // Return the texts unchanged
  // }
  const options = {
    method: 'POST',
    url: 'https://microsoft-translator-text-api3.p.rapidapi.com/detectlanguage',
    headers: {
      'x-rapidapi-key': api,
      'x-rapidapi-host': 'microsoft-translator-text-api3.p.rapidapi.com',
      'Content-Type': 'application/json',
    },
    data: texts.map(text => ({ text })),
  };

  try {
    const response = await axios.request(options);
    return response.data; // Return the detected languages
  } catch (error) {
    console.error("Error detecting language:", error);
    throw error; // Rethrow error to be handled by the calling function
  }
};

// Function to translate the provided text to a target language
export const translateText = async (texts, targetLang, detectLang) => {
    if (targetLang === 'deff') {
        return texts; // Return the texts unchanged
    }

  const options = {
    method: 'POST',
    url: 'https://microsoft-translator-text-api3.p.rapidapi.com/translate',
    params: {
      to: targetLang,
      from: detectLang,
      textType: 'plain',
    },
    headers: {
      'x-rapidapi-key': api,
      'x-rapidapi-host': 'microsoft-translator-text-api3.p.rapidapi.com',
      'Content-Type': 'application/json',
    },
    data: texts.map(text => ({ text })),
  };

  try {
    const response = await axios.request(options);
    return response.data.map(item => item.translations[0].text); // Return the translated texts
  } catch (error) {
    console.error("Error translating text:", error);
    throw error; // Rethrow error to be handled by the calling function
  }
};
