import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import url from '../url';


const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    name: "",
    password: "",
  });
  const { email, password, name } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
      toast.error(err, {
        position: "bottom-left",
      });
  
  const handleSuccess = (msg) =>
      toast.success(msg, {
        position: "top",
      });
  
  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          `${url}/signup`,
          {
            ...inputValue,
          },
          { withCredentials: true }
        );
        const { success, message,token } = data;
        if(token){
          Cookies.set('token', token);
          }
        if (success) {
          handleSuccess(message);
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          handleError(message);
        }
      } catch (error) {
        console.log(error);
      }
      setInputValue({
        ...inputValue,
        email: "",
        password: "",
        name: "",
      });
    };
  

  return (
    
    <div className="signup_container" style={{ backgroundImage: `url("LOGIN.png")`, backgroundSize: "cover" }}>
    <div className="form_container" >
      <h1 style={{marginTop:-250, fontFamily: "cursive", 
fontStyle: "italic bold ", fontSize:"60px"}} >Crop Mate</h1>
          <h2 style={{}}>Signup Account</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={handleOnChange}
              />
            </div>
            <div>
              <label htmlFor="email">Name</label>
              <input
                type="text"
                name="name"
                value={name}
                placeholder="Enter your Name"
                onChange={handleOnChange}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                placeholder="Enter your password"
                onChange={handleOnChange}
              />
            </div>
            <button type="submit">Submit</button>
            <span>
              Already have an account? <Link to={"/login"}>Login</Link>
            </span>
          </form>
      <Toaster />
        </div>
        </div>
  )
}

export default Signup