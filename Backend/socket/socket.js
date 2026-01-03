import { Server } from 'socket.io';
import express from 'express';
import http from 'http';

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    }
})

const userSocketMap = {};

export const getReciverSocketId = (reciverId) => userSocketMap[reciverId];

io.on('connection', (socket) => {
    const userId1 = socket.handshake.query.userId;
    // console.log("USER ID:", user?._id);

    if (userId1) {
        userSocketMap[userId1] = socket.id;
        console.log(`User connected : UserId = ${userId1}, SocketId = ${socket.id}`);
    }
    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on('disconnect', () => {
        if (userId1) {
            console.log(`User disconnected : UserId = ${userId1}, SocketId = ${socket.id}`);
            delete userSocketMap[userId1];
        }
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    });
})

export { app, server, io };


