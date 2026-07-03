import React, { use, useState } from "react";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice"
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const EditProfile = ({user}) => {
  const [firstName, setFirstName] = useState(user.firstName ||"");
  const [lastName, setLastName] = useState(user.lastName||"");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl||"");
  const [age, setAge] = useState(user.age|| "");
  const [gender, setGender] = useState(user.gender || "");
;
  const [about, setAbout] = useState(user.about|| "");
  const [error, setError] = useState("");
  const[toast,setToast]=useState(false);
  const dispatch=useDispatch();

  const updatedData={
    firstName,
    lastName,
    photoUrl,
    age,
    gender,
    about,
    
  }

  const handleSaveProfile = async() => {

     try {
      setError("")
      const res=await axios.patch(
      BASE_URL + "/profile/edit",
      updatedData,
      { withCredentials: true }
    );
   
    // console.log(res?.data?.data);
    dispatch(addUser(res?.data))
     setToast(true)
    
    setTimeout(()=>{
      setToast(false)
    },2000)
     } catch (error) {
      console.log(error)
        setError(error.response?.data || error.message);
     }

  };

  return (
    <div className="flex justify-center py-10">
      <div className="card w-96 bg-base-300 shadow-xl mx-10">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl font-bold">
            Edit Profile
          </h2>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">First Name</legend>
            <input
              type="text"
              className="input w-full"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Last Name</legend>
            <input
              type="text"
              className="input w-full"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Photo URL</legend>
            <input
              type="text"
              className="input w-full"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Age</legend>
            <input
              type="number"
              className="input w-full"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset">
          <legend className="fieldset-legend">Gender</legend>
          <select
            className="select select-bordered w-full"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </fieldset>


          <fieldset className="fieldset">
            <legend className="fieldset-legend">About</legend>
            <textarea
              className="textarea textarea-bordered w-full"
              rows="4"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </fieldset>

          <div className="card-actions justify-center mt-4">
            <button
              className="btn btn-primary w-full"
              onClick={handleSaveProfile}
            >
              Save Profile
            </button>
          </div>
          {error && (
            <p className="text-red-500 text-center mt-2">{error}</p>
          )}
        </div>
      </div>
      <UserCard user={{firstName,lastName,photoUrl,gender,age,about}} />
      {toast &&(
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Message sent successfully.</span>
          </div>
        </div>
      )}
      
    </div>
    
  );
};

export default EditProfile;