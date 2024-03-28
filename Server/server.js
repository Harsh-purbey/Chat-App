import express from 'express'
import cors from 'cors'
import {Server} from 'socket.io'
import http from 'http'
import { log } from 'console';

const app =express();
const server =http.createServer(app);
const io =new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","PUT"]
    }
})

io.on("connection",(socket)=>{

    socket.on("join_room",(data) => {
        socket.join(data);
        console.log(`user is -> ${socket.id} join room -> ${data}`);
    })

    socket.on("send_message",(data)=>{
        console.log("send message data",data);
        socket.to(data.room).emit("receive_message",data)
    })


    console.log(socket.id);
    socket.on("disconnect",()=>{
        console.log("user disconnected..",socket.id);
    })

})
app.use(cors());


server.listen(1000,() => {
    console.log('server is running on port 1000');
})
