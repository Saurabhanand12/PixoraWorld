import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useGetAllMessage from '@/hooks/useGetAllmessages'
import useGetRTM from '@/hooks/useGetRTM'

const Messages = ({ selectedUser }) => {
  useGetAllMessage();
  useGetRTM();


  const { user } = useSelector(store => store.auth)
  const { messages } = useSelector(store => store.chat);

  return (
    <div className='overflow-y-auto flex-1 p-4'>
      <div className='flex justify-center'>
        <div className='flex flex-col items-center justify-center'>
          <Avatar className='mb-2 h-26 w-26'>
            <AvatarImage src={selectedUser?.profilepic} alt='Profile' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className='font-semibold'>{selectedUser?.username}</span>
          <Link to={`/Profile/${selectedUser?._id}`}><button className='h-8 my-3 bg-slate-900 hover:bg-slate-00 text-white px-2 rounded cursor-pointer' varient='secondary'>View Profile</button></Link>
        </div>
      </div>
      <div className='flex flex-col gap-3 chat-window'>
        {
          messages && messages.map((msg) => {
            return (
              <div key={msg._id} className={`flex gap-3 ${msg.senderid == user?._id ? 'justify-end' : 'justify-start'}`}>
                {msg.senderid != user?._id && (
                  <Avatar>
                    <AvatarImage src={selectedUser?.profilepic} alt='Profile' />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>)}
                <div className={`px-3 py-1 rounded-full max-w-xs flex flex-nowrap items-center gap-3 ${msg.senderid == user?._id ? 'bg-blue-400' : 'bg-gray-300'}`}>
                  {msg.messages}
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Messages
