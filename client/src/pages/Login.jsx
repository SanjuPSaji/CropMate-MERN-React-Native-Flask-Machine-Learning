import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import url from '../url'

console.log(url)

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
    });
  const handleSuccess = (msg) =>
    toast.success('User Logged in Successfully')

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${url}/login`,
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      console.log(data);

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
    });
  };

  return (
    <div className="login_container" style={{ backgroundImage: `url("LOGIN.png")`, backgroundSize: "cover" }}>
    <div className="form_container">
      <h1 style={{marginTop:-200, fontFamily: "cursive", 
fontStyle: "italic bold ", fontSize:"60px"}} >Crop Mate</h1>
      <h2 style={{marginTop:40}}>Login Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
          />
          <label htmlFor="email">Email</label>
          
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
          />          
          <label htmlFor="password">Password</label>
        </div>
        <button type="submit">Submit</button>
        <span>
          Already have an account? <Link to={"/signup"}>Signup</Link>
        </span>
      </form>
      <Toaster />
    </div>
    </div>
  );
};

export default Login;