import { Conversation } from "../models/conversation.model.js";
import {Message} from "../models/Message.mode.js"
import { getReciverSocketId,io } from "../socket/socket.js";
export const sendMessage = async (req, res) => {
 try {
   const { id: reciverId } = req.params;
   const { message } = req.body;
   const senderId = req.user._id;

   let conversation = await Conversation.findOne({
     participants: { $all: [senderId, reciverId] },
   });

   if (!conversation) {
     conversation = await Conversation.create({
       participants: [senderId, reciverId],
     });
   }
   const newMessage = new Message({
     senderId,
     reciverId,
     message,
   });
   if (newMessage) {
     conversation.messages.push(newMessage._id);
   }

   await Promise.all([conversation.save(), newMessage.save()]);

   // SOCKET IO FUNCTIONALITY WILL GO HERE
     const receiverSocketId = getReciverSocketId(reciverId);
     console.log("checking for This now is worked or not" ,receiverSocketId,reciverId)
   if (receiverSocketId) {
     // io.to(<socket_id>).emit() used to send events to specific client
     io.to(receiverSocketId).emit("newMessage", newMessage);
   }

   res.status(201).json(newMessage);
 } catch (error) {
    	console.log("Error in sendMessage controller: ", error.message);
      res.status(500).json({ error: "Internal server error" });
 }

}
export const getMessage = async(req, res) => {
    try {
    const { id:userToChatId } = req.params
        const reciverId = req.user._id;
        const conversation = await Conversation.findOne({
            participants: { $all: [reciverId, userToChatId] }
        }).populate("messages");

        if (!conversation) {
            return res.status(200).json([]);
        }
        res.status(200).json(conversation.messages);

    } catch (error) {
        console.log("Error im getMessage", error.message);
        res.status(500).json(error.message)

 }
}