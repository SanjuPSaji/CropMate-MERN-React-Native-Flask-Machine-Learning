const PostTitles = ({ posts }) => {
  return (
    <div>
      <h2>Post Titles</h2>
      

      <ul>
        {posts.map((post) => (
            <div className="row row-cols-1 row-cols-md-1 g-4" key={post._id}>
            <div className="col">
              <div className="card h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg" className="card-img rounded-circle" alt="..." style={{ width: '50px', height: '50px' }} />
                    <div className="ml-3">
                      <h5 className="card-title">{post.creatorname}</h5>
                      <small className="text-muted">{post.createdAt}</small>
                    </div>
                  </div>
                  <h5 className="card-title">{post.heading}</h5>
                  <p className="card-text">{post.content}</p>
                </div>
              </div>
            </div>
          </div>
          
          
        ))}
      </ul>
    </div>
  );
};

export default PostTitles;
