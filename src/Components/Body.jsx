import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import Login from "./Login";

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const fetchUser = async () => {
    try {
      if (user) return;
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401) navigate("/login");
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  
  if (!user) return null;
  

  return (
    <div className="app-shell">
      <Navbar />
      
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default Body;
