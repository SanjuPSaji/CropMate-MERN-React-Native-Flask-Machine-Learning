import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import CommentBox from '../components/CommentBox'
import PostTitles from '../components/PostTitles';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import url from '../url'

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Make a POST request to fetch the post details
        const response = await axios.get(`${url}/PostId?postId=${postId}`);;
        const data = await response.data;

        // Check if the response contains post data
        if (response.status) {
          setPost(data); // Update the state with the received post data
        } else {
          console.error("Error fetching post:", data.message);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost(); // Call the fetchPost function when the component mounts
  }, [postId]); // Execute the effect whenever postId changes

  useEffect(() => {
    const fetchComments = async () => {
      try {
        // Make a GET request to fetch comments based on postId
        const response = await axios.get(`${url}/Commentfetch?postId=${postId}`);
        const data = await response.data;

        if (response.status) {
          setComments(data.comments); // Update the state with the received comments data
          
        } else {
          console.error("Error fetching comments:", data.message);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments(); // Call the fetchComments function when the component mounts
  }, [postId]); 
  
  const formatDate = (dateString) => {
    let distance = formatDistanceToNow(new Date(dateString), {
      addSuffix: true,
    });
    distance = distance.replace("about ", "");
    return distance;
  };
  


  if (!post) {
    // Render loading indicator or return null if post data is not available yet
    return <div>Loading...</div>;
  }

  const handleCommentSubmission = async (commentData) => {
    try {
      // Make a POST request to submit the comment data
      const response = await axios.post(`${url}/Comment`, commentData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
  
      // Handle the response as needed
      console.log("Comment submitted:", data);
      toast.success('Replied!', {
        position: 'top-right',
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: setTimeout(function(){ window.location.reload(1);}, 1500)
      });
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <div className="row row-cols-1 row-cols-md-1 g-4 mx-5 mb-3 m-1">
      <div className="col">
        {/* <div className="card card-body">
          <div className="d-flex align-items-center mb-3">
            <img
              src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"
              className="card-img rounded-circle"
              alt="..."
              style={{ width: "40px", height: "40px" }}
            />
            <div className="d-flex justify-content-between">
              <h6 className="card-title s"> &nbsp; {post.creatorname}&nbsp;</h6>
              <small className="text-muted">
                &bull;&nbsp;{formatDate(post.createdAt)}
              </small>
            </div>
          </div>
          <h5 className="card-title">{post.heading}</h5>
          <p className="card-text">{post.content}</p>
        </div> */}
        <PostTitles type="post" posts={post} />
      <CommentBox postId={postId} type="comment" onCommentSubmit={handleCommentSubmission}/>
      <div className="mt-3">
      <PostTitles type="comment" posts={comments}/>
      </div>
      <ToastContainer />
      </div>
    </div>
  );
};

export default PostDetails;
