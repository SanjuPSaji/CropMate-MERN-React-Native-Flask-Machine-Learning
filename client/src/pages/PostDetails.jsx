import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Make a POST request to fetch the post details
        const response = await fetch('http://localhost:4999/PostId', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ postId })
        });
        const data = await response.json();

        // Check if the response contains post data
        if (response.status) {
          setPost(data); // Update the state with the received post data
        } else {
          console.error('Error fetching post:', data.message);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost(); // Call the fetchPost function when the component mounts
  }, [postId]); // Execute the effect whenever postId changes

  const formatDate = (dateString) => {
    let distance = formatDistanceToNow(new Date(dateString), { addSuffix: true });
    distance = distance.replace('about ', '');
    return distance;
  };

  if (!post) {
    // Render loading indicator or return null if post data is not available yet
    return <div>Loading...</div>;
  }

  return (
    <div className="row row-cols-1 row-cols-md-1 g-4 mb-3">
          <div className="col">
            <a href={`/forum/${post._id}`} className="card text-decoration-none" style={{ color: 'inherit' }}>
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg" className="card-img rounded-circle" alt="..." style={{ width: '40px', height: '40px' }} />
                  <div className="d-flex justify-content-between">
                    <h6 className="card-title s"> &nbsp; {post.creatorname}&nbsp;</h6>
                    <small className="text-muted">&bull;&nbsp;{formatDate(post.createdAt)}</small>
                  </div>
                </div>
                <h5 className="card-title">{post.heading}</h5>
                <p className="card-text">{post.content}</p>
              </div>
            </a>
          </div>
        </div>
  );
};

export default PostDetails;
