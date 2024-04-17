import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { Home, Login, Signup } from "./pages";
import Update from "./pages/Update";
import Navbar from "./components/Navbar";
import Posts from "./pages/Post";
import PostDetails from "./pages/PostDetails";

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
        <Route path="/forum" element={<Posts />} />
        <Route path="/forum/:postId" element={<PostDetails />} />
      </Routes>
    </>
  );
}

export default App;
