import React from "react";
import "../../styles/video.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";
import videoContext from "../../Context/videoContext";
import { toast, ToastContainer } from "react-toastify";
const VideoGrid = ({ video }) => {
  const { addToWatchLaterVideo, addToHistory, jwttoken } =
    useContext(videoContext);

  const navigate = useNavigate();
  const addVideoToHistory = () => {
    addToHistory(video._id);
  };

  const addToWatchLater = async () => {
    if (jwttoken) {
      const response = await addToWatchLaterVideo(video._id);
      if (response.data?.message === "Video added to watch later") {
        toast.success("Video added to watch later");
      } else if (response.data?.message === "Video removed from watch later") {
        toast.success("Video removed to watch later");
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="LinkTagDefault">
      <Link
        className="LinkTagDefault"
        to={{
          pathname: `/video/${video._id}`,
          state: { fromDashboard: true },
        }}
      >
        <div className="videoGrid" onClick={addVideoToHistory}>
          <img src={`https://i.ytimg.com/vi/${video._id}/0.jpg`} />
          <strong className="mt-3">{video.name}</strong>
        </div>
      </Link>
      <div className="d-flex justify-content-between align-items-center mt-4 vidDetails">
        <div>
          <small>
            {video.category?.map((category) => (
              <span key={category}>#{category} </span>
            ))}
          </small>
          <h6>{video.date}</h6>
        </div>
        <div role="button" onClick={addToWatchLater}>
          <i className="fa fa-clock-o fa-2x "></i>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        closeOnClick
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default VideoGrid;
