import React, { useEffect } from "react";
import { useContext } from "react";
import appIcon from "../../assets/vid.png";

import { useParams, useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import "../../styles/video.css";
import videoContext from "../../Context/videoContext";
import { useState } from "react";

import { BallTriangle } from "react-loader-spinner";

import { ToastContainer, toast } from "react-toastify";
import AddPlaylistModal from "../AddPlaylistModal";
import Comments from "../Comments";

const VideoPlayer = () => {
  const { videoId } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [likeCount, setLikeCount] = useState(0);
  const [isLikeVideo, setIsLikeVideo] = useState(false);
  const [currVideo, setCurrVideo] = useState([]);
  const [isAddToWatchLater, setIsAddToWatchLater] = useState(false);
  const [isAddToPlaylist, setIsAddToPlaylist] = useState(false);
  const [likeLoader, setLikeLoader] = useState(false);

  const [modalShow, setModalShow] = useState(false);

  const {
    jwttoken,
    getVideos,
    getVideoBasedOnId,
    likeVideos,
    addToWatchLaterVideo,
    userFromDb,
    loader,
    isShowErrorMsg,
  } = useContext(videoContext);

  useEffect(async () => {
    if (!jwttoken) navigate("/login");
    if (isShowErrorMsg) navigate("/login");
    else {
      const response = await getVideoBasedOnId(videoId);
      setCurrVideo(response?.data.video);

      if (isAddedToWatchLaterByUser !== undefined) setIsAddToWatchLater(true);
      if (isLikedByUser !== undefined) setIsLikeVideo(true);
    }
  }, [userFromDb]);

  useEffect(() => {
    setLikeCount(currVideo?.likes);
  }, [currVideo]);

  useEffect(() => {
    if (isShowErrorMsg) navigate("/404");
  }, [isShowErrorMsg]);

  const isAddedToWatchLaterByUser = userFromDb?.data.user.watchlist.find(
    (video) => video._id === videoId
  );
  const isLikedByUser = userFromDb?.data.user.likedVideos.find(
    (video) => video._id === videoId
  );

  const likeVideo = async () => {
    setLikeLoader(true);
    const response = await likeVideos(videoId);
    setLikeLoader(false);
    if (response.data?.message === "video liked") {
      setIsLikeVideo(true);
      setLikeCount(likeCount + 1);
    } else if (response.data?.message === "video disliked") {
      setIsLikeVideo(false);
      setLikeCount(likeCount - 1);
    }
  };

  const addToWatchLater = async () => {
    const response = await addToWatchLaterVideo(videoId);
    if (response.data?.message === "Video added to watch later") {
      toast.success(response.data?.message);
      setIsAddToWatchLater(true);
    } else if (response.data?.message === "Video removed from watch later") {
      toast.success(response.data?.message);
      setIsAddToWatchLater(false);
    }
  };

  return (
    <div className="mainPage">
      {loader ? (
        <div className="loaderWrapper">
          <BallTriangle color="white" />
        </div>
      ) : (
        <>
          {" "}
          <div className="videoPlayerWrapper">
            <iframe
              allow="fullscreen;"
              title={currVideo?.name}
              src={`https://www.youtube.com/embed/${videoId}?mute=0`}
            ></iframe>
            <br />
            <small>
              {currVideo?.category?.map((category) => (
                <span key={category}>#{category} </span>
              ))}
            </small>
            <h5>{currVideo?.name}</h5>
            <div className="actionBtns">
              <small>{currVideo?.date}</small>
              <div>
                <button onClick={likeVideo} disabled={loader}>
                  {isLikeVideo ? (
                    <i className="fa fa-thumbs-up fa-x highlighted"></i>
                  ) : (
                    <i className="fa fa-thumbs-up fa-x"></i>
                  )}{" "}
                  <span>
                    {likeLoader ? (
                      <span>
                        <i className="fa fa-spinner fa-pulse fa-x"></i>
                      </span>
                    ) : (
                      <span>{likeCount} Likes</span>
                    )}{" "}
                  </span>
                </button>
                {/* new code  */}
                <button onClick={() => setModalShow(true)}>
                  <i className="fa fa-bookmark fa-x"></i>{" "}
                  <span>Save to playlist</span>
                </button>

                <AddPlaylistModal
                  videoId={videoId}
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
                {/* ends */}
                <button onClick={addToWatchLater}>
                  {isAddToWatchLater ? (
                    <>
                      <i className="fa fa-clock-o fa-x highlighted"></i>{" "}
                      <span>Added to watched later</span>
                    </>
                  ) : (
                    <>
                      <i className="fa fa-clock-o fa-x"></i>{" "}
                      <span>Watch later</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    toast.success("Video link copied to clipboard.");
                    navigator.clipboard.writeText(
                      `devplays-shub78910.herokuapp.com${pathname}`
                    );
                  }}
                >
                  <i className="fa fa-copy fa-x"></i> Copy link
                </button>
              </div>
            </div>{" "}
            <hr />
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <img className="hero" src={appIcon} alt="appLogo" />
                <h6 className="mx-2">{currVideo?.creator}</h6>
              </div>
              <div>
                <button className="SubscribeBtn">Subscribe</button>
              </div>
            </div>
            {/* comments */}
            <div>
              <Comments
                currVideo={currVideo}
                setCurrVideo={setCurrVideo}
                videoId={videoId}
              />
            </div>
          </div>
        </>
      )}

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

export default VideoPlayer;
