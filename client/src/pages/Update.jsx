import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "../assets/Button.css";
import toast, { Toaster } from 'react-hot-toast';
// import axios from "axios";
const id = Cookies.get("id");
import { Link, useNavigate } from "react-router-dom";
import url from '../url';

const Update = () => {
  const [reloadPage, setReloadPage] = useState(false);
  const navigate = useNavigate();
  // const [iid, setIid] = useState('');
  useEffect(() => {
    if (!id && !reloadPage) {
      // Check if id is not available and page reload is not done
      setReloadPage(true); // Set reloadPage to true to indicate page reload
      window.location.reload();
    }
  }, [id, reloadPage]);


  const [formData, setFormData] = useState({
    id: id,
    Nitrogen: "",
    Phosphorus: "",
    Potassium: "",
    Temperature: "",
    Humidity: "",
    pH: "",
    Rainfall: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);

      const response = await fetch(`${url}/datatoml`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const predictdata = await response.json();
      console.log(predictdata.Crop1);

      const datatoapi = await fetch(`${url}/data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const detailsdata = await datatoapi.json();
      console.log(detailsdata.message);

      toast.success(detailsdata.message,{
        onClose: setTimeout(function () { navigate("/"); }, 1500)
    });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="soil_container" style={{height:"200%"}}>
      <h3>
        Crop Recommendation System{" "}
        <span role="img" aria-label="plant">
          🌱
        </span>
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="form-floating col-md-6 mt-3">
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
            />
            <label htmlFor="Nitrogen">&nbsp;Nitrogen </label>
          </div>
          <div className="form-floating col-md-6 mt-3">
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
            />
            <label htmlFor="Phosphorus">&nbsp;Phosphorus </label>
          </div>
          <div className="form-floating col-md-6 mt-3">
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
            />
            <label htmlFor="Potassium">&nbsp;Potassium </label>
          </div>
          <div className="form-floating col-md-6 mt-3">
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
            />
            <label htmlFor="Temperature">&nbsp;Temperature </label>
          </div>
          <div className="form-floating col-md-6 mt-3">
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
            />
            <label htmlFor="Humidity">&nbsp;Humidity </label>
          </div>
          <div className="form-floating col-md-6 mt-3">
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
            />
            <label htmlFor="pH">&nbsp;pH </label>
          </div>
          <div className="form-floating col-md-6 mt-3">
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
            />
            <label htmlFor="Rainfall">&nbsp;Rainfall </label>
          </div>
          <div className="col-md-6 mt-3">
            <button className="btn-hover color-1">Update Details</button>
          </div>
        </div>

        <div className="row mt-4"></div>
      </form>
      
      
      <Toaster />
    </div>
  );
};

export default Update;
