import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "../assets/Button.css";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import url from '../url';
import LanguageSelector from '../components/LanguageSelector';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

const id = Cookies.get("id");
const lang = Cookies.get('language');

const Update = () => {
  const [reloadPage, setReloadPage] = useState(false);
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState(lang);
  const { t } = useTranslation();
  const [fetchedFormData, setFetchedFormData] = useState({});

  useEffect(() => {
    if (!id && !reloadPage) {
      setReloadPage(true);
      window.location.reload();
    }
  }, [id, reloadPage]);

  useEffect(() => {
    const handleLanguageChange = () => {
      const newLanguage = Cookies.get('language') || 'en';
      setSelectedLanguage(newLanguage);
      i18n.changeLanguage(newLanguage); // Update i18n with the new language
    };

    const interval = setInterval(() => {
      const currentLanguage = Cookies.get('language');
      if (currentLanguage !== selectedLanguage) {
        handleLanguageChange();
      }
    }, 100); // Check every 100ms

    return () => clearInterval(interval); // Clean up interval on unmount
  }, [selectedLanguage]);

  const fetchFormData = async () => {
    try {
      const response = await axios.post(`${url}/datafetch`, { id }); // Adjust the URL according to your backend
      if (response.data.status) {
        setFetchedFormData(response.data);
      } else {
        toast.error("No data found for the provided ID.");
      }
    } catch (error) {
      console.error("Error fetching form data:", error);
      toast.error("Error fetching form data.");
    }
  };

  useEffect(() => {
    fetchFormData(); // Fetch data when the component mounts
  }, []);

  const [formData, setFormData] = useState({
    id: id,
    Nitrogen: fetchedFormData.Nitrogen || "",
    Phosphorus: fetchedFormData.Phosphorus || "",
    Potassium: fetchedFormData.Potassium || "",
    Temperature: fetchedFormData.Temperature || "",
    Humidity: fetchedFormData.Humidity || "",
    pH: fetchedFormData.pH || "",
    Rainfall: fetchedFormData.Rainfall || "",
  });

  useEffect(() => {
    // Update formData when fetchedFormData changes
    if (Object.keys(fetchedFormData).length > 0) {
      setFormData({
        id: id,
        Nitrogen: fetchedFormData.Nitrogen || "",
        Phosphorus: fetchedFormData.Phosphorus || "",
        Potassium: fetchedFormData.Potassium || "",
        Temperature: fetchedFormData.Temperature || "",
        Humidity: fetchedFormData.Humidity || "",
        pH: fetchedFormData.pH || "",
        Rainfall: fetchedFormData.Rainfall || "",
      });
    }
  }, [fetchedFormData]);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {


      const response = await fetch(`${url}/datatoml`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const predictdata = await response.json();
 

      const datatoapi = await fetch(`${url}/data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const detailsdata = await datatoapi.json();


      toast.success(detailsdata.message, {
        onClose: setTimeout(function () { navigate("/"); }, 1500)
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="soil">

    <div style={{ display:"flex", paddingTop:20,height : '100%'}} className="flex-container">
      

    <div className="soil_container" style={{
      backgroundColor: "#c9d4f8", flex:2, margin:20}}>
      <h3 style={{paddingBottom: 20,paddingTop:20 }}>
      {t('URecomSystem')}{" "}
        <span role="img" aria-label="plant">
          🌱
        </span>
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="form-floating col-md-6 mt-3 mb-3">
            <input
              type="number"
              id="Nitrogen"
              name="Nitrogen"
              placeholder="Enter Nitrogen"
              className="form-control"
              value={formData.Nitrogen}
              onChange={handleChange}
              min={"0"}
              max={"150"}
              required
              style={{backgroundColor:"#d5eeff"}}
            />
            <label htmlFor="Nitrogen">&nbsp;{t('Nitrogen')} </label>
          </div>
          <div className="form-floating col-md-6 mt-3  mb-3">
            <input
              type="number"
              id="Phosphorus"
              name="Phosphorus"
              placeholder="Enter Phosphorus"
              className="form-control"
              value={formData.Phosphorus}
              onChange={handleChange}
              min={"0"}
              max={"150"}
              required
              style={{backgroundColor:"#d5eeff"}}
            />
            <label htmlFor="Phosphorus">&nbsp;{t('Phosphorus')} </label>
          </div>
          <div className="form-floating col-md-6 mt-3  mb-3">
            <input
              type="number"
              id="Potassium"
              name="Potassium"
              placeholder="Enter Potassium"
              className="form-control"
              value={formData.Potassium}
              onChange={handleChange}
              min={"0"}
              max={"250"}
              required
              style={{backgroundColor:"#d5eeff"}}
            />
            <label htmlFor="Potassium">&nbsp;{t('Potassium')} </label>
          </div>
          <div className="form-floating col-md-6 mt-3 mb-3">
            <input
              type="number"
              id="Temperature"
              name="Temperature"
              placeholder="Enter Temperature"
              className="form-control"
              value={formData.Temperature}
              onChange={handleChange}
              min={"0"}
              max={"50"}
              required
              style={{backgroundColor:"#d5eeff"}}
            />
            <label htmlFor="Temperature">&nbsp;{t('Temperature')} </label>
          </div>
          <div className="form-floating col-md-6 mt-3 mb-3">
            <input
              type="number"
              id="Humidity"
              name="Humidity"
              placeholder="Enter Humidity"
              className="form-control"
              value={formData.Humidity}
              onChange={handleChange}
              min={"10"}
              max={"100"}
              required
              style={{backgroundColor:"#d5eeff"}}
            />
            <label htmlFor="Humidity">&nbsp;{t('Humidity')} </label>
          </div>
          <div className="form-floating col-md-6 mt-3 mb-3">
            <input
              type="number"
              id="pH"
              name="pH"
              placeholder="Enter pH"
              className="form-control"
              value={formData.pH}
              onChange={handleChange}
              min={"2"}
              max={"10"}
              required
              style={{backgroundColor:"#d5eeff"}}
            />
            <label htmlFor="pH">&nbsp;{t('pH')} </label>
          </div>
          <div className="form-floating col-md-6 mt-3 mb-3">
            <input
              type="number"
              id="Rainfall"
              name="Rainfall"
              placeholder="Enter Rainfall"
              className="form-control"
              value={formData.Rainfall}
              onChange={handleChange}
              min={"15"}
              max={"300"}
              required
              style={{backgroundColor:"#d5eeff"}}
            />
            <label htmlFor="Rainfall">&nbsp;{t('Rainfall')} </label>
          </div>
          <div className="col-md-6 mt-3  mb-3">
            <button className="btn-hover color-1">{t('UButton')}</button>
          </div>
        </div>

        <div className="row mt-4" style={{paddingBottom: 65 }}></div>
      </form>
      
      
      <Toaster />
    </div>

        <LanguageSelector selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />
      </div>
    </div>
  );
};

export default Update;
