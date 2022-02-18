import React from "react";
import { useEffect, useContext } from "react";
import VideoGrid from "../components/video/VideoGrid";
import "../styles/video.css";
import videoContext from "../Context/videoContext";
import { BallTriangle } from "react-loader-spinner";

const Home = () => {
  const { getVideos, fetchedVids, isShowErrorMsg, loader } =
    useContext(videoContext);

  useEffect(() => {
    const temp = async () => {
      getVideos();
    };
    temp();
  }, []);

  return (
    <>
      {loader ? (
        <div className="loaderWrapper">
          <BallTriangle color="white" />
        </div>
      ) : (
        <>
          <div className="mainPage">
            {isShowErrorMsg ? (
              <h3>
                There is an error, please try after sometime. Invalid/Expired
                JWT token
              </h3>
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
      )}
    </>
  );
};

export default Home;
