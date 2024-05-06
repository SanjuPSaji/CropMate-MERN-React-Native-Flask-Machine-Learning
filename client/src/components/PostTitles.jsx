import { formatDistanceToNow } from 'date-fns';
import Cookies from 'js-cookie';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import EditDetails from '../components/EditDetails';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import url from '../url'

const id = Cookies.get('id');
console.log(id)

const PostTitles = ({ posts,type }) => {
  const [showEditDetails, setShowEditDetails] = useState(false); // State to manage visibility of EditDetails component
  const [selectedPost, setSelectedPost] = useState(null);

  const handleEdit = (post) => {
    // Handle edit functionality
    console.log(post); // Access the ID of the post using post._id
    setSelectedPost(post); // Set the selected post for editing
    setShowEditDetails(true);
  };

  const handleClose= ()=> {
    setShowEditDetails(false);
  }

  const handleDelete = async (postId) => {

    try {
      if (type === "comment") {
          // Make the DELETE request to delete the comment
          const response = await axios.delete(`${url}/DeleteComment?commentId=${postId}`);
          toast.success('Comment deleted successfully!', {
              onClose: setTimeout(function () { window.location.reload(1); }, 1500)
          });
      } else if (type === "post" || type === "posts") {
          // Make the DELETE request to delete the post and associated comments
          const response = await axios.delete(`${url}/DeletePostAndComments?postId=${postId}`);
          toast.success('Post and associated comments deleted successfully!', {
            onClose: setTimeout(function () { window.location.reload(1); }, 1500)
        });
      }
  } catch (error) {
      // Handle error
      console.error("Error deleting:", error);
  }
    
  };

  if (!posts) {
    console.log(posts)
    return <div className="spinner-border text-info " role="status">
    <span className="visually-hidden">Loading...</span>
  </div>;
  }

  const disabledStyle = {
    color: 'currentColor',
    cursor: 'not-allowed',
    pointerEvents: 'none',
    textDecoration: 'none',
  };

  let sortedPosts = [];

  if (type === "posts") {
    sortedPosts = posts.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (type === "comment"){
    sortedPosts = posts.slice().sort((a, b) => new Date(b.commentSeq) - new Date(a.commentSeq));
  } else {
    sortedPosts = [posts];
  }

  const formatDate = (dateString) => {
    let distance = formatDistanceToNow(new Date(dateString), { addSuffix: true });
    distance = distance.replace('about ', '');
    return distance;
  };




  return (
    <div>
      {sortedPosts.map((post) => (
        <div className="row row-cols-1 row-cols-md-1 g-4 mb-3" key={post._id}>
          <div className="col position-relative">
            <a href={`/forum/${post._id}`} className={Array.isArray(posts) ? "card text-decoration-none" : "card text-decoration-none isDisabled"} style={type === "posts" ? { color: 'inherit' } : disabledStyle}>
              <div className="card-body" style={{ boxShadow: "0 0 6px rgba(0, 0, 0, 0.2)" }}>
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
            {post.creatorId === id && (
              <div className="dropdown position-absolute mt-4" style={{ right: '20px', top: '-15px' , zIndex: '1'}}>
                <button className="btn btn-transparent dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="fas fa-ellipsis-vertical"></i>
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                  <li>
                    <button className="dropdown-item" onClick={() => handleEdit(post)}>
                      <i className="fas fa-pen mx-2"></i> Edit
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={() => handleDelete(post._id)}>
                      <i className="fas fa-trash mx-2"></i> Delete
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      ))}
      {/* Show EditDetails component if showEditDetails is true */}
      <Modal show={showEditDetails} onHide={() => setShowEditDetails(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditDetails post={selectedPost} type={type} onClose={() => setShowEditDetails(false)} />
        </Modal.Body>
      </Modal>
      <Toaster />
    </div>
  );
};

export default PostTitles;
