  import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Cookies from 'js-cookie';
import axios from "axios";
import { ToastContainer } from "react-toastify";
import TopCropCard from '../components/TopCropCard'
import RestCropCards from '../components/RestCropCards'
import '../util/config'

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies();
  const [username, setUsername] = useState("");
  const [iid, setIid] = useState('');
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:4999",
        {},
        { withCredentials: true }
      );
      const { status, user, id } = data;
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
      axios.post('http://localhost:4999/Cropfetch', { id: window.config.id })
        .then(response => {
          // Extract crop names from the response
          const { Crop1, Crop2, Crop3, Crop4, Crop5 } = response.data;
  
          // Store crop names in an array
          const cropNames = [Crop1, Crop2, Crop3, Crop4, Crop5];
          setCrops(cropNames);
        })
        .catch(error => {
          console.error('Error fetching crops:', error);
        });
    }
  }, [window.config.id]); // Run whenever window.config.id changes
  

  return (
    <>
      <div className="home_page">
        
        <h4>
          Welcome <span>{username}</span>
        </h4>
        <div className="card_container">
        {crops.length > 0 && <TopCropCard crop={crops[0]} />}
          {crops.length > 0 && <RestCropCards crops={crops} />}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;