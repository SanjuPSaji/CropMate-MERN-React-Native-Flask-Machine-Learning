import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { Home, Login, Signup } from "./pages";
import Update from "./components/Update";
import Navbar from "./components/Navbar";

function App() {
  const location = useLocation();

  // Check if the current route is either login or signup page
  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";
  return (
    <>
      
      {!isLoginPage && !isSignupPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/update" element={<Update />} />
      </Routes>
    </>
  );
}

export default App;
