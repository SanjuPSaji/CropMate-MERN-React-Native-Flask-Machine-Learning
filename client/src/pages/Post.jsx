import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import PostTitles from '../components/PostTitles';
import CreatePost from '../components/CreatePost';
import url from '../url'

const Post = () => {
    const [posts, setPosts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
      setRefreshing(true);
      fetchData(); 
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, []);

    useEffect(() => {
      // Fetch posts data from your API
      const fetchData = async () => {
        try {
          const response = await axios.get(`${url}/Postfetch`);
          setPosts(response.data.posts);
          console.log(response.data.posts)
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <div className="d-flex flex-column m-4 pb-1">
      <div className="d-flex flex-column justify-content-between">
          <div style={{width: 'auto' }}>
              <CreatePost onRefresh={onRefresh}/>
          </div>
          <div style={{marginTop:20}}>

          <PostTitles type="posts" posts={posts} />
          </div>
      </div>
  </div>
    );
  };

export default Post