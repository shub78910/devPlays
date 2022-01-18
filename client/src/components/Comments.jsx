import React, { useContext, useEffect } from "react";
import { useState } from "react";
import videoContext from "../Context/videoContext";
import "../styles/comments.css";
import { toast } from "react-toastify";

const Comments = ({ currVideo, setCurrVideo, videoId }) => {
  const {
    addCommentToVideo,
    getVideoBasedOnId,
    userFromDb,
    deleteCommentToVideo,
  } = useContext(videoContext);

  const [commentText, setCommentText] = useState("");
  const [commentLoader, setCommentLoader] = useState(false);

  const changeHandler = (e) => {
    setCommentText(e.target.value);
  };

  const addCommentHandler = async () => {
    if (commentText.trim() !== "") {
      setCommentLoader(true);
      const response = await addCommentToVideo(videoId, commentText);
      setCommentLoader(false);
      setCommentText("");
      if (response.data) {
        toast.success("Comment added.");
        const response = await getVideoBasedOnId(videoId);
        setCurrVideo(response?.data.video);
      }
    }
  };

  const deleteComment = async (comment) => {
    let commentId = Number(comment.commentId);
    setCommentLoader(true);
    const response = await deleteCommentToVideo(videoId, commentId);
    setCommentLoader(false);
    if (response.data) {
      toast.success("Comment Deleted");
      const response = await getVideoBasedOnId(videoId);
      setCurrVideo(response?.data.video);
    }
  };

  return (
    <div className=" commentsWrapper">
      <h4>{currVideo?.comments?.length} Comments</h4>
      <div className="d-flex justify-content-between align-items-center">
        <textarea
          placeholder="Add new comment "
          type="text"
          onChange={(e) => changeHandler(e)}
          value={commentText}
        />
        <button onClick={addCommentHandler}>
          <i className="fa fa-paper-plane"></i>
        </button>
      </div>

      {commentLoader ? (
        <h5 className="renderingComments">Loading...</h5>
      ) : (
        <div className="renderingComments">
          {/* rendering comments  */}
          {currVideo?.comments?.length !== 0 && (
            <>
              {currVideo.comments?.map((comment) => {
                return (
                  <>
                    <div className="singleComment">
                      <div>
                        <strong>{comment.user.fullName}: </strong>{" "}
                        <p>{comment.comment}</p>
                      </div>
                      {String(userFromDb?.data.user._id) ===
                        String(comment.user._id) && (
                        <i
                          className="fa fa-trash"
                          onClick={() => deleteComment(comment)}
                        ></i>
                      )}
                    </div>
                  </>
                );
              })}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Comments;
