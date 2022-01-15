import React, { useContext } from "react";
import "../styles/history.css";
import "../styles/video.css";
import videoContext from "../Context/videoContext";
import VideoGrid from "../components/video/VideoGrid";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmptyList from "../components/EmptyList";

const History = () => {
  const { getUser, userFromDb, userId, jwttoken, isShowErrorMsg, change } =
    useContext(videoContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!jwttoken) navigate("/login");
    else {
      getUser(userId);
    }
  }, [change]);
  return (
    <>
      {userFromDb?.data.user.history.length === 0 ? (
        <EmptyList
          message={
            "You haven't watched any videos yet. Head to home page and watch a few videos"
          }
        />
      ) : (
        <div className="mainPage">
          {isShowErrorMsg ? (
            <h1>There is an error, please try after sometime.</h1>
          ) : (
            <div className="videoListWrapper">
              {userFromDb?.data.user.history.map((video) => {
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

export default History;
//add all the validations first
//check if there is a better way than using useeffect in each file.
