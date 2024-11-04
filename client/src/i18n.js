import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import hiTranslations from '../src/locales/hi';
import enTranslations from '../src/locales/en';
import bnTranslations from '../src/locales/bn';
import guTranslations from '../src/locales/gu';
import knTranslations from '../src/locales/kn';
import mlTranslations from '../src/locales/ml';
import mrTranslations from '../src/locales/mr';
import orTranslations from '../src/locales/or';
import paTranslations from '../src/locales/pa';
import taTranslations from '../src/locales/ta';
import teTranslations from '../src/locales/te';
import urTranslations from '../src/locales/ur';
import Cookies from 'js-cookie'; // Import js-cookie

const resources = {
  hi: {
    translation: hiTranslations
  },
  en: {
    translation: enTranslations
  },
  bn: {
    translation: bnTranslations
  },
  gu: {
    translation: guTranslations
  },
  kn: {
    translation: knTranslations
  },
  ml: {
    translation: mlTranslations
  },
  mr: {
    translation: mrTranslations
  },
  or: {
    translation: orTranslations
  },
  pa: {
    translation: paTranslations
  },
  ta: {
    translation: taTranslations
  },
  te: {
    translation: teTranslations
  },
  ur: {
    translation: urTranslations
  },
};

 // Get the language from the cookie, default to 'en' if not set
const languageFromCookie = Cookies.get('language') || 'en';

i18n
  .use(LanguageDetector) // Detects user language
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    resources,
    lng: languageFromCookie, // Set initial language from cookie
    fallbackLng: 'en', // Default language
    debug: true, // Enable debug mode for development
    detection: {
      order: ['queryString', 'cookie'], // Order of language detection
      cache: ['cookie'] // Cache the detected language in cookies
    },
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    react: {
      useSuspense: false, // Disable suspense
    }
  });

export default i18n;
