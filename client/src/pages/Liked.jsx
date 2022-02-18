import React, { useContext } from "react";
import "../styles/video.css";
import videoContext from "../Context/videoContext";
import VideoGrid from "../components/video/VideoGrid";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmptyList from "../components/EmptyList";
import { BallTriangle } from "react-loader-spinner";

const Liked = () => {
  const {
    getUser,
    userFromDb,
    userId,
    jwttoken,
    isShowErrorMsg,
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
          {userFromDb?.data.user.likedVideos.length === 0 ? (
            <EmptyList message={"You haven't liked any videos yet."} />
          ) : (
            <div className="mainPage">
              <h1 style={{ textAlign: "center" }}>Liked videos</h1>
              {isShowErrorMsg ? (
                <h3>
                  There is an error, please try after sometime. Invalid/Expired
                  JWT token. Please Login again.
                </h3>
              ) : (
                <div className="videoListWrapper">
                  {userFromDb?.data.user.likedVideos.map((video) => {
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

export default Liked;
