import React from "react";
import axios from "axios";
import { useEffect, useContext } from "react";
import VideoGrid from "../components/video/VideoGrid";
import "../styles/video.css";
import videoContext from "../Context/videoContext";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const {
    getVideos,
    fetchedVids,
    jwttoken,
    getUser,
    userId,
    isShowErrorMsg,
    setIsShowErrorMsg,
  } = useContext(videoContext);

  const headers = {
    authToken: jwttoken,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const navigate = useNavigate();

  useEffect(async () => {
    getVideos();
  }, []);

  return (
    <>
      <div className="mainPage">
        {isShowErrorMsg ? (
          <h1>There is an error, please try after sometime.</h1>
        ) : (
          <div className="videoListWrapper">
            {fetchedVids.map((video) => {
              return (
                <div key={video._id}>
                  <VideoGrid video={video} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
