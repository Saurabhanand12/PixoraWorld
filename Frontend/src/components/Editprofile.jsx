import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useDispatch, useSelector } from 'react-redux';

import { Textarea } from './ui/textarea';
import axios from 'axios';
import { toast } from 'sonner';
import { setAuthUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const Editprofile = () => {
    const imageRef = useRef();
    const { user } = useSelector(store => store.auth);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        username: user.username,
        profilepic: user.profilepic,
        bio: user.bio,
        gender: user.gender,
    })

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setInput({ ...input, profilepic: file });
        }
    }

    const selectchangehandler = async (value) => {
        setInput({ ...input, gender: value });
    }

    const editprofilehandler = async () => {
        try {
            const formdata = new FormData();
            formdata.append('bio', input?.bio);
            formdata.append('username', input?.username);
            formdata.append('gender', input?.gender);
            if (input.profilepic) {
                formdata.append('profilepic', input?.profilepic);
            }
            setLoading(true);
            const res = await axios.post("http://localhost:7000/api/v1/user/profile/edit", formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });

            if (res.data.success) {
                const updateduserdata = {
                    ...user,
                    username: res.data.user?.username,
                    bio: res.data.user?.bio,
                    gender: res.data.user?.gender,
                    profilepic: res.data.user?.profilepic,
                }
                dispatch(setAuthUser(updateduserdata));
                navigate(`/profile/${user?._id}`);
                toast.success(res.data.message);
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='mt-10 ml-100'>
            <section>
                <h1 className='font-bold text-xl'> Edit Profile </h1>
                <div>
                    <div className="flex items-center gap-3 my-10 bg-gray-100 px-5 py-3 rounded-xl mr-40">
                        <Link to={`/profile/${user?._id}`}>
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={user?.profilepic} />
                                <AvatarFallback>
                                    {user?.username?.[0]?.toUpperCase() || "U"}
                                </AvatarFallback>
                            </Avatar>
                        </Link>

                        <div className="flex items-center justify-between w-full">
                            <div className="flex flex-col">
                                <h1 className="font-semibold text-xl">
                                    <Link to={`/profile/${user?._id}`}>
                                        {user?.username}
                                    </Link>
                                </h1>
                                <span className="text-gray-600 text-xs">{user?.bio || "Bio here..."}</span>
                            </div>
                            <input type="file" ref={imageRef} onChange={fileChangeHandler} className='hidden' />
                            <button onClick={() => imageRef?.current.click()} className="bg-blue-400 hover:bg-blue-500 rounded py-1 px-3">Change Photo</button>
                        </div>
                    </div>
                </div>
                <div>
                    <h1 className='font-bold '> Username </h1>
                    <div className="flex items-center gap-3 my-3 bg-gray-100 px-6 py-3 rounded-xl mr-40">
                        <div className="flex items-center justify-between w-full">
                            <input type="text" value={input?.username} onChange={(e) => setInput({ ...input, username: e.target.value })} name='username' className='w-full border-none outline-none placeholder:text-black' placeholder={user?.username} />
                        </div>
                    </div>
                </div>
                <div className='pt-2'>
                    <h1 className='font-bold '> Bio  </h1>
                    <div className="flex items-center gap-3 my-4 bg-gray-100 px-6 py-3 rounded-xl mr-40">
                        <div className="flex items-center justify-between w-full">
                            <Textarea value={input?.bio} onChange={(e) => setInput({ ...input, bio: e.target.value })} name='bio' className='w-full focus-visible:ring-transparent border-none px-1'>{user?.bio || "Bio here..."}</Textarea>
                        </div>
                    </div>
                </div>
                <div className="pt-2">
                    <h1 className="font-bold">Gender</h1>
                    <div className="my-4 bg-gray-100 px-6 py-3 rounded-xl max-w-xl">
                        <Select value={input?.gender} onValueChange={(value) => setInput((prev) => ({ ...prev, gender: value }))}>
                            <SelectTrigger className="w-[180px] w-full border-none focus-visible:ring-0">
                                <SelectValue placeholder={user?.gender || input.gender} />
                            </SelectTrigger>
                            <SelectContent position="popper" className="z-50  cursor-pointer px-2 ">
                                <SelectGroup>
                                    <SelectItem value="male">Male</SelectItem>
                                    <hr className='text-slate-400' />
                                    <SelectItem value="female">Female</SelectItem>
                                    <hr className='text-slate-400' />
                                    <SelectItem value="other">Prefer not to say</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className='flex justify-end '>
                    {
                        loading ? (

                            <button className=" w-fit bg-blue-400 hover:bg-blue-500 rounded px-4 py-3 mt-10 mb-10 mr-40 flex items-center ">
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                Please Wait</button>
                        ) : (
                            <button onClick={editprofilehandler} className=" w-fit bg-blue-400 hover:bg-blue-500 rounded px-4 py-3 mt-10 mb-10 mr-40 ">Submit</button>
                        )
                    }
                </div>
            </section>
        </div>
    )
}

export default Editprofile
