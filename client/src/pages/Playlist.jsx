import React, { useContext } from "react";
import "../styles/video.css";
import videoContext from "../Context/videoContext";
import VideoGrid from "../components/video/VideoGrid";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmptyList from "../components/EmptyList";
import { BallTriangle } from "react-loader-spinner";

const Playlist = () => {
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
  const { playlistName } = useParams();

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
          {userFromDb?.data.user.playlist[playlistName].length === 0 ? (
            <EmptyList
              message={"You haven't any videos to the playlist yet."}
            />
          ) : (
            <div className="mainPage">
              <h1 style={{ textAlign: "center" }}>{playlistName}</h1>
              {isShowErrorMsg ? (
                <h1>There is an error, please try after sometime.</h1>
              ) : (
                <div className="videoListWrapper">
                  {userFromDb?.data.user.playlist[playlistName].map((video) => {
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

export default Playlist;
