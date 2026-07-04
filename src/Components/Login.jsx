import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from "../utils/userSlice"
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'


    

const Login = () => {

    const [emailId, setEmailId] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
     const [isLogin, setIsLogin] = useState(true)
    const [error, setError] = useState("")

    const dispatch=useDispatch();
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
        dispatch(addUser(res.data))
        return navigate("/feed");
    }
    catch(err){
        setError(err?.response?.data?.message || "Something went wrong");
        console.log(err.response)
    }
   }

   const handleSignUp=async()=>{
       try {
         const res= await axios.post(BASE_URL+"/signup",{
            firstName,lastName,emailId,password
            },
            {withCredentials:true});
            dispatch(addUser(res.data.data))
            return navigate("/profile");
            
       } catch (err) {
        setError(err?.response?.data?.message || "Something went wrong");
        console.log(err);
       }

        
   }
  return (
    <div className=" flex justify-center py-15">
        <div className="card w-96 bg-base-300 card-lg shadow-sm">
        <div className="card-body ">
            <h2 className="card-title font-bold justify-center">{isLogin? "Login":"Signup"}</h2>
            <div>
                
            {!isLogin &&(
            <>
                <fieldset className="fieldset m-2">
                <legend className="fieldset-legend">firstName</legend>
                <input type="text" value={firstName}
                 className="input"
                 onChange={(e)=>setFirstName(e.target.value)}
                 />
                </fieldset>
                 <fieldset className="fieldset m-2">
                <legend className="fieldset-legend">lastName</legend>
                <input type="text" value={lastName}
                 className="input"
                 onChange={(e)=>setLastName(e.target.value)}
                 />
                 </fieldset>
            </>
            )}
                
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
            <p className='text-red-500'>{error}</p>
            <div className="justify-center card-actions">
            <button className="btn btn-primary" onClick={isLogin?handleLogin:handleSignUp}>{isLogin?"Login":"Signup"}</button>
            </div>
             <p className='cursor-pointer m-auto py-2' onClick={()=>setIsLogin(value=>!value)}>
                {isLogin?
                "New User ? Signup here !"
                :
                "Existing user ? Login here"

                }</p>
        </div>
        </div>

    </div>
  )
}

export default Login