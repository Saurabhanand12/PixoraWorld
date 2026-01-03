import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import React, { useState } from 'react'
import { Dialog, DialogTrigger, DialogContent } from './ui/dialog'
import { MessageCircle, MoreHorizontal, Send } from 'lucide-react';
import { FaBookmark, FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { RiUserUnfollowFill } from "react-icons/ri";
import { MdDelete, MdReportProblem } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa6";
import CommentDialog from './commentdialog';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { setPosts, setseletedPost } from '@/redux/postSlice';
import { Badge } from "@/components/ui/badge";



const Post = ({ post }) => {
    const [text, settext] = useState("");
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    const { posts } = useSelector(store => store.post);
    const dispatch = useDispatch();
    const [postlike, setPostlike] = useState(post.likes.length)
    const [liked, setLiked] = useState(post.likes.includes(user?._id) || false);
    const [comment, setComment] = useState(post.comments);
    const [isBookmarked, setIsBookmarked] = useState(false);



    const texthandler = async (e) => {
        const inputtext = e.target.value;
        if (inputtext.trim()) {
            settext(inputtext);
        } else {
            settext("");
        }
    }

    const likeordislikehandler = async () => {
        try {
            const action = liked ? 'dislike' : 'like';
            const res = await axios.get(`http://localhost:7000/api/v1/post/${post?._id}/${action}`, { withCredentials: true });
            if (res?.data?.success) {
                const updatedlike = liked ? postlike - 1 : postlike + 1;
                setPostlike(updatedlike);
                setLiked(!liked);

                const updatedPostData = posts.map(p =>
                    p._id == post._id ? {
                        ...p,
                        likes: liked ? p.likes.filter(id => id !== user._id) : [...p.likes, user._id],
                    } : p
                );
                dispatch(setPosts(updatedPostData));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    const commenthandler = async () => {
        try {
            const res = await axios.post(`http://localhost:7000/api/v1/post/${post?._id}/comment`, { text }, {
                headers: {
                    'Content-Type': 'application/json',
                }, withCredentials: true,
            });
            if (res?.data?.success) {
                const updatedcommentdata = [...comment, res.data.comment];
                setComment(updatedcommentdata)

                const updatedPostData = posts.map(p =>
                    p._id == post._id ? { ...p, comments: updatedcommentdata } : p
                );

                dispatch(setPosts(updatedPostData));
                toast.success(res.data.message);
                settext("");
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    const deleteposthandler = async () => {
        try {
            const res = await axios.delete(`http://localhost:7000/api/v1/post/delete/${post?._id}`, { withCredentials: true });
            if (res?.data?.success) {
                const updatedpostdata = posts.filter((postItem) => postItem?._id != post?._id);
                dispatch(setPosts(updatedpostdata));
                toast.success(res.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    const bookmarkhandler = async () => {
        try {
            const res = await axios.get(`http://localhost:7000/api/v1/post/${post?._id}/bookmark`, { withCredentials: true });
            if (res?.data?.success) {
                if (res.data.type === "saved") {
                    setIsBookmarked(true);
                } else {
                    setIsBookmarked(false);
                }
                toast.success(res.data.message);
            }

        } catch (error) {
            console.log(error);
        }
    }

    

    return (
        <div className='my-10 w-full max-w-xl mx-auto' >
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <Avatar className="w-12 h-12 rounded-full overflow-hidden" >
                        <AvatarImage src={post.author?.profilepic} alt='post_image'
                            className="object-cover transition-transform duration-300 hover:scale-110 " />
                        <AvatarFallback className="rounded-md">{post.author?.username?.[0]?.toUpperCase() || "U"}</AvatarFallback>
                    </Avatar>
                    <div className='flex gap-2'>
                        <h1 className='font-bold'>{post.author?.username || 'Unknown'}</h1>
                        {user?._id == post.author._id && <Badge variant="secondary" className='bg-sky-100 text-black'>Author</Badge>}
                    </div>
                </div>
                <Dialog >
                    <DialogTrigger asChild>
                        <MoreHorizontal className='cursor-pointer hover:text-gray-700' />
                    </DialogTrigger>
                    <DialogContent className='flex flex-col items-center text-sm text-center bg-white' >
                        <button className="flex items-center cursor-pointer w-fit text-slate-900 font-bold rounded bg-slate-300 hover:bg-slate-400 p-2 gap-2 "> <FaStar />Add to Favoruite</button>
                        {
                            post?.author?._id != user?._id && (
                                <button className="flex items-center  gap-2 cursor-pointer w-fit text-slate-900 font-bold bg-slate-300 rounded hover:bg-slate-400 p-2"> <RiUserUnfollowFill /> Unfollow</button>
                            )
                        }
                        {
                            user && user?._id != post?.author._id && <button className="flex items-center  gap-2 cursor-pointer w-fit text-[#ED4956] font-bold bg-red-100 hover:bg-red-200 rounded p-2"><MdReportProblem /> Report</button>
                        }
                        {
                            user && user?._id == post?.author._id && <button onClick={deleteposthandler} className="flex items-center  gap-2 cursor-pointer w-fit text-[#ED4956] font-bold bg-red-100 hover:bg-red-200 rounded p-2"><MdDelete /> Delete Post </button>
                        }
                    </DialogContent>
                </Dialog>
            </div>
            <img className='rounded-sm object-cover  my-2 w-full aspect-square' onDoubleClick={likeordislikehandler}
                src={post.images}
                alt="post" />

            <span className="flex justify-between items-center">
                {/* Left Icons */}
                <span className="flex gap-3 cursor-pointer">
                    {liked == 1 ? (
                        <FaHeart className='text-2xl hover:text-pink-500 text-pink-600' onClick={likeordislikehandler} />
                    ) : (
                        <FaRegHeart className='text-2xl hover:text-gray-700' onClick={likeordislikehandler} />
                    )
                    }
                    <MessageCircle onClick={() => {
                        dispatch(setseletedPost(post));
                        setOpen(true);

                    }} className=' hover:text-gray-700' />
                    <Send className=' hover:text-gray-700' />
                </span>

                {/* Right Icon */}
                <span className="text-2xl cursor-pointer">
                    {
                        isBookmarked ? (
                            <FaBookmark onClick={bookmarkhandler} className="cursor-pointer text-gray-900"/>
                        )
                        :(
                            <FaRegBookmark onClick={bookmarkhandler} className=' hover:text-gray-700' />
                        )
                    }
                </span>
            </span>
            <span>{postlike} likes</span>
            <div className='flex gap-2'>
                <span>{post.author?.username}</span>
                <p className='text-gray-700'>{post.captions || ''}</p>
            </div>
            <CommentDialog open={open} setOpen={setOpen} liked={liked} setLiked={setLiked} postlike={postlike} />
            <div className='flex'>
                <input className='outline-none w-full' value={text}
                    onChange={texthandler} type="text" placeholder='Add a Comment...' />
                {
                    text && <span onClick={commenthandler} className='text-[#3BADF8] cursor-pointer'>Post</span>
                }
            </div>

        </div>
    )
}

export default Post
