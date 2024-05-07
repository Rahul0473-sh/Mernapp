import { useEffect, useState } from "react";
import useConversation from "../zustand/useConverstaion"
import toast from "react-hot-toast";

const useGetMessage = () => {
    const { selectedConversation, messages, setMessages } = useConversation();
  const [loading, setLoading] = useState(false);


    useEffect(() => {
        const getMessage = async () => {
          try {
            setLoading(true);
            const res = await fetch(`/api/message/${selectedConversation._id}`);
            const data = await res.json();
            if (data.error) {
              throw new Error(data.error);
            }
            setMessages(data);
          } catch (error) {
            toast.error(error.message);
          } finally {
            setLoading(false);
          }
        };
        if (selectedConversation?._id) getMessage();
    }, [selectedConversation?._id])
    return { messages, loading };

}

export default useGetMessage