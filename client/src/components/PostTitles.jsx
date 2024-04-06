import { formatDistanceToNow } from 'date-fns';

const PostTitles = ({ posts }) => {
  if (!posts) {
    // Render loading indicator or return null if posts data is not available yet
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

  let sortedPosts = []; // Initialize sortedPosts as an empty array

  if (Array.isArray(posts)) {
    // If posts is an array, sort it
    sortedPosts = posts.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else {
    // If posts is not an array, assign it directly to sortedPosts
    sortedPosts = [posts];
  }

  const formatDate = (dateString) => {
    let distance = formatDistanceToNow(new Date(dateString), { addSuffix: true });
    distance = distance.replace('about ', '');
    return distance;
  };


  return (
    <div >
      {sortedPosts.map((post) => (
        <div className="row row-cols-1 row-cols-md-1 g-4 mb-3" key={post._id}>
          <div className="col">
            <a href={`/forum/${post._id}`} className={Array.isArray(posts) ? "card text-decoration-none" : "card text-decoration-none isDisabled"} 
              style={{
                ...(Array.isArray(posts) ? { color: 'inherit' } : disabledStyle), // Merge styles conditionally
              }}>
              <div className="card-body" 
            style={{ boxShadow: "0 0 6px rgba(0, 0, 0, 0.2)"}}>
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
      ))}
    </div>
  );
};

export default PostTitles;
