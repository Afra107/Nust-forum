import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import Card from './card';
import Layout from "./Layout"; // Import the layout component
import CommunitySidebar from './community';

const JustTagPosts = () => {
  const { userId, tag_name } = useParams(); // Destructure all parameters
  const cardcolor = { backgroundColor: "#8aa7bf" };
  const [tagPosts, setTagPosts] = useState([]);

  useEffect(() => {
    const fetchtagPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/tag/${userId}/${tag_name}`);
        setTagPosts(response.data);
      } catch (error) {
        console.error('Error fetching group posts:', error);
      }
    };
    fetchtagPosts();
  }, [userId, tag_name]); // Include userId and tag_name in the dependency array

  return (
    <Layout>
      <div className="d-flex justify-content-left mt-5" style = {{overflowX : 'hidden', left : '0'}}>
        <div className="row" style = {{overflowX : 'hidden'}}>
        <div className="col-lg-3">
            <Sidebar id={userId} />
        </div>
          <div className="col-12">
            <div className="w-100">
              {tagPosts.map(post => (
                <div key={post._id} className="card w-100 rounded-4 mb-3" style={cardcolor}>
                  <div className="card-header" style={{ background: 'linear-gradient(to bottom, #1a1a2e, #16213e)', borderTopLeftRadius: '16px', borderTopRightRadius: '16px', color: '#FFFFFF', fontWeight: 'bold' }}>
                  <Link to={`/group/${userId}/${post.group}`} style={{ color: '#FFFFFF', textDecoration: 'none' }}>
                          <p className="card-subtitle" style={{ color: "#8ee5ee", fontSize: "large", fontFamily: "'Roboto', sans-serif" }}>
                            {"r/" + post.group}
                          </p>
                  </Link>
                  <Link to={`/profile/${post.username}`} style={{ color: '#e6e6e4', textDecoration: 'none' }}>
                          <p className="card-subtitle" style={{ color: "#e6e6e4", fontSize: "small", fontFamily: "'Roboto', sans-serif" }}>
                            {"u/" + post.username}
                          </p>
                        </Link>
                    <h5 className="card-title">{post.Title}</h5>
                    <Link to={`/tags/${userId}/${post.tags}/${post.group}`} style={{ color: "inherit", textDecoration: "none" }}>
                        <div className="tags">
                          <span className="badge badge-dark ms-1" style={{ background: 'linear-gradient(45deg, #1e90ff, #00bfff)', color: 'white', borderRadius: '12px', padding: '5px 15px' }}>
                            {post.tags}
                          </span>
                        </div>
                      </Link>
                  </div>
                  <Link to={`/post/${userId}/${post._id}`} style={{ color: "inherit", textDecoration: "none" }}>
                  <div className="card-body">
                    <p className="card-text">{post.text}</p>
                    {post.images && <img src={post.images} className="card-img-top" alt="" />}
                    <span className="badge badge-dark ms-1" style={{ backgroundColor: '#4D869C', color: 'white' }}>
                      {post.num_comments} comments
                    </span>
                  </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-3">
          <CommunitySidebar id={userId} /> {/* Assume Sidebar contains tag elements */}
        </div>
        </div>
      </div>
    </Layout>
  );
};

export default JustTagPosts;
