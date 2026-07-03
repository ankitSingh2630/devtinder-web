import React from 'react'

const UserCard = ({user}) => {
   
    const{firstName,lastName, photoUrl,age,gender,about,skills}=user;
      // Handle both array and string
  const skillsArray = Array.isArray(skills)
    ? skills
    : skills
        ?.split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);

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
     <div className="flex gap-2 flex-wrap">
          {skillsArray?.map((skill) => (
            <span key={skill} className="badge badge-outline">
              {skill}
            </span>
          ))}
        </div>
    <div className="card-actions justify-end mx-10 ">
      <div className="badge bg-blue-600">
        <button>
            Interested
        </button></div>
      <div className="badge bg-pink-700">
        <button>
            Ignored     
        </button>
      </div>
    </div>
  </div>
</div>
  )
}

export default UserCard