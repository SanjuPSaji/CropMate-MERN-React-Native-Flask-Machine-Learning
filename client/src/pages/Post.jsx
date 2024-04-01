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
      <div className="m-4 pb-1">
        <CreatePost/>
        <PostTitles posts={posts} />
      </div>
    );
  };

export default Post