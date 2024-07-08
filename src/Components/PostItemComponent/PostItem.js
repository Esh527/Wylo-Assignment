import React from 'react';
import { useNavigate } from 'react-router-dom';
import './postitem.css';
import { AiFillDelete } from 'react-icons/ai'; // Import delete icon

const PostItem = ({ post, index, posts, setPosts }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/create?edit=${index}`);
  };

  const handleDelete = () => {
    const updatedPosts = posts.filter((_, i) => i !== index);
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  const getInitials = (firstName = '', lastName = '') => {
    const firstInitial = firstName.charAt(0).toUpperCase() || '';
    const lastInitial = lastName.charAt(0).toUpperCase() || '';
    return `${firstInitial}${lastInitial}`;
  };

  return (
    <div className="post-item">
      {post.image ? (
        <div className="user-image">
          <img src={post.image} alt={`${post.firstName} ${post.lastName}`} />
        </div>
      ) : (
        <div className="initials">
          {getInitials(post.firstName, post.lastName)}
        </div>
      )}
      <div className="post-content">
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <button onClick={handleEdit}>Edit</button>
      </div>
      <AiFillDelete className="delete-icon" onClick={handleDelete} />
    </div>
  );
};

export default PostItem;
