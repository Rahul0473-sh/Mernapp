import http from "http";
import { Server } from "socket.io"
import express from "express"

export const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
        origin: ["http://localhost:3000"],
      methods:['GET','POST'],
    },
});
export const getReciverSocketId = (reciverId) => {
  return userSocketMap[reciverId];
};
const userSocketMap = {}// {userId: socketId},


io.on("connection", (socket) => {
    console.log("a user is connected with user id", socket.id);

    const userId = socket.handshake.query.userId
  if (userId != "undefined") userSocketMap[userId] = socket.id;
  
    // io emit is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  
  // socket.on() is used to listen to the evnets to all the connected clients
    socket.on('disconnect', () => {
      console.log("User disconnected", socket.id);
      delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
})
export { io, server };