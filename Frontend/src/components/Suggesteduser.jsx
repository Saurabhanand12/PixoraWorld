import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const Suggesteduser = () => {
    const { user,suggesteduser  } = useSelector(store => store.auth);

    const filteredUsers = suggesteduser?.filter(
        u => u._id !== user?._id
    )

    return (
        <div className='w-80'>
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold">Suggested for you</h2>
                <span className="cursor-pointer text-sm text-blue-600">See All</span>
            </div>
            {filteredUsers && filteredUsers.length > 0 ? (
               filteredUsers?.map((user) => {
                    return (
                        <div
                        key={user._id}
                        className="flex items-center gap-3 mb-3 bg-gray-100 p-4 rounded"
                    >
                        <Link to={`/profile/${user._id}`}>
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={user?.profilepic} />
                                <AvatarFallback>
                                    {user?.username?.[0]?.toUpperCase() || 'U'}
                                </AvatarFallback>
                            </Avatar>
                        </Link>

                        <div className="flex flex-col flex-1">
                            <div className="flex items-center justify-between">
                                <Link
                                    to={`/profile/${user._id}`}
                                    className="font-semibold text-sm"
                                >
                                    {user?.username}
                                </Link>

                                <span className="text-xs text-blue-600 cursor-pointer">
                                    Follow
                                </span>
                            </div>

                            <span className="text-gray-600 text-xs">
                                {user?.bio || 'Bio here...'}
                            </span>
                        </div>
                    </div>
                    )
                })
        ):(
                <p className="text-gray-500 text-sm">No suggested users</p>
            )}
        </div>
    )
}

export default Suggesteduser
