import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './createpost.css';

const CreatePost = ({ posts, setPosts }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');

  const queryParams = new URLSearchParams(location.search);
  const editIndex = queryParams.get('edit');

  useEffect(() => {
    if (editIndex !== null && posts[editIndex]) {
      const postToEdit = posts[editIndex];
      setTitle(postToEdit.title);
      setContent(postToEdit.content);
      setFirstName(postToEdit.firstName);
      setLastName(postToEdit.lastName);
      setImage(postToEdit.image || '');
    }
  }, [editIndex, posts]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !content || !firstName || !lastName) {
      setError('Please fill out all fields.');
      return;
    }

    const newPost = {
      title,
      content,
      firstName,
      lastName,
      image,
    };

    if (editIndex !== null) {
      const updatedPosts = [...posts];
      updatedPosts[editIndex] = newPost;
      setPosts(updatedPosts);
    } else {
      setPosts([...posts, newPost]);
    }

    localStorage.setItem('posts', JSON.stringify(editIndex !== null ? [...posts] : [...posts, newPost]));
    navigate('/');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="create-post">
      <h2>{editIndex !== null ? 'Edit Post' : 'Create Post'}</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name<span className='span'>*</span></label>
          <input
            type="text" placeholder='Please Enter Your First Name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Last Name<span className='span'>*</span></label>
          <input
            type="text" placeholder='Please Enter Your Last Name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Title<span className='span'>*</span></label>
          <input
            type="text" placeholder='Please Enter Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Content<span className='span'>*</span></label>
          <textarea
            value={content} placeholder='Please Enter Your Content'
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Upload Your Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
        <div className="form-actions">
          <button type="submit">Save Post</button>
          <button type="button" onClick={handleBack}>Back</button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
