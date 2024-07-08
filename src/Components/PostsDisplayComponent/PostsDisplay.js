import React from 'react';
import { Link } from 'react-router-dom';
import PostItem from '../PostItemComponent/PostItem';
import './postdisplay.css';

const PostsDisplay = ({ posts, setPosts }) => {
  return (
    <div className="posts-display">
      <h1>All Posts</h1>
      <div className="post-list">
        {posts.map((post, index) => (
          <PostItem key={index} post={post} index={index} posts={posts} setPosts={setPosts} />
        ))}
      </div>
      <Link to="/create">
        <button>Create New Post</button>
      </Link>
    </div>
  );
};

export default PostsDisplay;
