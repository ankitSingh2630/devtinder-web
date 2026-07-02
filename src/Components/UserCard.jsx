import React from 'react'

const UserCard = (user) => {
    console.log(user)
    console.log(user.firstName);
    const{firstName,lastName, photoUrl,about,skills}=user?.user;
  return (
    <div className="card bg-base-300 w-76 shadow-sm">
      <div className='w-35  mx-19 my-2'>
        <figure >
          <img
            src={photoUrl}
            alt="photo" />
        </figure>
      </div>

  <div className="card-body">
    <h2 className="card-title ">
      {firstName} {lastName}
      
    </h2>
    <p>{about}</p>
    <div className="flex gap-2 flex-wrap">
        {skills?.map((skill) => (
            <span key={skill} className="badge badge-outline">
            {skill}
            </span>
        ))}
    </div>
    <div className="card-actions justify-end">
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