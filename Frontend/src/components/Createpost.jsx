import React, { use, useRef, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { readFileAsDataUrl } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '@/redux/postSlice';


const Createpost = ({ open, setOpen }) => {

    const imageref = useRef();
    const [file, setFile] = useState("");
    const [caption, setCaption] = useState("");
    const [imagepreview, setImagePreview] = useState("");
    const [loading, setLoading] = useState(false);
    const { posts } = useSelector(store => store.post);
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();


    const fileChangeHandler = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file);
            const dataUri = await readFileAsDataUrl(file);
            setImagePreview(dataUri);
        }
    }

    const createPostHandler = async (e) => {
        const formdata = new FormData();
        formdata.append("captions", caption);
        if (imagepreview) formdata.append("image", file);
        try {
            setLoading(true);
            const res = await axios.post('http://localhost:7000/api/v1/post/addpost', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setPosts([res.data.post1, ...posts]))
                toast.success(res.data.message);
                setOpen(false);
            }
        } catch (error) {
            console.log("ERROR:", error);

            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Something went wrong";

            toast.error(message);

        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent onInteractOutside={() => setOpen(false)} className='bg-white '>
                <DialogHeader className=' font-bold text-center flex items-center'><DialogTitle>Create New Post</DialogTitle></DialogHeader>
                <div className='flex gap-3 items-center'>
                    <Avatar className='h-12 w-12'>
                        <AvatarImage src={user?.profilepic} alt='img' />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className='font-semibold text-ml' >{user?.username}</h1>
                        <span className='text-gray-600 text-xs' >{user?.bio || "Bio here... "}</span>
                    </div>
                </div>
                <Textarea value={caption} onChange={(e) => setCaption(e.target.value)} className='focus-visible:ring-transparent border-none' placeholder='Write a Caption...' />
                {
                    imagepreview && (
                        <div className='w-full h-64 flex items-center justify-center '>
                            <img src={imagepreview} alt="preview_image" className='object-cover w-full h-full rounded-md' />
                        </div>
                    )
                }
                <input ref={imageref} type="file" onChange={fileChangeHandler} className='hidden' />
                <button onClick={() => imageref.current.click()} className='w-fit  mx-auto text-white bg-indigo-600 hover:bg-indigo-500 rounded p-2 cursor-pointer'>Select form Computer</button>
                {
                    imagepreview && (
                        loading ? (
                            <button className='flex items-center gap-2 w-fit mx-auto'>
                                <Loader2 className='h-4 w-4 animate-spin' />
                                Please wait...
                            </button>
                        ) : (
                            <button
                                type='submit'
                                onClick={createPostHandler}
                                className='w-full bg-sky-900 text-white p-2 rounded hover:bg-sky-800 cursor-pointer'
                            >Post</button>
                        )
                    )
                }
            </DialogContent>
        </Dialog>
    )
}

export default Createpost
