import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import Login from "./Login";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await axios.get(BASE_URL + "/logout", { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err.message);
    }
  };
  // if(!user) return navigate("/login");

  return (
    <header className="site-nav">
      <Link to="/" className="brand">
        <span className="brand-mark">&lt;/&gt;</span>DevTinder
      </Link>
      {user && (
        <>
          <nav className="nav-links">
            <Link className="nav-link" to="/">
              Discover
            </Link>
            <Link className="nav-link" to="/connections">
              Connections
            </Link>
            <Link className="nav-link" to="/requests">
              Requests
            </Link>
            <Link className="nav-link" to="/profile">
              Profile
            </Link>
          </nav>
          <details className="user-menu">
            <summary>
              <span className="nav-user-name">Hey, {user.firstName}</span>
              {user.photoUrl ? (
                <img className="avatar" src={user.photoUrl} alt="Profile" />
              ) : (
                <span className="avatar avatar-fallback">
                  {user.firstName?.[0]}
                </span>
              )}
            </summary>
            <div className="menu-panel">
              <Link to="/profile">Profile</Link>
              <Link to="/connections">Connections</Link>
              <Link to="/requests">Requests</Link>
              <button onClick={handleLogout}>Log out</button>
            </div>
          </details>
        </>
      )}
    </header>
  );
};
export default Navbar;
