import React, { useContext } from "react";
import "../styles/video.css";
import videoContext from "../Context/videoContext";
import VideoGrid from "../components/video/VideoGrid";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmptyList from "../components/EmptyList";
const WatchLater = () => {
  const {
    getUser,
    userFromDb,
    userId,
    jwttoken,
    isShowErrorMsg,
    setIsShowErrorMsg,
    change,
  } = useContext(videoContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!jwttoken) navigate("/login");
    else {
      getUser(userId);
    }
  }, [change]);
  return (
    <>
      {userFromDb?.data.user.watchlist.length === 0 ? (
        <EmptyList
          message={"You haven't added anything to your watchlist yet."}
        />
      ) : (
        <div className="mainPage">
          {isShowErrorMsg ? (
            <h1>There is an error, please try after sometime.</h1>
          ) : (
            <div className="videoListWrapper">
              {userFromDb?.data.user.watchlist.map((video) => {
                return (
                  <div key={video._id}>
                    <VideoGrid video={video} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default WatchLater;
