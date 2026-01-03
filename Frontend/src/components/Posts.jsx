import React from 'react'
import Post from './Post'
import { useSelector } from 'react-redux'

const Posts = () => {
  const posts = useSelector(store => store.post.posts);

  if (!Array.isArray(posts) || posts.length === 0) {
    return <p className="text-center text-gray-500">No posts yet</p>;
  }

  return (
    <div>
      {posts
        .filter(post => post && typeof post === 'object' && post._id)
        .map(post => (
          <Post key={post._id} post={post} />
        ))}
    </div>
  );
};

export default Posts;
