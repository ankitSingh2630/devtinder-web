import React from 'react'
import { useSelector } from 'react-redux'

const navbar = () => {
  const user = useSelector((store)=>store.user);
  // console.log(user);
  return (
<div className="navbar bg-base-300 shadow-sm px-5">
      {/* Logo */}
      <div className="flex-1">
        <a className="btn btn-ghost text-2xl font-bold">DevTinder</a>
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
                <a> Profile</a>
              </li>

              <li>
                <a> Settings</a>
              </li>

              <li>
                <a> Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default navbar