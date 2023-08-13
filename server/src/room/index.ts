
import { Socket } from 'socket.io';
const rooms:Record<string,string[]>={}

export const roomHandler = (socket:Socket)=>{
    socket.on('create-room',({room,email,userPeerInfo})=>{
        rooms[room]=[];
        console.log("User Created the room")
        socket.emit('room-created',{room})
        console.log(userPeerInfo)
    })
    socket.on('join-room',({room}:{room:string})=>{
        socket.join(room);
        console.log("User joined the room ",room)
        // console.log("Peer is " , peerId)
    })
    socket.on('get-peer',(data)=>{
        console.log("Peer Info",data)
    })
}

// const emailToSocketIdMap = new Map();
// const socketidToEmailMap = new Map();

// socket.on('room-join',(data)=>{
//     console.log("User joined the room ")
//     const { email, room } = data;
//     // const email = userInfo?.email;
//     emailToSocketIdMap.set(email, socket.id);
//     socketidToEmailMap.set(socket.id, email);
//     io.to(room).emit("user-joined", { email, id: socket.id });
//     socket.join(room);
//     io.to(socket.id).emit("room-join", data);
// })