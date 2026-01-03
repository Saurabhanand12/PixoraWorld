import conversation from '../models/conversation.model.js';
import { getReciverSocketId, io } from '../socket/socket.js';
import { Message } from "../models/message.model.js";

export const sendmessage = async (req, res) => {
    try {
        const senderid = req.id;
        const reciverid = req.params.id;
        const { textMessage: messages } = req.body;

        let conversation1 = await conversation.findOne({
            participants: { $all: [senderid, reciverid] }
        })
        if (!conversation1) {
            conversation1 = await conversation.create({
                participants: [senderid, reciverid]
            })
        };

        const newmessage = await Message.create({
            senderid,
            reciverid,
            messages
        });

        if (newmessage) conversation1.messages.push(newmessage._id);

        await Promise.all([conversation1.save(), newmessage.save()]);

        const ReciverSocketId = getReciverSocketId(reciverid);
        if (ReciverSocketId) {
            io.to(ReciverSocketId).emit('newmessage', newmessage)
        }

        return res.status(201).json({
            success: true,
            newmessage
        });

    } catch (error) {
        console.log(error);
    }
}

export const getmessage = async (req, res) => {
    try {
        const senderid = req.id;
        const reciverid = req.params.id;

        const conversation1 = await conversation.findOne({
            participants: { $all: [senderid, reciverid] }
        }).populate('messages');

        if (!conversation1) return res.status(200).json({ success: true, messages: [] });

        return res.status(200).json({ success: true, messages: conversation1?.messages });

    } catch (error) {
        console.log(error);
    }
}