import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { setSelectedUser } from '@/redux/authSlice';
import { MessageCircle } from 'lucide-react';
import Messages from './Messages';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { setMessages } from '@/redux/chatSlice';

const Chatpage = () => {

    const { user, suggesteduser, selectedUser } = useSelector(store => store.auth);
    const {onlineUsers,messages} = useSelector(store => store.chat);
    const dispatch = useDispatch();
    const [textMessage,setTextMessage] = useState("");

    const sendMessageHandle = async (receiverId) =>{
        try {
            const res = await axios.post(`http://localhost:7000/api/v1/message/send/${receiverId}`,{textMessage},{
                headers:{
                    'Content-Type':'application/json',
                },
                withCredentials:true
            });
            if(res.data.success){
                dispatch(setMessages([...messages,res.data.newmessage]));
                setTextMessage("");
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        return ()=>{
            dispatch(setSelectedUser(null));
        }
    },[]);

    const suggestedUserlist = suggesteduser?.filter(
        u => u._id !== user?._id
    )
    const isSelectedUserOnline = onlineUsers.includes(selectedUser?._id);

    return (
        <div className='flex ml-[5%] h-screen '>
            <section className='w-60 my-6 md:w-1/4 px-8'>
                <Link to={`/profile/${user?._id}`}><h1 className='text-xl font-bold mb-4 px-10'>{user?.username}</h1></Link>
                <hr className='mb-4 border-gray-300 ' />
                <div className='overflow-y-auto h-[80vh]'>
                    {
                        suggestedUserlist.map((suggesteduser) => {
                            const isOnline = onlineUsers.includes(suggesteduser?._id);
                            return (
                                <div onClick={() => dispatch(setSelectedUser(suggesteduser))} className='flex gap-3 items-center p-3 hover:bg-gray-200 cursor-pointer rounded-md '>
                                    <Avatar className='h-14 w-14'>
                                        <AvatarImage src={suggesteduser?.profilepic} alt='profile'/>
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div className='flex flex-col'>
                                        <span className='font-medium cursor-pointer'>{suggesteduser?.username}</span>
                                        <span className={`text-xs font-bold ${isOnline ? 'text-green-600' : 'text-red-600'}`}>{isOnline ? 'online ' : 'offline'}</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
            {
                selectedUser ? (
                    <section className="flex-1 flex flex-col h-full border-l border-gray-300">

                        {/* ===== Chat Header ===== */}
                        <div className="flex items-center gap-3 px-4 py-3 border-b bg-white sticky top-0 z-10">
                            <Avatar className='h-12 w-12'>
                                <AvatarImage src={selectedUser?.profilepic} alt="profile" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>

                            <div className="flex flex-col">
                                <Link to={`/profile/${selectedUser?._id}`}><span className="font-semibold cursor-pointer ">{selectedUser?.username}</span></Link>
                                <span className={`text-xs font-semibold ${isSelectedUserOnline ? 'text-green-600' : 'text-red-600'}`}>{isSelectedUserOnline ? 'online ' : 'offline'}</span>
                            </div>
                        </div>

                        {/* ===== Messages Area ===== */}
                        <div className="flex-1 overflow-y-auto px-4 py-3 bg-gray-50">
                            <Messages selectedUser={selectedUser}/>
                        </div>

                        {/* ===== Message Input ===== */}
                        <div className="flex items-center gap-2 px-4 py-3 border-t bg-white">
                            <input type="text" value={textMessage} onChange={(e) => setTextMessage(e.target.value)} placeholder="Message..."
                                className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-1 focus:ring-gray-300"/>
                            <button onClick={()=> sendMessageHandle(selectedUser?._id)} className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">Send</button>
                        </div>
                    </section>

                ) : (
                    <div className="flex flex-col items-center justify-center h-full ml-100 text-gray-500">
                        <div className="p-6 rounded-full border border-gray-300 mb-4">
                            <MessageCircle className="w-12 h-12" />
                        </div>

                        <h1 className="font-semibold text-xl text-gray-800">
                            Your Messages
                        </h1>
                        <p className="text-sm mt-1 text-gray-500">
                            Send a message to start a chat
                        </p>
                    </div>
                )
            }
        </div>
    )
}

export default Chatpage
