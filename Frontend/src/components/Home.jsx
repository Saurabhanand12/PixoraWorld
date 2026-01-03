import React from 'react'
import Feed from './Feed'
import { Outlet } from 'react-router-dom'
import Rightsidebar from './Rightsidebar'
import useGetAllpost from '@/hooks/useGetAllpost'
import useGetSuggesteduser from '@/hooks/useGetSuggesteduser'

const Home = () => {
  useGetAllpost();
  useGetSuggesteduser();
  return (
    <div className='flex'>
      <div className='flex-grow'>
        <Feed />
        <Outlet />
      </div>
      <Rightsidebar />
    </div>
  )
}

export default Home
