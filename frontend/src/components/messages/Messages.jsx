
import { useEffect, useRef } from "react";
import useGetMessage from "../../hooks/useGetMessage"
import MessageSkeleton from "../../utils/MessageSkeleton";
import Message from "./Message"
import useListenMessages from "../../hooks/useListenMessages";
const Messages = () => {
  const { messages, loading } = useGetMessage();
  useListenMessages();
  const lastMessage = useRef();
  useEffect(() => {

    setTimeout(() => {
      lastMessage.current.scrollIntoView({behaviour:"smooth"})
    }, 1000);
  },[messages])
  
  return (
    <div className="px-4 flex-1 overflow-auto">

      {!loading && messages.length > 0 && messages.map((message) => (
        <div key={message._id} ref={lastMessage}><Message message={message}/> </div>
      ))}

      { loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
       {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
}

export default Messages