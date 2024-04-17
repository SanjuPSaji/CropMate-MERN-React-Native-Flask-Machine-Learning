  import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Cookies from 'js-cookie';
import axios from "axios";
import { ToastContainer } from "react-toastify";
import TopCropCard from '../components/TopCropCard'
import RestCropCards from '../components/RestCropCards'
import '../util/config'
import getCropDetails from "../util/CropDetails";
import { FaInstagram, FaTwitter } from 'react-icons/fa'; 
import { Link } from "react-router-dom";
import url from '../url';

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies();
  const [username, setUsername] = useState("");
  const [iid, setIid] = useState('');
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        // navigate("/login");
      }
      const tok = cookies.token
      console.log(tok)
      const { data } = await axios.post(
        `${url}`,
        {tok},
        { withCredentials: true }
      );
      const { status, user, id } = data;
      console.log(data)
      setUsername(user);
      setIid(id);
      window.config.id = id;
      window.config.name = user;
      Cookies.set('id', id);
      Cookies.set('username', user);
      if (!status) {
        removeCookie("token");
        window.config.resetId();
        window.config.resetName();
        Cookies.remove('id');
        navigate("/login");
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  useEffect(() => {
    // Fetch data from your API
    if (window.config.id) { // Check if window.config.id is available
      axios.post(`${url}/Cropfetch`, { id: window.config.id })
        .then(response => {
          // Extract crop names from the response
          const { Crop1, Crop2, Crop3, Crop4, Crop5 } = response.data;
  
          // Store crop names in an array
          const cropNames = [Crop1, Crop2, Crop3, Crop4, Crop5];

        // Create an array to store crop details
        const cropDetailsArray = [];

        // Loop through crop names and fetch details for each crop
        for (const cropName of cropNames) {
          const cropDetails = getCropDetails(cropName);
          cropDetailsArray.push(cropDetails);
        }

        // Set the fetched crop details in state
        setCrops(cropDetailsArray);
        })
        .catch(error => {
          console.error('Error fetching crops:', error);
        });
    }
  }, [window.config.id]); // Run whenever window.config.id changes
  
  console.log(crops)

  return (
    <>
      <div className="home_page">
        
        
        <div className="card_container">
        {crops.length > 0 && <TopCropCard crop={crops[0]} />}
          {crops.length > 0 && <RestCropCards crops={crops} />}
        </div>
      </div>
      
      <div className="footer_columns">
        <div className="contact_details">
          <p> <h3>Contact</h3></p>
          <p>Email: cropmate@email.com</p>
          <p>Phone: +1234567890</p>
        </div>
        <div className="footer_row"></div>
          <div className="footer_column">
            <h3>Account</h3>
            <p>
              <Link to="/signup">Create an account</Link> 
            </p>
          </div>
          
          <div className="footer_column">
            <h3>Follow Us</h3>
            <p className="footer_icons">
              <a href="https://www.instagram.com">
                <FaInstagram style={{ fontSize: "24px", marginRight: "10px" }} />
              </a>
              <a href="https://www.twitter.com">
                <FaTwitter style={{ fontSize: "24px" }} />
              </a>
            </p>
          </div>
        </div>
      
      <ToastContainer />
    </>
  );
};

export default Home;