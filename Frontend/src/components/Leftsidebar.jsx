import { Heart, Home, LogOut, MessageCircle, PlusCircleIcon, Search, TrendingUp } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { AvatarImage } from './ui/avatar'
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthUser } from '@/redux/authSlice'
import Createpost from './Createpost'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'


const Leftsidebar = () => {
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth);
    const { likeNotification } = useSelector(store => store.realTimeNotification);

    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const logouthandler = async () => {
        try {
            const res = await axios.get('http://localhost:7000/api/v1/user/logout', { withCredentials: true });
            if (res.data.success) {
                dispatch(setAuthUser(null));
                navigate("/login");
                toast.success(res.data.message);
            }

        } catch (error) {
            toast.error(error.response.data.massage);
        }
    }
    const sidebarhandler = async (texttype) => {
        if (texttype == 'Logout') {
            logouthandler();
        } else if (texttype == 'Create') {
            setOpen(true);
        } else if (texttype == 'Profile') {
            navigate(`/Profile/${user?._id}`);
        } else if (texttype == 'Home') {
            navigate('/');
        } else if (texttype == 'Messages') {
            navigate('/chat');
        }

    }

    const sidebaritems = [
        { icon: <Home />, text: 'Home' },
        { icon: <Search />, text: 'Search' },
        { icon: <TrendingUp />, text: 'Explore' },
        { icon: <MessageCircle />, text: 'Messages' },
        { icon: <Heart />, text: 'Notifications' },
        { icon: <PlusCircleIcon />, text: 'Create' },
        {
            icon: (
                <Avatar>
                    <AvatarImage src={user?.profilepic} className='h-8 w-8 rounded-full' />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            ), text: 'Profile'
        },
        { icon: <LogOut />, text: 'Logout' },

    ]
    return (
        <div>
            <div className=" group fixed left-0 top-0 h-screen z-10 bg-slate-900 border-r border-gray-700 text-white w-[72px] hover:w-[240px] transition-all duration-300 overflow-hidden" >
                <div className="flex flex-col h-full px-3">
                    {/* ===== Logo ===== */}
                    <h1 className=" pt-7 mb-12 text-4xl italic font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300  whitespace-nowrap ml-15"> Pixora</h1>
                    {/* ===== Sidebar Items ===== */}
                    <div className="flex flex-col gap-2">
                        {sidebaritems.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => sidebarhandler(item.text)}
                                className="flex items-center gap-4 p-3 rounded-lg cursor-pointer hover:bg-slate-700 relative">
                                {item.text === "Notification" ? (
                                    <Popover >
                                        <PopoverTrigger  asChild>
                                            <div className="relative flex items-center mr-1">
                                                {React.cloneElement(item.icon, { size: 28 })}
                                                {/* {likeNotification?.length > 0 && (
                                                    <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                                                        {likeNotification.length > 99 ? "99+" : likeNotification.length}
                                                    </span>
                                                )}  */}
                                            </div>
                                        </PopoverTrigger>{item.text}
                                        <PopoverContent className="w-72 p-2 bg-white ml-60">
                                            <div className="flex flex-col gap-2">
                                                {likeNotification?.length === 0 ? (
                                                    <p className="text-center text-gray-500">No new notifications</p>
                                                ) : (
                                                    likeNotification.map((notification) => (
                                                        <div key={notification.userid || `${notification.userid}-${notification.postId}`} className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer bg-white m-2  ">
                                                            <Avatar>
                                                                <AvatarImage  src={notification?.userDetail?.profilepic} className="h-8 w-8 rounded-full "/>
                                                            </Avatar>
                                                            <p className="text-sm text-black">
                                                                <span className="font-bold">{notification?.userDetail?.username}</span> liked your post
                                                            </p>
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                ) : (
                                    <>
                                        {/* Regular sidebar items */}
                                        <span className="text-xl flex-shrink-0">
                                            {React.cloneElement(item.icon, { size: 28 })}
                                        </span>
                                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                            {item.text}
                                        </span>
                                    </>
                                )}
                            </div>
                        ))}

                    </div>
                    {/* ===== Create Post (Bottom) ===== */}
                    <div className=" mt-auto mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Createpost open={open} setOpen={setOpen} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Leftsidebar

