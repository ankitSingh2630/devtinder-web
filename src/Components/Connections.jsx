import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utils/connectionSlice';

const Connections = () => {
    const dispatch=useDispatch();

    const connection= useSelector((store)=>store.connection)
    const fetchConnections=async()=>{
        try {
            if(connection)return;
            const res=await axios.get(BASE_URL+ "/user/connections",{withCredentials:true})

            // console.log(res?.data?.data)
            dispatch(addConnection(res?.data?.data))
            
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchConnections()
    },[])
    if(!connection)return;
    if(connection.length == 0){
        return <div>No Connection found</div>
    }
  return (
    <div className='text-center my-10'>
       <div>
         <h1 className='text-4xl text-white font-bold'>Connections</h1>
        {connection.map((conn,idx)=>{
            const{firstName,lastName,age,gender,photoUrl,about}=conn;
            return(
            <div className='flex m-4 p-4 bg-base-300 w-1/2 mx-auto' key={idx}>
                <div>
                    <img alt='photo' 
                    className='w-20 h-25 rounded-full'
                     src={photoUrl}/>

                </div>
                <div className='text-left mx-4'>
                 <h2 className='text-xl font-bold'>{firstName +" "+lastName}</h2>
                 {age && gender&& <p>{age +", "+gender}</p>}
                <p>{about}</p>   
                </div>
                
            </div>
        )
        })}
       </div>
    </div>
  )
}

export default Connections