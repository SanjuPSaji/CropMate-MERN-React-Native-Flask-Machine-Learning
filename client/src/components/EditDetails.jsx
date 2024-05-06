import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import '../assets/Button.css'
import url from '../url'

const EditDetails = ({ type, post,onClose }) => {
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
                  try {
                    const response = await axios.put(`${url}/UpdatePost`, {
                    postId: post._id,
                    heading,
                    content: comment 
                  });
          
                  console.log("Response:", response.data);
            
                    if (response.data.post) {
                      
                      toast.success(response.data.message,{
                        onClose: setTimeout(function () { window.location.reload(1); }, 1500)
                    });
                    } else {
                      toast.error(
                        response.data.message,{
                          onClose: setTimeout(function () { window.location.reload(1); }, 1500)
                      });
                    }
                  } catch (error) {
                    console.log(error);
                    ToastAndroid.showWithGravity(
                      error,
                      ToastAndroid.SHORT,
                      ToastAndroid.TOP
                    );
                  }





            } else if (type === "comment"){ 
                  try {
                    const response = await axios.put(`${url}/UpdateComment`, {
                    postId: post._id,
                    content: comment 
                  });
                      console.log(response.message)
                    if (response.status=="200") {
                      toast.success("Comment updated!",{
                        onClose: setTimeout(function () { window.location.reload(1); }, 1500)
                    });
                    } else {
                      toast.error("Internal server error");
                      setTimeout(() => {
                        done();
                      }, 2000);
                    }
                }catch (error) {
                  console.error("Error:", error);
              }

               }} catch (error) {
            console.error("Error:", error);
          }
    };

    const done = () => {
      onClose();
    }


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
      
      <Toaster />
    </div>
  );
};

export default EditDetails;
