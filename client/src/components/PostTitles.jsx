import { formatDistanceToNow } from 'date-fns';

const PostTitles = ({ posts }) => {
  const sortedPosts = posts.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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
      ))}
    </div>
  );
};

export default PostTitles;
