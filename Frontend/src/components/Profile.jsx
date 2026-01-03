import React, { useEffect, useReducer, useState } from 'react'
import useGetUserProfile from '@/hooks/useGetuserProfile';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { Badge } from './ui/badge';
import { AtSign, Heart, MessageCircle } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const Profile = () => {
  const params = useParams();
  const userId = params.id;
  useGetUserProfile(userId);

  const [activeTab, setActiveTab] = useState('posts');

  const { userProfile, user } = useSelector(store => store.auth);
  const [isFollow ,setIsFollow] = useState(false);

  const isLoggedinUserProfile = user?._id == userProfile?._id;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  }

  const displayposts = activeTab === 'posts' ? userProfile?.posts || [] : userProfile?.bookmarks || [];

  const followunfollowhandler = async () => {
    try {
      const res = await axios.post(`http://localhost:7000/api/v1/user/followorunfollow/${userId}`,{},{withCredentials:true});
      if(res.data.success){
        if(res.data.type == 'follow'){
        setIsFollow(true);
        }else if(res.data.type == 'unfollow'){
        setIsFollow(false);
      }
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='flex max-w-5xl justify-center mx-auto'>
      <div className='flex flex-col p-8'>
        <div className='grid grid-cols-2'>
          <section className='flex items-center justify-center'>
            <Avatar className='mt-20 h-50 w-50'>
              <AvatarImage src={userProfile?.profilepic} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </section>
          <section>
            <div className="flex items-center mt-20 gap-5">
              <span className="font-semibold text-lg">{userProfile?.username}</span>
              {
                isLoggedinUserProfile ? (
                  <>
                    <div className="flex gap-4 ">
                      <Link to="/account/edit"><button className="bg-gray-100 hover:bg-gray-200  rounded font-semibold h-10 w-30"> Edit Profile</button></Link>
                      <button className="bg-gray-100 hover:bg-gray-200  rounded font-semibold h-10 w-30">View Archive</button>
                      <button className="bg-gray-100 hover:bg-gray-200 rounded font-semibold h-10 w-30">Ad Tools</button>
                    </div>
                  </>
                ) : (
                  isFollow ? (
                    <>
                      <button onClick={followunfollowhandler} className="bg-sky-100 hover:bg-sky-200 rounded font-semibold h-12 w-40" >Unfollow</button>
                      <button className="bg-sky-100 hover:bg-sky-200 rounded font-semibold h-12 w-40">Message</button>
                    </>
                  ) : (
                    <button onClick={followunfollowhandler} className="bg-sky-100 hover:bg-sky-200 rounded font-semibold h-12 w-40">Follow</button>
                  )
                )
              }
            </div>
            <div className='flex items-center mt-10 gap-10 '>
              <p> <span className='font-semibold' >{userProfile?.posts.length} </span>posts</p>
              <p> <span className='font-semibold' >{userProfile?.followers.length} </span>followers</p>
              <p> <span className='font-semibold' >{userProfile?.following.length} </span>following</p>
            </div>
            <div className='mt-10'>
              <Badge className='w-fit mr-2 items-center bg-gray-200 ' variant='secondary' ><AtSign />{userProfile?.username}</Badge>
              <span>|</span>
              <span className='ml-4'>{userProfile?.bio || 'bio here... '}</span>
            </div>
            <div className='flex flex-col mt-10 gap-2'>
              <span>{`Learn coding with ${userProfile.username} 😊 👍⭐`}</span>
              <span>Make your Amazing Resume for Faang 🤠😎 </span>
            </div>
          </section>
        </div>
        <div className='border-t border-t-gray-200 mt-15'>
          <div className='flex items-center justify-center gap-10 text-sm'>
            <span className={`py-3 cursor-pointer ${activeTab == 'posts' ? 'font-bold' : ''}`} onClick={() => handleTabChange('posts')}>
              POSTS
            </span>
            <span className={`py-3 cursor-pointer ${activeTab == 'saved' ? 'font-bold' : ''}`} onClick={() => handleTabChange('saved')}>
              SAVED
            </span>
            <span className='py-3 cursor-pointer'>
              REELS
            </span>
            <span className='py-3 cursor-pointer'>
              TAGS
            </span>
          </div>
          <div className='grid grid-cols-3 mt-10 gap-1'>
            {
              displayposts?.map((post) => {
                return (
                  <div key={post?.id} className='relative group cursor-pointer'>
                    <img src={post?.images} alt="postimage" className="w-full my-2 aspect-square object-cover rounded " />
                    <div className='absolute rounded inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-60 transition-opacity duration-300'>
                      <div className='flex items-center text-white space-x-4'>
                        <button className='flex items-center gap-2 hover:text-gray-300'>
                          <Heart />
                          <span>{post.likes.length}</span>
                        </button>
                        <button className='flex items-center gap-2 hover:text-gray-300'>
                          <MessageCircle />
                          <span>{post.comments.length}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
