import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import React from 'react'
import { useSelector } from 'react-redux'

const Comment = ({ comment }) => {
    return (
        <div className='my-2 m-2 mb-4 ' >
            
            <div className='flex gap-2' >
                <Avatar>
                    <AvatarImage src={comment?.author?.profilepic} alt="profile" className="h-10 w-10 rounded-full transition-transform duration-300 hover:scale-110 object-cover flex" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h2 className='text-base '><span className='font-bold hover:underline cursor-pointer'>{comment?.author?.username}</span> <span className='font-normal pl-1 '>{comment.text}</span></h2>
            </div>
        </div>
    )
}

export default Comment;
