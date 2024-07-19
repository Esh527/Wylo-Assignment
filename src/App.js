import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostsDisplay from './Components/PostsDisplayComponent/PostsDisplay';
import CreatePost from './Components/CreatePostComponent/CreatePost';
import './App.css';

const App = () => {
  const [posts, setPosts] = useState(() => {
    // Initialize posts from localStorage if available
    const savedPosts = localStorage.getItem('posts');
    return savedPosts ? JSON.parse(savedPosts) : [];
  });

  useEffect(() => {
    // Save posts to localStorage whenever posts state gets changes
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<PostsDisplay posts={posts} setPosts={setPosts} />} />
          <Route path="/create" element={<CreatePost posts={posts} setPosts={setPosts} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
