import { formatDistanceToNow } from 'date-fns';
import Cookies from 'js-cookie';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import EditDetails from '../components/EditDetails';
import { Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import url from '../url';
import { detectLanguage, translateText } from '../util/TranslatePost'; // Adjust path if needed

const targetLanguage = Cookies.get("language");
const id = Cookies.get('id');

const PostTitles = ({ posts, type }) => {
  const [showEditDetails, setShowEditDetails] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [translatedPosts, setTranslatedPosts] = useState([]);
  const [hasTranslated, setHasTranslated] = useState(false); // State to track translation


  useEffect(() => {
    if (posts && posts.length > 0 && targetLanguage && !hasTranslated) {

      const formatDate = (dateString) => {
        let distance = formatDistanceToNow(new Date(dateString), { addSuffix: true });
        distance = distance.replace('about ', '');
        return distance;
      };
      let sortedPosts = [];

      if (type === "posts") {
        sortedPosts = posts.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else if (type === "comment") {
        console.log('Posts received:', posts);

        sortedPosts = posts.slice().sort((a, b) => new Date(b.commentSeq) - new Date(a.commentSeq));
      } else {
        sortedPosts = posts;
        console.log(posts.length)
      }

      const formattedPosts = sortedPosts.map(post => ({
        ...post,
        formattedDate: formatDate(post.createdAt),
      }));

      const translatePosts = async () => {
        const translated = await Promise.all(
          formattedPosts.map(async (post) => {
            const retryDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
            let attempts = 0;

            while (attempts < 3) { // Retry up to 3 times
              try {
                const detectedLanguageData = await detectLanguage([post.content]);
                const detectedLanguage = detectedLanguageData[0].language; // Assuming the response is an array
                console.log(`Detected language: ${detectedLanguage} for post: ${post._id}`);

                if (detectedLanguage !== targetLanguage) {
                  if(type === "comment"){
                    const translatedContent = await translateText(
                      [post.content, post.creatorname, post.formattedDate],
                      targetLanguage,
                      detectedLanguage
                    );
                    console.log(`Translated content for post: ${post._id}`, translatedContent);
                    return { 
                      ...post, 
                      content: translatedContent[0],
                      creatorname: translatedContent[1],
                      formattedDate: translatedContent[2] // Ensure createdAt is still in the correct format
                    };
                  }else{
                    const translatedContent = await translateText(
                      [post.content, post.heading, post.creatorname, post.formattedDate],
                      targetLanguage,
                      detectedLanguage
                    );
                    console.log(`Translated content for post: ${post._id}`, translatedContent);
                    return { 
                      ...post, 
                      content: translatedContent[0],
                      heading: translatedContent[1],
                      creatorname: translatedContent[2],
                      formattedDate: translatedContent[3] // Ensure createdAt is still in the correct format
                    };
                  }
                }
                return post;
              } catch (error) {
                if (error.response && error.response.status === 429) {
                  attempts++;
                  console.log(`Rate limit hit, retrying... attempt ${attempts}`);
                  await retryDelay(2000 * attempts); // Increased delay based on attempt number (2s, 4s, 6s)
                } else {
                  console.error('Error in translation:', error);
                  break; // Exit on any other error
                }
              }
            }
            return post; // Return original post if all attempts fail
          })
        );
        setTranslatedPosts(translated);
        setHasTranslated(true); // Mark translation as complete
      };

      translatePosts();
    }
  }, [posts, targetLanguage, hasTranslated]);

  const handleEdit = (post) => {
    setSelectedPost(post);
    setShowEditDetails(true);
  };

  const handleClose = () => {
    setShowEditDetails(false);
  };

  const handleDelete = async (postId) => {
    try {
      if (type === "comment") {
        const response = await axios.delete(`${url}/DeleteComment?commentId=${postId}`);
        toast.success('Comment deleted successfully!', {
          onClose: setTimeout(function () { window.location.reload(1); }, 1500)
        });
      } else if (type === "post" || type === "posts") {
        const response = await axios.delete(`${url}/DeletePostAndComments?postId=${postId}`);
        toast.success('Post and associated comments deleted successfully!', {
          onClose: setTimeout(function () { window.location.reload(1); }, 1500)
        });
      }
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  if (!posts) {
    return <div className="spinner-border text-info" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>;
  }

  const disabledStyle = {
    color: 'currentColor',
    cursor: 'not-allowed',
    pointerEvents: 'none',
    textDecoration: 'none',
  };

  return (
    <div>
      {translatedPosts.map((post) => (
        <div className="row row-cols-1 row-cols-md-1 g-4 mb-3" key={post._id}>
          <div className="col position-relative">
            <a href={`/forum/${post._id}`} className={Array.isArray(posts) ? "card text-decoration-none" : "card text-decoration-none isDisabled"} style={type === "posts" ? { color: 'inherit' } : disabledStyle}>
              <div className="card-body" style={{ boxShadow: "0 0 6px rgba(0, 0, 0, 0.2)" }}>
                <div className="d-flex align-items-center mb-3">
                  <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg" className="card-img rounded-circle" alt="..." style={{ width: '40px', height: '40px' }} />
                  <div className="d-flex justify-content-between">
                    <h6 className="card-title s"> &nbsp; {post.creatorname}&nbsp;</h6>
                    <small className="text-muted">&bull;&nbsp;{post.formattedDate}</small>
                  </div>
                </div>
                <h5 className="card-title">{post.heading}</h5>
                <p className="card-text">{post.content}</p>
              </div>
            </a>
            {post.creatorId === id && (
              <div className="dropdown position-absolute mt-4" style={{ right: '20px', top: '-15px', zIndex: '1' }}>
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
