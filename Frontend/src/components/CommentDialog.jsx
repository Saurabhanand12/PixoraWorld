import React, { use, useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Link } from 'react-router-dom'
import { MessageCircle, MoreHorizontal, Send } from 'lucide-react'
import { FaHeart, FaRegBookmark, FaRegHeart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import Comment from './Comment'
import axios from 'axios'
import { toast } from 'sonner'
import { setPosts } from '@/redux/postSlice'


const CommentDialog = ({ open, setOpen, liked, setLiked,postlike }) => {
    const [text, setText] = useState("");
    const { user } = useSelector(store => store.auth);
    const { selectedPost ,posts } = useSelector(store => store.post);
    const [comment,setComment] = useState([]);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(selectedPost){
            setComment(selectedPost.comments)
        }
    },[selectedPost]);

    const changeEventHandler = (e) => {
        const inputText = e.target.value;
        if (inputText.trim()) {
            setText(inputText);
        } else {
            setText("");
        }
    }



    const sendMessageHandler = async () => {
        try {
            const res = await axios.post(`http://localhost:7000/api/v1/post/${selectedPost?._id}/comment`, { text }, {
                headers: {
                    'Content-Type': 'application/json',
                }, withCredentials: true,
            });
            if (res?.data?.success) {
                const updatedcommentdata = [...comment, res.data.comment];
                setComment(updatedcommentdata)

                const updatedPostData = posts.map(p =>
                    p._id == selectedPost._id ? { ...p, comments: updatedcommentdata } : p
                );

                dispatch(setPosts(updatedPostData));
                toast.success(res.data.message);
                setText("");
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <Dialog open={open}>
            <DialogContent
                onInteractOutside={() => setOpen(false)}
                className="p-0 bg-white"
            >
                <div className="flex w-300 h-150" style={{ marginLeft: -340 }}>
                    <div className="w-1/2 h-full">
                        <img
                            src={selectedPost?.images}
                            alt="post"
                            className="w-full h-full object-cover rounded-l-lg"
                        />
                    </div>
                    <div className="w-1/2 h-full bg-white pt-2 p-4 flex flex-col rounded">

                        <div className="flex items-center justify-between gap-3 p-4 ">

                            {/* AVATAR */}
                            <div className='flex items-center gap-3'>
                                <Link>
                                    <Avatar className='h-10 w-10 '>
                                        <AvatarImage className='object-cover' src={selectedPost?.author?.profilepic || "/default-avatar.png"} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </Link>

                                {/* USERNAME + BIO */}
                                <div className="flex flex-col ">
                                    <Link className="text-xl font-semibold ">{selectedPost?.author?.username}</Link>
                                    {/* <span className="text-xs text-gray-500">Bio here...</span> */}
                                </div>
                            </div>

                            <Dialog className='flex items-end '>
                                <DialogTrigger aschild>
                                    <MoreHorizontal className='cursor-pointer' />
                                </DialogTrigger >
                                <DialogContent className='bg-white cursor-pointer flex flex-col items-center' >
                                    <div className='text-red-600 font-bold'>Unfollow</div>
                                    <hr />
                                    <div>Add to Favorites</div>
                                    <hr />
                                    <div className='text-red-600 font-bold'>Report</div>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <hr />
                        <div className="flex-1 overflow-y-auto mt-4 max-h-96">
                            {
                                comment.map((comment) => <Comment key={comment._id} comment={comment}  />)
                            }

                        </div>
                        <hr className='mb-3' />
                        <div className='mb-2' >
                            <span className="flex justify-between items-center">
                                {/* Left Icons */}
                                <span className="flex gap-3 cursor-pointer mb-1">
                                    {liked == 1 ? (
                                        <FaHeart className='text-2xl hover:text-pink-500 text-pink-600' />
                                    ) : (
                                        <FaRegHeart className='text-2xl hover:text-gray-700' />
                                    )
                                    }
                                    <MessageCircle onClick={() => setOpen(true)} className=' hover:text-gray-700' />
                                    <Send className=' hover:text-gray-700' />
                                </span>

                                {/* Right Icon */}
                                <span className="text-2xl cursor-pointer">
                                    <FaRegBookmark className=' hover:text-gray-700' />
                                </span>
                            </span>
                            <span >{postlike} likes</span>
                        </div>
                        <hr className='mb-4' />
                        <div className='flex'>
                            <input type="text" value={text} onChange={changeEventHandler} placeholder='Add a comment...'
                                className='w-full text-sm outline-none'
                            />

                            <button disabled={!text.trim()} onClick={sendMessageHandler}
                                className={`text-sm ml-2 ${text.trim() ? "text-blue-500 cursor-pointer" : "text-gray-400 cursor-not-allowed"}`}>
                                Post
                            </button>
                        </div>

                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CommentDialog
