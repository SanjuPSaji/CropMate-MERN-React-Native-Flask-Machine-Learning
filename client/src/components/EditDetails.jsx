import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import '../assets/Button.css'

const EditDetails = ({ type, post }) => {
  const [heading, setHeading] = useState(post ? post.heading : ""); // State for heading input value
  const [comment, setComment] = useState(post ? post.content : ""); // State for comment input value

  const textareaRef = useRef(null);

  const handleHeadingChange = (e) => {
    setHeading(e.target.value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

    const handleSubmit = async (e) => {
        e.preventDefault();


        try{
            if(type === "post" || type === "posts"){
                const response = await axios.put('http://localhost:4999/UpdatePost', {
                    postId: post._id,
                    heading,
                    content: comment 
                  });
          
                  console.log("Response:", response.data);

            } else if (type === "comment"){ 
                const response = await axios.put('http://localhost:4999/UpdateComment', {
                    postId: post._id,
                    content: comment 
                  });
          
                  console.log("Response:", response.data);
            }

        }catch (error) {
            console.error("Error:", error);
          }
    };


  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [comment]); 

  return (
    <div>
      <form className="form-floating" onSubmit={handleSubmit}>
      {(type === "post" || type === "posts") &&(
            <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="heading"
            placeholder="Enter heading"
            value={heading}
            onChange={handleHeadingChange}
          />
          <label htmlFor="heading">Heading</label>
        </div>
        )}
        
        <div className="form-floating mt-3">
          <textarea
            ref={textareaRef}
            type="text"
            className="form-control"
            id="comment"
            placeholder="Enter comment"
            value={comment}
            onChange={handleCommentChange}
            style={{  overflow: 'hidden' }}
          />
          <label htmlFor="comment">Comment</label>
        </div>
        <div className="d-flex justify-content-end" >
        <button type="submit" className="btn-hover color-1 mt-3 w-25">
          Update
        </button>
      </div>
      </form>
    </div>
  );
};

export default EditDetails;
