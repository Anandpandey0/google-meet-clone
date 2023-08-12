import express from 'express';
import http from 'http';
import bodyparser from 'body-parser';
import cookieparser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose'
import router from "./router"

import { Server } from "socket.io";

const app = express();
app.use(cors({
    credentials:true,

}));
app.use(compression());
app.use(cookieparser());
app.use(bodyparser.json());
const server = http.createServer(app);
server.listen(8080 , ()=>{
    console.log("Server running on port 8080");
})
const MONGO_URL ="mongodb+srv://anandpandey1052:rel40417@cluster0.pxvoj5v.mongodb.net/?retryWrites=true&w=majority"

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB!');
});

mongoose.connection.on('error', (error: Error) => {
    console.error('MongoDB connection error:', error);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected.');
});
app.use('/', router());
const io = new Server(8000, {
    cors: {
      origin: "http://localhost:5173", // Set the allowed origin
      credentials: true,
    },
});
const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

io.on("connection",(socket)=>{
    socket.emit('socket-connect','socket is connected');
   
    socket.on('room-join',(data)=>{
        console.log(data)
        const { email, room } = data;
        // const email = userInfo?.email;
        emailToSocketIdMap.set(email, socket.id);
        socketidToEmailMap.set(socket.id, email);
        io.to(room).emit("user-joined", { email, id: socket.id });
        socket.join(room);
        io.to(socket.id).emit("room-join", data);
    })
    socket.on('call-user',(data)=>{
        console.log(data)
    })
})
