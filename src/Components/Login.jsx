import React from 'react'
import { useState } from 'react'
import axios from 'axios'
// import { useDispatch } from 'react-redux'
// import { addUser } from "../utils/userSlice"
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'



const Login = () => {
    const [emailId, setEmailId] = useState("anil@gmail.com")
    const [password, setPassword] = useState("Anil@123")

    // const dispatch=useDispatch();
    const navigate=useNavigate();

   const handleLogin=async()=>{
    try{
        const res = await axios.post(
            BASE_URL+"/login",
            {
            emailId,
            password
            },
        {
            withCredentials:true
        })
        // dispatch(addUser(res.data))
        return navigate("/");
    }
    catch(err){
        console.log(err.message)
    }
   }
  return (
    <div className=" flex justify-center py-15">
        <div className="card w-96 bg-base-300 card-lg shadow-sm">
        <div className="card-body ">
            <h2 className="card-title font-bold justify-center">Login</h2>
            <div>
                <fieldset className="fieldset m-2">
                <legend className="fieldset-legend">Email</legend>
                <input type="text" 
                 value={emailId} 
                className="input"
                 onChange={(e)=>setEmailId(e.target.value)}
                  />
                </fieldset>
                 <fieldset className="fieldset m-2">
                <legend className="fieldset-legend">Password</legend>
                <input type="text" value={password}
                 className="input"
                 onChange={(e)=>setPassword(e.target.value)}
                 />
                </fieldset>
            </div>
            <div className="justify-end card-actions">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
            </div>
        </div>
        </div>

    </div>
  )
}

export default Login