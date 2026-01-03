import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Suggesteduser from './Suggesteduser'

const Rightsidebar = () => {
  const { user } = useSelector(store => store.auth)

  return (
    <div className=''>
      <div className="flex items-center gap-3 my-10 bg-gray-100 px-5 py-3 rounded mr-35">
        <Link to={`/profile/${user?._id}`}>
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.profilepic} />
            <AvatarFallback>
              {user?.username?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </Link>

        <div className="flex flex-col w-60">
          <div className="flex items-center gap-2 justify-between">
            <h1 className="font-semibold text-sm">
              <Link to={`/profile/${user?._id}`}>{user?.username}</Link>
            </h1>
            <span className="text-xs text-blue-600 cursor-pointer">Switch</span>
          </div>

          <span className="text-gray-600 text-xs">
            {user?.bio || "Bio here..."}
          </span>
        </div>
      </div>

      {/* Suggested users */}
      <Suggesteduser />
    </div>
  )
}

export default Rightsidebar
