import React from 'react';
import "../assets/Button.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';


const Landing = () => {
const navigate = useNavigate();
const { t } = useTranslation();

const Start = () => {
  navigate("/update");
};
  return (
    <div style={styles.container}>
      <div style={styles.textContainer}>
        <div style={styles.blob}>
          <h1 style={styles.title}>{t('Title')}</h1>
          <h2 style={styles.subtitle}>{t('LSlogan')}</h2>
          <p style={styles.description}>
          {t('LDesc')}
          </p>
          <button className="btnu-hover color-2" style={styles.button} onClick={Start}>{t('LButton')}</button>
        </div>
      </div>
      <div style={styles.imageContainer}>
        <img src="slider-dec.gif" alt="Crop" style={styles.image} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#c9d4f8",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    // height: '100vh',
    padding: '0 50px',
    position: 'relative',
  },
  textContainer: {
    height: '100vh',
    marginTop: '40px',  
    position: 'relative',
  },
  blob: {
    backgroundImage: 'url(blob.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    // margin: '40px',
    padding: '100px',
    borderRadius: '20px',
  },
  title: {
    fontSize: '5em',
    marginBottom: '10px',
    color: '#fff',
  },
  subtitle: {
    fontSize: '2em',
    marginBottom: '20px',
    color: '#fff',
  },
  description: {
    fontSize: '1.2em',
    marginBottom: '30px',
    maxWidth: '500px',
    color: '#fff',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1em',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  imageContainer: {
    // zIndex: 1,
  },
  image: {
    marginTop: '-60px',
    width: '500px',
    height: 'auto',
  },
};

export default Landing;
