import { useEffect, useState } from 'react';
import axios from 'axios';
import PostTitles from '../components/PostTitles';
import CreatePost from '../components/CreatePost';

const Post = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
      // Fetch posts data from your API
      const fetchData = async () => {
        try {
          const response = await axios.post('http://localhost:4999/Postfetch');
          setPosts(response.data.posts);
          console.log(response.data.posts)
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <div className="d-flex justify-content-between m-4 pb-1">
        
        <PostTitles posts={posts} />
        <div style={{width: '1000px', height: '400px', marginLeft: '12px' }}>
        <CreatePost/>
        </div>
      </div>
    );
  };

export default Post