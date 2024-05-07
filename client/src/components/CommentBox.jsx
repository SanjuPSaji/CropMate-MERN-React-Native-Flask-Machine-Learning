import { useState, useRef, useEffect } from "react";
import cn from "classnames";
import Cookies from "js-cookie";
import "../assets/Comment.css";

const creatorname = Cookies.get("username");
// const creatorId = Cookies.get('id');
const INITIAL_HEIGHT = 46;
const wmb = -50;
const mb = 2000;

const CommentBox = ({ onCommentSubmit,type,heading, postId }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [commentValue, setCommentValue] = useState("");

  const outerHeight = useRef(INITIAL_HEIGHT);
  const textRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!textRef) return;
  }, [textRef, commentValue]);

  useEffect(() => {
    if (!textRef) return;

    textRef.current.style.height = "auto";
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  }, [textRef, commentValue]);

  const onExpand = () => {
    if (!isExpanded) {
      outerHeight.current = containerRef.current.scrollHeight;
      setIsExpanded(true);
    }
  };

  const onChange = (e) => {
    setCommentValue(e.target.value);
  };

  const onClose = () => {
    setCommentValue("");
    setIsExpanded(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Create the comment data object
    const commentData = {
      postId: postId, // Assuming postId is available in the scope
      content: commentValue,
      creatorname: creatorname,
      creatorId: Cookies.get("id"), // Add the creatorId if needed
      createdAt: new Date(),
    };

    const postData = {
        creatorname: creatorname,
        creatorId: Cookies.get("id"),
        heading: heading,
        content: commentValue
      };



    if(type=="post"){
        onCommentSubmit(postData);
        setCommentValue("");
        setIsExpanded(false);
    }

    if(type=="comment"){
        if (onCommentSubmit) {
            onCommentSubmit(commentData);
        }
    
        // Clear the comment value and collapse the comment box
        setCommentValue("");
        setIsExpanded(false);
    }
    // Call the onCommentSubmit function passed as a prop
    
  };

  return (
    <form
      onSubmit={onSubmit}
      ref={containerRef}
      className={cn("comment-box", {
        expanded: isExpanded,
        collapsed: !isExpanded,
        modified: commentValue.length > 0,
      })}
      style={{
        minHeight: isExpanded ? outerHeight.current : INITIAL_HEIGHT,
      }}
    >
      <div className="header">
        <div className="user">
          <img
            src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"
            className="rounded-circle"
            alt="..."
            style={{ width: "40px", height: "40px" }}
          />
          <span>{creatorname}</span>
        </div>
      </div>
      <label className="commentLabel" htmlFor="comment">
        What are your thoughts?
      </label>
      <textarea
        ref={textRef}
        onClick={onExpand}
        onFocus={onExpand}
        onChange={onChange}
        className="comment-field"
        placeholder="What are your thoughts?"
        value={commentValue}
        name="comment"
        id="comment"
        required
      />
      <div className="actions">
        <button type="submit" disabled={commentValue.length < 1}>
          Respond
        </button>
        <button type="button" className="cancel" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CommentBox;
