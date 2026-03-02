import express,{urlencoded} from 'express';
import cors from 'cors';
import cookieparser from 'cookie-parser';
// import db from "./config/mongoose-connection.js";
import userroute from './routes/user.routes.js'
import postroute from './routes/post.routes.js';
import messageroute from './routes/message.routes.js'
// import register from './controllers/user.controller.js'
import dotenv from 'dotenv'   // use for security reason
import connectDB from './config/mongoose-connection.js';
import {app , server} from  './socket/socket.js'
dotenv.config({});
import path from 'path'

const PORT = process.env.PORT || 7000;

// const __dir = path.resolve();                     //C:\Pixora\Backend
                                  

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieparser());

app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true
}));

await connectDB();


// app.use(express.static(path.join(__dir,"/frontend/dist")));
// app.get("*",(req,res)=>{
//     res.sendFile(path.resolve(__dir,"frontend","dist","index.html"));
// })

app.get('/',(req,res)=>{
    res.send("they are working");
    success:true;
})

app.use('/api/v1/user',userroute);
app.use('/api/v1/post',postroute);
app.use('/api/v1/message',messageroute);


server.listen(PORT);