import express from "express"
import dotenv from "dotenv"

import authroutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"
import connectDB from "./db/connectTomongodb.js";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js"
import path from "path"
dotenv.config();

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

server.listen(process.env.PORT, async() => {
    try {
       await connectDB();
        console.log(`App is runing on this server ${process.env.PORT}`);  
    } catch (error) {
        console.log(`Error while listening the app ${error.message}`);    
    }
})

app.use("/api/auth", authroutes);
app.use("/api/message", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
})