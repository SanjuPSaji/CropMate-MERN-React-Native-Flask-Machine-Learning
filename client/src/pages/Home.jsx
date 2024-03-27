  import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Cookies from 'js-cookie';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Update from '../components/Update'
import Navbar from '../components/Navbar'

const Home = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [username, setUsername] = useState("");
  const [iid, setIid] = useState('');
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
      Cookies.set('id', id);
      // const name = Cookies.get('name');
      if (!status) {
        removeCookie("token");
        Cookies.remove('id');
        navigate("/login");
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);
  const Logout = () => {
    removeCookie("token");
    Cookies.remove('id');
    navigate("/login");
  };
  return (
    <>
    <Navbar/>
      <div className="home_page">
        
        <h4>
          {" "}
          Welcome <span>{username}</span>
        </h4>
        <Update/>
        <button onClick={Logout}>LOGOUT</button>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;