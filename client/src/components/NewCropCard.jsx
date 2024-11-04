import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import Translator from '../util/Translator'; // Ensure Translator is correctly imported

const language = Cookies.get("language");

const NewCropCard = ({ crops }) => {
  const { t } = useTranslation();
  const [selectedCrop, setSelectedCrop] = useState(crops[0].name);
  const [translatedTexts, setTranslatedTexts] = useState([]);
  const [hasTranslated, setHasTranslated] = useState(false); // State to track translation

  console.log(crops)
  // Extract texts to translate from the crops array
  const textsToTranslate = crops.flatMap(crop => [crop.name, crop.description]);

  const handleTranslations = (translations) => {
    setTranslatedTexts(translations);
    setHasTranslated(true); // Set to true after successful translation
  };

  const handleChange = (event) => {
    setSelectedCrop(event.target.value);
  };

  return (
    <div id="scene" style={styles.scene}>
      <div id="left-zone" style={styles.leftZone}>
        <ul className="list" style={styles.list}>
          <h6 style={{ paddingLeft: 40, marginBottom: 30, fontSize: 20 }}>{t('HTop5')}</h6>
          {hasTranslated ? (
            crops.map((c, index) => (
              <li className="item" key={index} style={{
                ...styles.item,
                transition: 'opacity 0.75s ease-out, top 0.75s ease-out',
              }}>
                <input
                  type="radio"
                  id={`radio_${c.name}`}
                  name="basic_carousel"
                  value={c.name}
                  checked={selectedCrop === c.name}
                  onChange={handleChange}
                  style={styles.input}
                />
                <label
                  htmlFor={`radio_${c.name}`}
                  className={`label_${c.name}`}
                  style={{
                    ...styles.label,
                    opacity: selectedCrop === c.name ? 1 : 0.3,
                    textDecoration: selectedCrop === c.name ? 'underline' : '',
                  }}
                >
                  <img
                    src={`${index + 1}.svg`}
                    style={styles.svgIcon}
                  />
                  {/* Use translated text if available, otherwise use original */}
                  {translatedTexts[index * 2] || c.name}
                </label>
                <div
                  className={`content content_${c.name} ${selectedCrop === c.name ? 'active' : ''}`}
                  style={{
                    ...styles.content,
                    opacity: selectedCrop === c.name ? 1 : 0,
                  }}
                >
                  <span
                    className="picto"
                    style={{
                      ...styles.picto,
                      backgroundImage: `url(${c.image})`,
                    }}
                  ></span>
                  <h1>{translatedTexts[index * 2] || c.name}</h1>
                  <h5>{translatedTexts[index * 2 + 1] || c.description}</h5>
                </div>
              </li>
            ))
          ) : (
            <Translator 
              textsToTranslate={textsToTranslate} 
              targetLang={language} 
              onTranslated={handleTranslations} 
            />
          )}
        </ul>
      </div>
      <div id="middle-border" style={styles.middleBorder}></div>
      <div id="right-zone" style={styles.rightZone}></div>
    </div>
  );
};

const styles = {
  scene: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'left',
    width: '1000px',
    height: '400px',
    position: 'relative',
    margin: 'auto',
    backgroundColor: '#c7e8ff',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    overflow: 'hidden',
  },
  leftZone: {
    background: '#fff',
    backgroundColor: '#c7e8ff',
    height: '75%',
    display: 'flex',
    width: '350px',
    alignItems: 'center',
    justifyContent: 'left',
  },
  list: {
    display: 'flex',
    listStyle: 'none',
    alignContent: 'stretch',
    flexDirection: 'column',
    flexGrow: 1,
    margin: 0,
    padding: 0,
  },
  item: {
    // position: 'relative',
  },
  input: {
    display: 'none',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 25,
    color: 'black',
    height: '50px',
    textAlign: 'left',
    cursor: 'pointer',
    paddingLeft: '10px',
  },
  svgIcon: {
    width: '40px',
    height: '40px',
    marginRight: '70px',
  },
  content: {
    position: 'absolute',
    left: '350px',
    top: '0px',
    width: '650px',
    height: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    transition: 'all 0.25s ease-out',
  },
  picto: {
    height: '300px',
    width: '300px',
    borderRadius: 200,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  middleBorder: {
    opacity: 0.4,
    backgroundColor: 'black',
    height: '75%',
    flexGrow: 1,
    maxWidth: '2px',
    zIndex: 0,
  },
  rightZone: {
    background: '#fff',
    backgroundColor: '#d5eeff',
    height: '100%',
    flexGrow: 3,
  },
};

export default NewCropCard;
