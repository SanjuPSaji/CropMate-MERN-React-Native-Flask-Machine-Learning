import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { BsHouseDoorFill, BsPencilSquare, BsChatDots } from "react-icons/bs";
import { MdExitToApp } from "react-icons/md";
import '../util/config';

const Navbar = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies();

  const Logout = () => {
    removeCookie("token");
    window.config.resetId();
    window.config.resetName();
    Cookies.remove('id');
    Cookies.remove('token');
    Cookies.remove('username');
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{
  backgroundColor: "#fff", 
  boxShadow: "0 5px 4px rgba(0, 0, 0, 0.1)"}}>
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a className="navbar-brand" href="/">
              CropMate
            </a>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="/">
                   Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/update">
                  Update
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/forum">
                  Forum
                </a>
              </li>
            </ul>
            <button onClick={Logout} className="btn btn-outline-transparent">
              <MdExitToApp /> Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
