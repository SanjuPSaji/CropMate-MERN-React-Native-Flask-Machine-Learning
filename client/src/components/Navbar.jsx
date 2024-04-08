import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { TbLogout2 } from "react-icons/tb";
import '../util/config'

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
      <nav
        className="navbar navbar-expand-lg justify-content-center"
        style={{ backgroundColor: "#e3f2fd" }}
      >
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
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01" >
            <a className="navbar-brand" href="/">
              CropMate{" "}
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
                <a className="nav-link" href="/forum">Forum</a>
              </li>
            </ul>
              <button onClick={Logout} className="btn btn-outline-transparent" style={{ padding: '0', textAlign: 'left' }}>LOGOUT</button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
