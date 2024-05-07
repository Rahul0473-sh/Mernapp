import React from 'react'
import {useAuthContext} from "./../../context/AuthContext"
import useConversation from '../../zustand/useConverstaion';

const Message = ({ message }) => {
  const {authUser} = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? ('chat-end ') : 'chat-start';
  const profilePic = fromMe ? authUser?.profilePic : selectedConversation?.profilePic
  const bgcolor = fromMe ? "bg-blue-500" : "bg-gray-700";
  const shakeClass = message.shouldShake ? "shake" : "";
  
  return (
  <div className={`chat ${chatClassName}`}>
    <div className="chat-image avatar">
      <div className="w-10 rounded-full">
        <img
          alt="Tailwind CSS chat bubble component"
          src={profilePic}
        />
      </div>
    </div>
    <div className={`chat-bubble text-white ${bgcolor} ${shakeClass} pb-2`}>{ message.message}</div>
    <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
      12:42
    </div>
  </div>
);
}

export default Message