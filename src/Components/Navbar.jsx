import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { removeUser } from "../utils/userSlice"


const navbar = () => {
  const user = useSelector((store)=>store.user);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handleLogout=async()=>{
    try {
      await axios.get(BASE_URL+"/logout",{withCredentials:true});
      dispatch(removeUser())
      navigate("/login")
     
      
    } catch (err) {
      console.log(err.message)
    }
  }
  return (
<div className="navbar bg-base-300 shadow-sm px-5">
      {/* Logo */}
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-2xl font-bold">DevTinder</Link>
      </div>

      {/* Right Section */}
      {user && (
        <div className="flex items-center">
          <div className="dropdown dropdown-end">
            {/* Dropdown Button */}
            <div
              tabIndex={0}
              role="button"
              className="flex items-center gap-6 cursor-pointer"
            >
              <p className="font-medium text-lg">
                Hey, <span className="font-bold">{user.firstName}</span>
              </p>

              <div className="avatar">
                <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={user.photoUrl}
                    alt="Profile"
                  />
                </div>
              </div>
            </div>

            {/* Dropdown Menu */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
            >
              <li>
                <Link  to="/profile">
                Profile
              </Link>
              </li>
               <li>
                <Link to={"/connections"}>Connections</Link>
              </li>
               <li>
                <Link to={"/requests"}>Requests</Link>
              </li>
              

             
             

              <li>
                <a onClick={handleLogout}> Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default navbar