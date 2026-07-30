import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage,setNewMessage]=useState('');

  const user= useSelector((store)=>store.user);
  const userId=user?._id;
  const firstName=user?.firstName;
  

  if(!user) return;

  const fetchChat = async()=>{
    const chat = await axios.get(BASE_URL+"/chat/"+targetUserId,{withCredentials:true});
    console.log(chat.data.messages);
    const chatMessages= chat?.data?.messages.map((msg)=>{
      return{
        firstName:msg?.senderId?.firstName,
        lastName:msg?.senderId?.lastName,
        text:msg.text
      }
    })
    setMessages(chatMessages)
  }
  useEffect(()=>{
    fetchChat()
  },[])

  useEffect(()=>{
    const socket=createSocketConnection();

    socket.emit("joinChat",{firstName,targetUserId,userId})

    socket.on("recievedMessage",({text,firstName,lastName})=>{
      setMessages(prev=>[...prev,{ text,firstName,lastName }]);
    })

    return ()=>{
        socket.disconnect();
    }
  },[targetUserId,userId])

  const sendMessage=()=>{
    const socket=createSocketConnection();

    socket.emit("sendMessage",{firstName,lastName:user?.lastName,targetUserId,userId, text:newMessage})
    setNewMessage('');
  }


  return (
    <div className=" w-1/2 mx-auto flex  flex-col m-5   h-[75vh] border border-gray-400 rounded-md">
      <div className="p-3 border-b border-gray-600">Chat</div>
      <div className="flex-1 overflow-y-auto scroll-smooth rounded-lg  shadow-inner p-5">
        {messages.map((msg,idx) => {
          return (
            <div key={idx}>
              <div className={`chat ${msg.firstName === user.firstName ? 'chat-end' : 'chat-start'}`}>
                <div className="chat-header">
                  {msg.firstName+" "+msg.lastName}
                  <time className="text-xs opacity-50">2 hours ago</time>
                </div>
                <div  className="chat-bubble" >{msg.text}</div>
                <div className="chat-footer opacity-50">Seen</div>
              </div>
             
            </div>
          );
        })}
      </div>
      <div className="flex gap-2  items-center border-t border-gray-400 ">
        <input 
        value={newMessage} 
        onChange={((e)=>setNewMessage(e.target.value))}
          type="text"
          placeholder="Type a message"
          className="flex-1  rounded-md p-2"
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white  rounded-md px-2 mx-2">Send</button>
      </div>
    </div>
  );
};

export default Chat;
