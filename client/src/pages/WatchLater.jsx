import React, { useContext } from "react";
import "../styles/video.css";
import videoContext from "../Context/videoContext";
import VideoGrid from "../components/video/VideoGrid";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmptyList from "../components/EmptyList";
import { BallTriangle } from "react-loader-spinner";

const WatchLater = () => {
  const {
    getUser,
    userFromDb,
    userId,
    jwttoken,
    isShowErrorMsg,
    setIsShowErrorMsg,
    change,
    loader,
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
      {loader ? (
        <div className="loaderWrapper">
          <BallTriangle color="white" />
        </div>
      ) : (
        <>
          {userFromDb?.data.user.watchlist.length === 0 ? (
            <EmptyList
              message={"You haven't added anything to your watchlist yet."}
            />
          ) : (
            <div className="mainPage">
              <h1 style={{ textAlign: "center" }}>Watchlist</h1>
              {isShowErrorMsg ? (
                <h3>
                  There is an error, please try after sometime. Invalid/Expired
                  JWT token
                </h3>
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
      )}
    </>
  );
};

export default WatchLater;
