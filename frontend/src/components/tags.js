import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [tags, setTags] = useState([]);
  const [tagPosts, setTagPosts] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/tags`);
        setTags(response.data);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };
    fetchTags();
  }, []);

  const handleTagClick = async (tag) => {
    try {
      const response = await axios.get(`http://localhost:4000/tags/${tag}`);
      setTagPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts by tag:', error);
    }
  };

  return (
    <div className="sidebar" style={{ width: '100px' }}>
      <h3>Tags</h3>
      <ul className="list-group">
        {tags.map((tag, index) => (
          <li key={index} className="list-group-item">
            <button className="btn btn-link" onClick={() => handleTagClick(tag)}>
              {tag}
            </button>
          </li>
        ))}
      </ul>
      <div>
        <h3>Tag Posts</h3>
        {tagPosts.map(post => (
          <div key={post._id} className="card">
            <div className="card-header">
              <p className="card-subtitle text-muted">{post.username}</p>
              <h5 className="card-title">{post.title}</h5>
            </div>
            <div className="card-body">
              <p className="card-text">{post.text}</p>
              {post.images && <img src={post.images} className="card-img-top" alt="" />}
              <span className="badge badge-dark ms-1" style={{ backgroundColor: '#4D869C', color: 'white' }}>
                {post.num_comments} comments
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
