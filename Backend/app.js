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

const PORT = process.env.PORT || 7000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieparser());

const corsoption ={                  // use another api easly
    origin : 'http://localhost:5173', 
    credentials :true
} 
app.use(cors(corsoption));

await connectDB();

app.get('/',(req,res)=>{
    res.send("they are working");
    success:true;
})

app.use('/api/v1/user',userroute);
app.use('/api/v1/post',postroute);
app.use('/api/v1/message',messageroute);


server.listen(PORT);