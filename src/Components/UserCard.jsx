import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({user}) => {

    const dispatch= useDispatch();   
    const{_id,firstName,lastName, photoUrl,age,gender,about,skills}=user;

    const handleSendRequest= async(status,userId)=>{
     try {
      const res=axios.post(BASE_URL+ "/send/" + status +"/" + userId,{},
        {withCredentials:true}
      )
      dispatch(removeUserFromFeed(userId))
     } catch (err) {
      
     }
    }

  return (
    <div className="card bg-base-300 w-76 shadow-sm">
      
     <div className='my-10'>
         <figure >
          <img
            src={photoUrl}
            alt="photo" />
        </figure>
     </div>

  <div className="card-body  flex ju">
    <h2 className="card-title ">
      {firstName} {lastName}
      
    </h2>
    <p>{age}  {gender}</p>
    <p>{about}</p>
     {/* <div className="flex gap-2 flex-wrap">
          {skillsArray?.map((skill) => (
            <span key={skill} className="badge badge-outline">
              {skill}
            </span>
          ))}
        </div> */}
    <div className="card-actions justify-end mx-10 ">
      <div className="badge bg-blue-600">
        <button onClick={()=>handleSendRequest("interested",_id)}>
            Interested
        </button></div>
      <div className="badge bg-pink-700">
        <button onClick={()=>handleSendRequest("ignored",_id)}>
            Ignored     
        </button>
      </div>
    </div>
  </div>
</div>
  )
}

export default UserCard